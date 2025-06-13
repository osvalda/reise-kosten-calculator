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
import { createTravel } from '@/app/lib/actions';
import { InputMask } from '@react-input/mask';
import CustomInput from '../timeInput'

export default function EditTravelForm({
  travel,
  preferences,
}: {
  travel: TravelsTable;
  preferences: PreferencesTable[];
}) {

  const updateTravelWithId = editTravel.bind(null, travel.id, preferences[0]);

  return (
    <form action={updateTravelWithId}>
      <label htmlFor="date" className="mb-2 block text-sm font-medium">
        Select Date
      </label>
      <TextField.Root id='date' type='date' name='date' defaultValue={"2025-06-01"}>
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
	      </TextField.Slot>
      </TextField.Root>

      <label htmlFor="destination" className="mb-2 block text-sm font-medium">
        Select Destination
      </label>
      <TextField.Root placeholder="Destination" id='destination' type='text' name='destination' defaultValue={travel.destination}>
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
	      </TextField.Slot>
      </TextField.Root>

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
