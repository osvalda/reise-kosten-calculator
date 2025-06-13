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
      <IconButton>
        <Link href={`/dashboard/travels/${id}/edit`}>
          <PencilIcon className="w-5" />
        </Link>
      </IconButton>
    </Tooltip>
  );
}

export function DeleteTravel({ id }: { id: string }) {
  const deleteTravelWithId = deleteTravel.bind(null, id);
  return (
    <form action={deleteTravelWithId}>
      <Tooltip content="Delete the travel">
        <IconButton type="submit">
          <TrashIcon className="w-5" />
        </IconButton>
      </Tooltip>
    </form>
  );
}
