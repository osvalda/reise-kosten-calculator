import { fetchTravelsOfUser } from '@/app/lib/data';
import { DataTable } from './data-table';

export default async function TravelTableWrapper({ userId }: { userId: string | undefined }) {
    const travels = await fetchTravelsOfUser(userId ?? '');

    return (<DataTable data={travels} />);
}