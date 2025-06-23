 "use client"

import { PreferencesTable } from '@/app/lib/definitions';
import Link from 'next/link';
import { EnvelopeIcon, MapPinIcon, CalendarIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Button, Tooltip, TextField, Flex } from "@radix-ui/themes";
import { createTravel, State, getGeocodeAddress, getDistanceAsKm, getAddressDetails } from '@/app/lib/actions';
import { InputMask } from '@react-input/mask';
import CustomInput from '../timeInput'
import { useActionState } from 'react';
import React, { useState } from 'react';
import { cutMeters } from '@/app/lib/utils';

export default function Form({ preferences }: { preferences: PreferencesTable[] }) {
  const initialState: State = { message: null, errors: {} };

  const [destinationCity, setDestinationCity] = useState('');
  const [destinationZip, setDestinationZip] = useState('');
  const [locationPending, setLocationPending] = useState(false);
  const [distance, setDistance] = useState("");

  const actionWithPrefrences = createTravel.bind(null, preferences[0]);
  const [state, formAction] = useActionState(actionWithPrefrences, initialState);

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
      <TextField.Root color="red" variant={state.errors?.date ? "soft" : "classic"} id='date' type='date' name='date'>
	      <TextField.Slot>
		      <CalendarIcon height="16" width="16" />
	      </TextField.Slot>
      </TextField.Root>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.date &&
          state.errors.date.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <Flex gap="2" align={'center'} pt={"4"} pb={"1"}>
        <label htmlFor="destination" className="mb-2 block text-sm font-medium">
          Select Destination
        </label>
        <TextField.Root color="red" variant={state.errors?.destination ? "soft" : "classic"}
          onChange={e => setDestinationCity(e.target.value)}
          value={destinationCity}
          placeholder="Destination"
          id='destination'
          type='text'
          name='destination'
          onBlur={e => handleDestination(e.target.value)}
          disabled={locationPending}
          >
          <TextField.Slot>
            <MapPinIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.destination &&
            state.errors.destination.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

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
            <EnvelopeIcon height="16" width="16" />
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
      </Flex>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {distance?
            <p className="mt-2 text-sm text-red-500">
              {distance}
            </p> : ""
          }
      </div>

      <InputMask id="startTime" component={CustomInput} mask="__:__" replacement={{ _: /\d/ }} label="Select Start Time" />
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.startTime &&
          state.errors.startTime.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <InputMask id="endTime" component={CustomInput} mask="__:__" replacement={{ _: /\d/ }} label="Select End Time" />
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.startTime &&
          state.errors.startTime.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="mt-6 flex justify-end gap-4">
      <Tooltip content="Back to Travels page">
        <Button>
          <Link href="/dashboard/travels">
            Cancel
          </Link>
        </Button>
      </Tooltip>

      <Tooltip content="Submit the form with data">
        <Button type="submit">
          Create Travel
        </Button>
      </Tooltip>
      </div>
    </form>
  );
}
