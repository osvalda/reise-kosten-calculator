"use client"

import { Separator } from '@/components/ui/separator';
import DangerZone from '@/components/settings/elements/danger-zone';
import PersonalInfo from '@/components/settings/elements/personal-info';
import EmailPass from '@/components/settings/elements/email-password';
import { UserData } from '@/app/lib/definitions';
import { usePreferences } from '@/app/lib/userPrefferenceProvider';

const UserGeneral = () => {
    const userData: UserData = usePreferences();

    return (
        <section className='py-3'>
            <div className='mx-auto max-w-7xl'>
                <PersonalInfo userData={userData}/>
                <Separator className='my-10' />
                <EmailPass />
                <Separator className='my-10' />
                <DangerZone />
            </div>
        </section>
    );
}

export default UserGeneral;
