'use client';

import { TravelsTable, PreferencesTable } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { editTravel } from '@/app/lib/actions';
import { Button, Tooltip, TextField } from "@radix-ui/themes";
import { InputMask } from '@react-input/mask';
import CustomInput from '../timeInput'
import React, { useState } from 'react';
import { useActionState } from 'react';
import { State, getGeocodeAddress, getDistanceAsKm, getAddressDetails } from '@/app/lib/actions';
import { cutMeters } from '@/app/lib/utils';

export default function EditTravelForm({
  travel,
  preferences,
}: {
  travel: TravelsTable;
  preferences: PreferencesTable[];
}) {

  const initialState: State = { message: null, errors: {} };

  const [destinationCity, setDestinationCity] = useState(travel.destination);
  const [destinationZip, setDestinationZip] = useState(travel.zip);
  const [locationPending, setLocationPending] = useState(false);
  const [distance, setDistance] = useState("");

  const updateTravelWithId = editTravel.bind(null, travel.id, preferences[0]);
  const [state, formAction, isPending] = useActionState(updateTravelWithId, initialState);

  const handleDestination = async (source: string) => {
    setLocationPending(true);
    const addressRes = await getGeocodeAddress(source);
    const addressDetails = await getAddressDetails(addressRes.latitude, addressRes.longitude);
    const result = await getDistanceAsKm("48.1506233", "16.3577095", addressRes.latitude, addressRes.longitude);

    setDestinationCity(addressDetails.locality);
    setDestinationZip(addressDetails.postalCode);
    setDistance(cutMeters(result.distance.toString()) + " km");

    setLocationPending(false);
  };

  return (
    <form action={formAction}>

      <label htmlFor="date" className="mb-2 block text-sm font-medium">
        Select Date
      </label>
      <TextField.Root id='date' type='date' name='date' defaultValue={new Date(Date.parse(travel.date)).toISOString().slice(0, 10)}>
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
	      </TextField.Slot>
      </TextField.Root>

      <label htmlFor="destination" className="mb-2 block text-sm font-medium">
        Select Destination
      </label>
      <TextField.Root color="red" variant={state.errors?.destination ? "soft" : "classic"}
        id='destination'
        type='text'
        name='destination'
        onChange={e => setDestinationCity(e.target.value)}
        value={destinationCity}
        onBlur={e => handleDestination(e.target.value)}
        disabled={locationPending}
        >
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
	      </TextField.Slot>
      </TextField.Root>
        <label htmlFor="zip" className="mb-2 block text-sm font-medium">
          Select ZIP
        </label>
        <TextField.Root color="red" variant={state.errors?.destination ? "soft" : "classic"}
          onChange={e => setDestinationZip(e.target.value)}
          value={destinationZip}
          placeholder="ZIP code"
          id='zip'
          type='number'
          name='zip'
          onBlur={e => handleDestination(e.target.value)}
          disabled={locationPending}
          >
          <TextField.Slot>
            {/* <EnvelopeIcon height="16" width="16" /> */}
          </TextField.Slot>
        </TextField.Root>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.zip &&
            state.errors.zip.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

      <InputMask id="startTime" component={CustomInput} mask="__:__" replacement={{ _: /\d/ }} label="Select Start Time" defaultValue={travel.start_time}/>

      <InputMask id="endTime" component={CustomInput} mask="__:__" replacement={{ _: /\d/ }} label="Select End Time" defaultValue={travel.end_time} />

      <div className="mt-6 flex justify-end gap-4">
      <Tooltip content="Back to Travels page">
        <Button>
          <Link href="/dashboard/travels">
          Cancel
          </Link>
        </Button>
      </Tooltip>

      <Tooltip content="Edit the data">
        <Button type="submit">
          Edit Travel
        </Button>
      </Tooltip>
      </div>
    </form>
  );
}
