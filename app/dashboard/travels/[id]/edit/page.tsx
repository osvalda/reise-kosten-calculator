import EditTravelForm from '@/app/ui/travels/edit-form';
import Breadcrumbs from '@/app/ui/travels/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchTravelById, fetchUserPreferences } from '@/app/lib/data';
import { fetchActiveUserData } from '@/app/lib/actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const activeUser = await fetchActiveUserData();
    const userId = activeUser?.id;

    const params = await props.params;
    const id = params.id;
    const [travel, preferences] = await Promise.all([
        fetchTravelById(id),
        fetchUserPreferences(userId? userId : ""),
    ]);

    if (!travel) {
        notFound();
    }

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