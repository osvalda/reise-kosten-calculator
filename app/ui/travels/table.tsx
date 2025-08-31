import { UpdateTravel, DeleteTravelConfirm, DeleteTravelTrigger } from '@/app/ui/travels/buttons';
import { formatDateToLocal, formatCurrency, formatTime, formatDuration } from '@/app/lib/utils';
import { fetchFilteredTravels } from '@/app/lib/data';
import { Table, AlertDialog, Button, Flex } from "@radix-ui/themes";

export default async function TravelsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const travels = await fetchFilteredTravels(query, currentPage);

  return (
    <div className="mt-6 flow-root">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Destination</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>ZIP</Table.ColumnHeaderCell>
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
                <Table.Cell>{travel.zip}</Table.Cell>
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
