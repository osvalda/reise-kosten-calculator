 "use client"

import { PreferencesTable } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, Tooltip, TextField } from "@radix-ui/themes";
import { createTravel } from '@/app/lib/actions';
import { InputMask } from '@react-input/mask';
import CustomInput from '../timeInput'

export default function Form({ preferences }: { preferences: PreferencesTable[] }) {

  const actionWithPrefrences = createTravel.bind(null, preferences[0]);

  return (
    <form action={actionWithPrefrences}>

      <label htmlFor="date" className="mb-2 block text-sm font-medium">
        Select Date
      </label>
      <TextField.Root id='date' type='date' name='date'>
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
	      </TextField.Slot>
      </TextField.Root>

      <label htmlFor="destination" className="mb-2 block text-sm font-medium">
        Select Destination
      </label>
      <TextField.Root placeholder="Destination" id='destination' type='text' name='destination'>
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
	      </TextField.Slot>
      </TextField.Root>

      <InputMask id="startTime" component={CustomInput} mask="__:__" replacement={{ _: /\d/ }} label="Select Start Time" />

      <InputMask id="endTime" component={CustomInput} mask="__:__" replacement={{ _: /\d/ }} label="Select End Time" />

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
