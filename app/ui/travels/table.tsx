import { UpdateTravel, DeleteTravelConfirm, DeleteTravelTrigger } from '@/app/ui/travels/buttons';
import { formatDateToLocal, formatCurrency, formatTime, formatDuration } from '@/app/lib/utils';
import { fetchFilteredTravels } from '@/app/lib/data';
import { Table, AlertDialog, Button, Flex, Tooltip, IconButton } from "@radix-ui/themes";
import { TrashIcon } from '@heroicons/react/24/outline';

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

          {/* mobile version: */}
          {/* <div className="md:hidden">
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
            ))} */}
          {/* </div> */}
          
          {/* desktop version:  */}
          {/* <table className="hidden min-w-full text-gray-900 md:table">
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
                    {formatDuration(travel.rounded_duration)}
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
          </table> */}

      </div>


        {/* radix version:  */}
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Destination</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Start Time</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>End Time</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>IST (h)</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Rounded (h)</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Daily Ammount</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {travels?.map((travel) => (
		          <Table.Row
                  key={travel.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <Table.Cell>{formatDateToLocal(travel.date)}</Table.Cell>
                <Table.Cell>{travel.destination}</Table.Cell>
                <Table.Cell>{formatTime(travel.start_time)}</Table.Cell>
                <Table.Cell>{formatTime(travel.end_time)}</Table.Cell>
                <Table.Cell>{formatDuration(travel.duration)}</Table.Cell>
                <Table.Cell>{formatDateToLocal(travel.date)}</Table.Cell>
                <Table.Cell>{formatCurrency(travel.daily_amount)}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end gap-3">
                    <UpdateTravel id={travel.id} />
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <DeleteTravelTrigger />
                      </AlertDialog.Trigger>
                      <AlertDialog.Content maxWidth="500px">
                          <AlertDialog.Title>Delete travel</AlertDialog.Title>
                          <AlertDialog.Description size="2">
                            Are you sure you want to delete these travel? This action is permanent and
                            cannot be undone.
                          </AlertDialog.Description>

                          <Flex gap="3" justify="end">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Cancel
                              </Button>
                            </AlertDialog.Cancel>
                              <DeleteTravelConfirm id={travel.id} />
                          </Flex>
                    </AlertDialog.Content>
                    </AlertDialog.Root>
                  </div>
                </Table.Cell>
		          </Table.Row>))}
	        </Table.Body>
        </Table.Root>
    </div>

  );
}
