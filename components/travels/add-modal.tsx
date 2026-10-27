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
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { createTravel, FormResponse } from '@/app/lib/actions';
import { useActionState, useTransition } from 'react';
import { PreferencesTable } from '@/app/lib/definitions';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlertIcon, MapPin, Crosshair, ClockArrowUp, ClockArrowDown } from 'lucide-react';
import { toast } from "sonner";
import TimeInputWrapper from './time-input-wrapper';
import { useGeoapifyDataQuery, useGeoapifyRoutingDataQuery } from '@/hooks/useGeoApifyDataQuery';
import { GeoapifyApiParams, GeoapifyRoutingApiParams } from '@/app/lib/types/geoapifyApi.types';
import { Switch } from '../ui/switch';
import { RiInformation2Line } from "@remixicon/react";
import { useIstCalc } from '@/hooks/useIstCalc';
import { InputGroup, InputGroupInput, InputGroupAddon } from '../ui/input-group';

import { ChevronRightIcon, StarIcon, EraserIcon } from "lucide-react"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function AddModal({ preferences }: { preferences: PreferencesTable }) {
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(true);

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const istData = useIstCalc({ startTime, endTime, rounding: preferences.rounding_rule || 'math' });

    const [cityInput, setCityInput] = useState("");
    const [zipInput, setZipInput] = useState("");
    const [locationQuery, setLocationQuery] = useState<GeoapifyApiParams>();
    const [routingQuery, setRoutingQuery] = useState<GeoapifyRoutingApiParams>();

    const geoResult = useGeoapifyDataQuery(locationQuery);
    const routingResult = useGeoapifyRoutingDataQuery(routingQuery);

    const handleLocationBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'destination':
                setLocationQuery({
                    text: cityInput
                });
                break;
            case 'zip':
                setLocationQuery({
                    text: zipInput,
                    //TODO: get list from user preferences and set filter accordingly
                    filter: "hu,at,de"
                });
                break;
            default:
                break;
        }
    };

    //TODO: refactor this useEffect: too much dependencies
    useEffect(() => {
        if (geoResult.isSuccess) {
            setZipInput(geoResult.data?.postcode || "");
            setCityInput(geoResult.data?.city || cityInput);
            if (detailsOpen && geoResult.data?.lat && geoResult.data?.lon && preferences.lat && preferences.lon) {
                setRoutingQuery({
                    waypoints: "" + (geoResult.data?.lat + "," + geoResult.data?.lon + "|" +
                        preferences.lat + "," + preferences.lon)
                });
            }
            setLocationQuery(undefined);
        } if (routingResult.isError) {
            toast.error("Error fetching location data. Please check your input.");
            setCityInput('');
            setZipInput('');
            setLocationQuery(undefined);
            setRoutingQuery(undefined);
        }
    }, [geoResult.isSuccess, geoResult.data, cityInput, preferences, routingResult, detailsOpen]);

    const [, startTransition] = useTransition();
    const reset = (isResetForm?: boolean) => {
        if (isResetForm) {
            startTransition(() => {
                formAction(null);
            });
        }
        setCityInput('');
        setZipInput('');
        setLocationQuery(undefined);
        setRoutingQuery(undefined);
        setStartTime('');
        setEndTime('');
    };

    const [response, formAction, isPending] = useActionState(
        async (response: FormResponse | undefined, payload: FormData | null) => {
            if (payload === null) {
                return undefined;
            }

            return await createTravel(preferences, { message: null, errors: {} }, payload);
        },
        undefined,
    );

    useEffect(() => {
        if (response) {
            setOpen(response.keepOpen);
            if (response.status === 'success' && !response.keepOpen) {
                queueMicrotask(() => {
                    toast.success(response.message || 'Travel record created successfully.');
                });
            }
        }
    }, [response]);

    return <Dialog modal open={open} onOpenChange={(open) => {
        setOpen(open);
        reset(true);
    }}>
        <DialogTrigger asChild>
            <Button variant="default">
                <IconPlus />
                <span className="hidden lg:inline">Add Travel</span>
            </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-xl' onOpenAutoFocus={(e) => e.preventDefault()}>
            <form action={formAction}>
                <DialogHeader className='mb-4'>
                    <DialogTitle>Add Travel Record</DialogTitle>
                    <DialogDescription>
                        Please fill in the details below to add a new travel record.
                    </DialogDescription>
                </DialogHeader>

                {(response?.status === 'error' && response?.message) ?
                    <div className='mb-2 min-h-40'>
                        {response?.status === 'error' && response?.message && (
                            <Alert variant='destructive' className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                                <TriangleAlertIcon />
                                <AlertTitle>{response.message}</AlertTitle>
                                <AlertDescription>
                                    {Object.values(response?.errors || {}).flat().map((error: string, index: number) => (
                                        <div className='text-xs mb-1' key={index}>{error}</div>
                                    ))}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    :
                    <Card className="w-full gap-2 max-h-40 mb-2">
                        <CardHeader>
                            <CardTitle>Quick selection</CardTitle>
                            <CardDescription>
                                Select a common destination or ZIP code from the list below to quickly fill in the form.
                            </CardDescription>
                        </CardHeader>
                        <ItemGroup className="flex flex-row gap-4 mb-2 p-2">
                            <Item variant="outline" size="sm" asChild>
                                <a href="#">
                                    <ItemMedia>
                                        <ChevronRightIcon className="size-5" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>Last visited</ItemTitle>
                                        <ItemDescription>
                                            Sorokpolany, 9773
                                        </ItemDescription>
                                    </ItemContent>
                                </a>
                            </Item>
                            <Item variant="outline" size="sm" asChild>
                                <a href="#">
                                    <ItemMedia>
                                        <StarIcon className="size-5" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>Most visited</ItemTitle>
                                        <ItemDescription>
                                            Berlin, 10115
                                        </ItemDescription>
                                    </ItemContent>
                                </a>
                            </Item>
                            <Item variant="outline" size="sm" asChild onClick={(e) => {
                                e.preventDefault();
                                reset(false);
                            }}>
                                <a href="#">
                                    <ItemMedia>
                                        <EraserIcon className="size-5" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>Erease</ItemTitle>
                                        <ItemDescription>
                                            Clear all input fields
                                        </ItemDescription>
                                    </ItemContent>
                                </a>
                            </Item>
                        </ItemGroup>
                    </Card>
                }
                <FieldGroup className='w-full mb-2'>
                    <Field>
                        <FieldLabel htmlFor="date">Date of travel</FieldLabel>
                        <Input
                            id="date"
                            type='date'
                            name='date'
                            aria-invalid={!!response?.errors?.date}
                            defaultValue={response?.data?.date?.toString()}
                        />
                    </Field>
                </FieldGroup>

                <FieldGroup className='flex flex-row gap-4 mb-2'>
                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="destination">Destination of travel</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="destination"
                                type='text'
                                name='destination'
                                aria-invalid={!!response?.errors?.destination}
                                value={cityInput}
                                onChange={(e) => setCityInput(e.target.value)}
                                onBlur={handleLocationBlur}
                                disabled={geoResult.isLoading || routingResult.isLoading}
                            />
                            <InputGroupAddon align="inline-end">
                                <MapPin />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="zip">ZIP of travel</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="zip"
                                type='text'
                                name='zip'
                                aria-invalid={!!response?.errors?.zip}
                                value={zipInput}
                                onChange={(e) => setZipInput(e.target.value)}
                                onBlur={handleLocationBlur}
                                disabled={geoResult.isLoading || routingResult.isLoading}
                            />
                            <InputGroupAddon align="inline-end">
                                <Crosshair />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </FieldGroup>

                <FieldGroup className='flex flex-row gap-4  mb-2'>
                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="startTime">Start time of travel</FieldLabel>
                        <TimeInputWrapper
                            id="startTime"
                            name='startTime'
                            initTime={response?.data?.startTime}
                            isInvalid={!!response?.errors?.startTime}
                            setter={setStartTime}
                            disabled={isPending}
                            icon={<ClockArrowUp />}
                        />
                    </Field>

                    <Field className='w-full space-y-0'>
                        <FieldLabel htmlFor="endTime">End time of travel</FieldLabel>
                        <TimeInputWrapper
                            id="endTime"
                            name='endTime'
                            initTime={response?.data?.endTime}
                            isInvalid={!!response?.errors?.endTime}
                            setter={setEndTime}
                            disabled={isPending}
                            icon={<ClockArrowDown />}
                        />
                    </Field>
                </FieldGroup>

                <div className='w-full pb-2'>
                    <div className='flex flex-col gap-6'>
                        <div className='relative flex items-center gap-2'>
                            <span className='text-muted-foreground shrink-0 pr-2 text-sm font-medium'>
                                Journey Details (Read-only)
                                <HoverCard>
                                    <HoverCardTrigger className='cursor-pointer pl-1'>
                                        <RiInformation2Line size={16} className='inline-block' />
                                    </HoverCardTrigger>
                                    <HoverCardContent>Content</HoverCardContent>
                                </HoverCard>
                            </span>
                            <Separator className='flex-1' />
                            <Switch checked={detailsOpen} onCheckedChange={setDetailsOpen} size='default' id="distance-calc-mode" />
                        </div>
                    </div>
                </div>

                {detailsOpen &&
                    <div className='flex flex-col gap-4 mb-2'>
                        <FieldGroup className='flex flex-row gap-4 text-muted-foreground'>
                            <Field className='w-full space-y-0'>
                                <FieldLabel htmlFor="distance">Calculated distance (Km)</FieldLabel>
                                <Input
                                    id="distance"
                                    name='distance'
                                    className="aria-invalid:border-orange-500 aria-invalid:ring-orange-500/20"
                                    value={routingResult.data?.distance ? routingResult.data.distance / 1000 + " Km" : ""}
                                    aria-invalid={!!(!routingResult.isError && routingResult.data?.distance && routingResult.data.distance < preferences.min_distance)}
                                    disabled={true} />
                            </Field>

                            <Field className='w-full space-y-0'>
                                <FieldLabel htmlFor="ist">Calculated IST</FieldLabel>
                                <Input
                                    id="ist"
                                    name='ist'
                                    className="aria-invalid:border-orange-500 aria-invalid:ring-orange-500/20"
                                    value={istData.isError ? istData.errorMessage : istData.ist}
                                    aria-invalid={!!istData.isError}
                                    disabled={true} />
                            </Field>
                        </FieldGroup>
                    </div>
                }
                <DialogFooter className='mt-4 gap-4 sm:justify-end'>
                    <DialogClose asChild>
                        <Button variant='outline'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type='submit' disabled={isPending} variant='default'>{isPending ? "Adding Record..." : "Add travel Record"}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog >;
}