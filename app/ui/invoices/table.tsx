import { UpdateTravel, DeleteTravel } from '@/app/ui/invoices/buttons';
import { formatDateToLocal, formatCurrency, formatTime, formatDuration } from '@/app/lib/utils';
import { fetchFilteredTravels } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const travels = await fetchFilteredTravels(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {travels?.map((travel) => (
              <div
                key={travel.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{travel.destination}</p>
                    </div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(travel.date)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(travel.daily_amount)}
                    </p>
                    <p></p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTravel id={travel.id} />
                    <DeleteTravel id={travel.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Destination
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Start Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  End Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  IST (h)
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rounded (h)
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Daily Ammount 
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {travels?.map((travel) => (
                <tr
                  key={travel.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {formatDateToLocal(travel.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {travel.destination}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTime(travel.start_time)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTime(travel.end_time)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDuration(travel.duration)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDuration(travel.rounded_durration)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(travel.daily_amount)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTravel id={travel.id} />
                      <DeleteTravel id={travel.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
