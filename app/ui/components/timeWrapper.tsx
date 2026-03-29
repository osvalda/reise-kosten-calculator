import { SmartTimeInput } from '@osvalda/smart-time-input';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { TextField } from "@radix-ui/themes";

const TimeInputRadixWrapper = ({ defaultTime, id }: { defaultTime?: string, id?: string }) => {

    return (
        <SmartTimeInput
            className='rt-reset rt-TextFieldInput'
            divClassName='rt-TextFieldRoot rt-r-size-2 rt-variant-surface'
            initTime={defaultTime}
        >
            <TextField.Slot>
                <CalendarIcon height="16" width="16" />
            </TextField.Slot>

        </SmartTimeInput>
    );
}

export default TimeInputRadixWrapper;