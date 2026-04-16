"use client";

import { UserData } from '@/app/lib/definitions';
import { usePreferences } from '@/app/lib/userPrefferenceProvider';

const Test = () => {
    const preferences: UserData = usePreferences();

    return (
        <div>
            <p>prefference: {preferences.preferences.home_base}</p>
        </div>
    )
}

export default Test;