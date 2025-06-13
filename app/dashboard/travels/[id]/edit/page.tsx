import EditTravelForm from '@/app/ui/travels/edit-form';
import Breadcrumbs from '@/app/ui/travels/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
import { fetchTravelById, fetchUserPreferences } from '@/app/lib/data';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [travel, preferences] = await Promise.all([
        fetchTravelById(id),
        fetchUserPreferences("410544b2-4001-4271-9855-fec4b6a6442a"),
    ]);

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Travels', href: '/dashboard/travels' },
            {
                label: 'Edit Travel',
                href: `/dashboard/travels/${id}/edit`,
                active: true,
            },
            ]}
        />
        <EditTravelForm travel={travel} preferences={preferences} />
        </main>
  );
}