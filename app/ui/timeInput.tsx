import { forwardRef } from 'react';
import { TextField } from "@radix-ui/themes";
import { ClockIcon } from '@heroicons/react/24/outline';

interface CustomInputProps {
  label: string;
  id: string;
  defaultValue? : string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ label, id, defaultValue }, forwardedRef) => {
  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <TextField.Root id={id} name={id} ref={forwardedRef} defaultValue={defaultValue}>
        <TextField.Slot >
          <ClockIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
});

export default CustomInput;