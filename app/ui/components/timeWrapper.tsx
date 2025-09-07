import { SmartTimeInput } from '@osvalda/smart-time-input';

import { EnvelopeIcon, MapPinIcon, CalendarIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Button, Tooltip, TextField, Flex } from "@radix-ui/themes";

const TimeInputRadixWrapper = ({ defaultTime, id }: { defaultTime?: string, id?: string }) => {

    // const onFocusHandler = (event: { target: { name: any; }; }) => {
    //     console.log("hello there you entered :  my name is ", event.target.name);
    // }

    // const onBlurHandler = (event: any) => {
    //     console.log("you left ");
    // }

    // const onTimeChangeHandler = (val: any) => {
    //     if (val.length === 5) {
    //       console.log("béla");
    //         // do something with this value
    //     }
    // }

    return (
        <SmartTimeInput
            id={id}
            name={id}
            className='rt-reset rt-TextFieldInput'
            divClassName='rt-TextFieldRoot rt-r-size-2 rt-variant-surface'
            placeholder='HH:MM'
            initTime={defaultTime}
        // onTimeChange={onTimeChangeHandler}
        // onFocusHandler={onFocusHandler}
        // onBlurHandlerSuper={onBlurHandler}
        >
            <TextField.Slot>
                <CalendarIcon height="16" width="16" />
            </TextField.Slot>

        </SmartTimeInput>
    );
}

export default TimeInputRadixWrapper;