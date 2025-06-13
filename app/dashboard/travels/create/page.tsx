import Form from '@/app/ui/travels/create-form';
import Breadcrumbs from '@/app/ui/travels/breadcrumbs';
import { fetchUserPreferences } from '@/app/lib/data';

export default async function Page() {
  const preferernces = await fetchUserPreferences("410544b2-4001-4271-9855-fec4b6a6442a");

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