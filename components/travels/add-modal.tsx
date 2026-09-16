/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { createTravel, State, FormResponse } from '@/app/lib/actions';
import { useActionState, useTransition } from 'react';
import { PreferencesTable } from '@/app/lib/definitions';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import { toast } from "sonner";
import TimeInputWrapper from './time-input-wrapper';
import { geocodeResponse, geocodingData } from '@/app/lib/mapActions';
import { useGeoapifyDataQuery } from '@/hooks/useGeoApifyDataQuery';
import { GeoapifyApiResponse } from '@/app/lib/types/geoapifyApi.types';

export function AddModal({ preferences }: { preferences: PreferencesTable }) {
    const [locationQuery, setLocationQuery] = useState<{text: string}>();
    const { error, data, isLoading, refetch } = useGeoapifyDataQuery(locationQuery);
    if (data && !isLoading) {

        console.log('Geoapify Data:', data.results[0].postcode);
    }

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

    // const [geoCodes, setGeoCodes] = useState({
    //     lat: 0,
    //     lon: 0,
    //     postcode: "",
    //     city: "",
    //     error: undefined
    // } as geocodeResponse);

    const handleLocationBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
        // const geoCode = await geocodingData(event.target.value, event.target.name === 'zip' ? 'postcode' : 'city');
        // setGeoCodes(geoCode);
        setLocationQuery({text: event.target.value});
        await refetch();
    };

    const [, startTransition] = useTransition();
    const reset = () => {
        startTransition(() => {
            formAction(null);
        });
        //setGeoCodes({ lat: 0, lon: 0, postcode: "", city: "", error: undefined });
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
                    <DialogDescription>
                        Please fill in the details below to add a new travel record.
                    </DialogDescription>
                </DialogHeader>

                <FieldGroup className='w-full'>
                    <Field>
                        <FieldLabel htmlFor="date">Date of travel</FieldLabel>
                        <Input id="date" type='date' name='date' aria-invalid={!!response?.errors?.date} defaultValue={response?.data?.date?.toString()} />
                        <div id="date-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.date &&
                                response.errors.date.map((error: string) => (
                                    <p className='text-destructive text-xs mb-4' key={error}>{error}</p>
                                ))}
                        </div>
                    </Field>
                </FieldGroup>

                <FieldGroup className='flex flex-row gap-4'>
                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="destination">Destination of travel</FieldLabel>
                        <Input id="destination"
                            type='text'
                            name='destination'
                            aria-invalid={!!response?.errors?.destination}
                            defaultValue={response?.data?.destination || data?.results[0]?.city}
                            onBlur={handleLocationBlur} />
                        <FieldError id="destination-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.destination &&
                                response.errors.destination.map((error: string) => (
                                    <p className='text-destructive text-xs mb-4' key={error}>{error}</p>
                                ))}
                        </FieldError>
                    </Field>

                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="zip">ZIP of travel</FieldLabel>
                        <Input id="zip"
                            type='text'
                            name='zip'
                            aria-invalid={!!response?.errors?.zip}
                            defaultValue={response?.data?.zip || data?.results[0]?.postcode}
                            onBlur={handleLocationBlur} />
                        <FieldError id="zip-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.zip &&
                                response.errors.zip.map((error: string) => (
                                    <p className='text-destructive text-xs mb-4' key={error}>{error}</p>
                                ))}
                        </FieldError>
                    </Field>
                </FieldGroup>

                <FieldGroup className='flex flex-row gap-4'>
                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="startTime">Start time of travel</FieldLabel>
                        <TimeInputWrapper id="startTime" name='startTime' initTime={response?.data?.startTime} isInvalid={!!response?.errors?.startTime} disabled={isPending} />
                        <FieldError id="startTime-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.startTime &&
                                response.errors.startTime.map((error: string) => (
                                    <p className='text-destructive text-xs mb-4' key={error}>{error}</p>
                                ))}
                        </FieldError>
                    </Field>

                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="endTime">End time of travel</FieldLabel>
                        <TimeInputWrapper id="endTime" name='endTime' initTime={response?.data?.endTime} isInvalid={!!response?.errors?.endTime} disabled={isPending} />
                        <FieldError id="endTime-error" aria-live="polite" aria-atomic="true">
                            {response?.errors?.endTime &&
                                response.errors.endTime.map((error: string) => (
                                    <p className='text-destructive text-xs mb-4' key={error}>{error}</p>
                                ))}
                        </FieldError>
                    </Field>
                </FieldGroup>

                <FieldGroup className='flex flex-row gap-4'>
                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="distance">Calculated distance</FieldLabel>
                        <Input id="distance" name='distance' value="bela" disabled={true} />
                    </Field>

                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="ist">Calculated IST</FieldLabel>
                        <Input id="ist" name='ist' value={data?.results[0]?.lat + ", " + data?.results[0]?.lon} disabled={true} />
                    </Field>
                </FieldGroup>
                {response?.status === 'error' && response?.message && (
                    <Alert variant='destructive' className='border-0 mt-4 pl-0'>
                        <TriangleAlertIcon />
                        <AlertTitle>{response.message}</AlertTitle>
                    </Alert>
                )}

                <DialogFooter className='mt-4 gap-4 sm:justify-end'>
                    <DialogClose asChild>
                        <Button variant='outline'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type='submit' disabled={isPending} variant='default'>{isPending ? "Adding..." : "Add"}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>;
}