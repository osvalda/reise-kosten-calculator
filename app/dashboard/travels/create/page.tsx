import Form from '@/app/ui/travels/create-form';
import Breadcrumbs from '@/app/ui/travels/breadcrumbs';
import { fetchUserPreferences } from '@/app/lib/data';
import { fetchActiveUserData } from '@/app/lib/actions';

export default async function Page() {
  const activeUser = await fetchActiveUserData();
  const userId = activeUser?.id;
  const preferernces = await fetchUserPreferences(userId? userId : "");

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Travels', href: '/dashboard/travels' },
          {
            label: 'Create Travel',
            href: '/dashboard/travels/create',
            active: true,
          },
        ]}
      />
      <Form preferences={preferernces} />
    </main>
  );
}