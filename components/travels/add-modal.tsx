/* eslint-disable react-hooks/set-state-in-effect */
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { createTravel, State, FormResponse } from '@/app/lib/actions';
import { useActionState, useTransition } from 'react';
import { PreferencesTable } from '@/app/lib/definitions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import { toast } from "sonner";
import TimeInputWrapper from './time-input-wrapper';

export function AddModal({ preferences }: { preferences: PreferencesTable }) {
    const [open, setOpen] = useState(false);
    const initialState: State = { message: null, errors: {} };

    const [response, formAction, isPending] = useActionState(
        async (response: FormResponse | undefined, payload: FormData | null) => {
            if (payload === null) {
                return undefined;
            }

            return await createTravel(preferences, initialState, payload);
        },
        undefined,
    );

    const [, startTransition] = useTransition();
    const reset = () => {
        startTransition(() => {
            formAction(null);
        });
    };

    useEffect(() => {
        if (response) {
            setOpen(response.keepOpen);
        } if (response && response.status === 'success' && !response.keepOpen) {
            queueMicrotask(() => {
                toast.success(response.message || 'Travel record created successfully.');
            });
        }
    }, [response]);

    return <Dialog modal open={open} onOpenChange={() => {
        setOpen(!open);
        if (open) {
            reset();
        }
    }}>
        <DialogTrigger asChild>
            <Button variant="default">
                <IconPlus />
                <span className="hidden lg:inline">Add Travel</span>
            </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-xl'>
            <form action={formAction}>
                <DialogHeader className='mb-4'>
                    <DialogTitle>Add Travel Record</DialogTitle>
                </DialogHeader>

                <div className='w-full space-y-3'>
                    <Label htmlFor="date">Date of travel</Label>
                    <Input id="date" type='date' name='date' aria-invalid={!!response?.errors?.date} defaultValue={response?.data?.date?.toString()} />
                    <div id="date-error" aria-live="polite" aria-atomic="true">
                        {response?.errors?.date &&
                            response.errors.date.map((error: string) => (
                                <p className='text-destructive text-xs' key={error}>{error}</p>
                            ))}
                    </div>
                </div>

                <div className='flex flex-row gap-4'>
                    <div className='w-full space-y-3'>
                        <Label htmlFor="destination">Destination of travel</Label>
                        <Input id="destination" type='text' name='destination' aria-invalid={!!response?.errors?.destination} defaultValue={response?.data?.destination} />
                        <div id="destination-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.destination &&
                                response.errors.destination.map((error: string) => (
                                    <p className='text-destructive text-xs' key={error}>{error}</p>
                                ))}
                        </div>
                    </div>

                    <div className='w-full space-y-3'>
                        <Label htmlFor="zip">ZIP of travel</Label>
                        <Input id="zip" type='text' name='zip' aria-invalid={!!response?.errors?.zip} defaultValue={response?.data?.zip} />
                        <div id="zip-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.zip &&
                                response.errors.zip.map((error: string) => (
                                    <p className='text-destructive text-xs' key={error}>{error}</p>
                                ))}
                        </div>
                    </div>
                </div>

                <div className='flex flex-row gap-4'>
                    <div className='w-full space-y-3'>
                        <Label htmlFor="startTime">Start time of travel</Label>
                        <TimeInputWrapper id="startTime" name='startTime' initTime={response?.data?.startTime} isInvalid={!!response?.errors?.startTime} disabled={isPending} />
                        <div id="startTime-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.startTime &&
                                response.errors.startTime.map((error: string) => (
                                    <p className='text-destructive text-xs' key={error}>{error}</p>
                                ))}
                        </div>
                    </div>
                    <div className='w-full space-y-3'>
                        <Label htmlFor="endTime">End time of travel</Label>
                        <TimeInputWrapper id="endTime" name='endTime' initTime={response?.data?.endTime} isInvalid={!!response?.errors?.endTime} disabled={isPending} />
                        <div id="endTime-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.endTime &&
                                response.errors.endTime.map((error: string) => (
                                    <p className='text-destructive text-xs' key={error}>{error}</p>
                                ))}
                        </div>
                    </div>
                </div>

                {response?.status === 'error' && response?.message && (
                    <Alert variant='destructive' className='border-0 mt-4'>
                        <TriangleAlertIcon />
                        <AlertTitle>{response.message}</AlertTitle>
                    </Alert>
                )}

                <DialogFooter className='mt-4 gap-4 sm:justify-end'>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button type='submit' disabled={isPending} variant='default'>{isPending ? "Adding..." : "Add"}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>;
}