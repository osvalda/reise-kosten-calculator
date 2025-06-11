import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Tooltip } from "@radix-ui/themes";
import Link from 'next/link';

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
      <Button>
        <Link href="/dashboard/travels">
          <PencilIcon className="w-5" />
        </Link>
      </Button>
    </Tooltip>
  );
}

export function DeleteTravel({ id }: { id: string }) {
  return (
    <Tooltip content="Delete the travel">
      <Button type="submit">
        <TrashIcon className="w-5" />
      </Button>
    </Tooltip>
  );
}
