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
import { createTravel, State } from '@/app/lib/actions';
import { InputMask } from '@react-input/mask';
import CustomInput from '../timeInput'
import { useActionState } from 'react';

export default function Form({ preferences }: { preferences: PreferencesTable[] }) {
  const initialState: State = { message: null, errors: {} };

  const actionWithPrefrences = createTravel.bind(null, preferences[0]);
  const [state, formAction] = useActionState(actionWithPrefrences, initialState);

  return (
    <form action={formAction}>

      <label htmlFor="date" className="mb-2 block text-sm font-medium">
        Select Date
      </label>
      <TextField.Root color="red" variant={state.errors?.date ? "soft" : "classic"} id='date' type='date' name='date'>
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
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

      <label htmlFor="destination" className="mb-2 block text-sm font-medium">
        Select Destination
      </label>
      <TextField.Root color="red" variant={state.errors?.destination ? "soft" : "classic"} placeholder="Destination" id='destination' type='text' name='destination'>
	      <TextField.Slot >
		    <CurrencyDollarIcon height="16" width="16" />
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
