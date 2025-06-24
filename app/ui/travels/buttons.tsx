import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Tooltip, IconButton } from "@radix-ui/themes";
import Link from 'next/link';
import { deleteTravel } from '@/app/lib/actions';

export function CreateTravel() {
  return (
    <Tooltip content="Create new travel record">
      <Link
        href="/dashboard/travels/create">
        <Button>Add Travel<PlusIcon className="h-5 md:ml-4" /></Button>
      </Link>
    </Tooltip>
  );
}

export function UpdateTravel({ id }: { id: string }) {
  return (
    <Tooltip content="Modify the travel">
      <Link href={`/dashboard/travels/${id}/edit`}>
        <IconButton>
          <PencilIcon className="w-5" />
        </IconButton>
      </Link>
    </Tooltip>
  );
}

export function DeleteTravelTrigger() {
  return (
      <Tooltip content="Delete the travel">
        <IconButton>
          <TrashIcon className="w-5" />
        </IconButton>
      </Tooltip>
  );
}

export function DeleteTravelConfirm({ id }: { id: string }) {
  const deleteTravelWithId = deleteTravel.bind(null, id);
  return (
    <form action={deleteTravelWithId}>
      <Tooltip content="Delete the travel">
        <Button type="submit">
          <TrashIcon className="w-5" /> Delete
        </Button>
      </Tooltip>
    </form>
  );
}
