'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { PreferencesTable } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  destination: z.string(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
});

const CreateTravel = FormSchema.omit({ id: true });

export async function createTravel(preferences: PreferencesTable, formData: FormData) {
    const { destination, date, startTime, endTime } = CreateTravel.parse({
        destination: formData.get('destination'),
        date: formData.get('date'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
    });

    let duration = 111;
    let roundedDuration = 222;
    let dailyAmount = preferences.daily_fee * 10;

    await sql`
    INSERT INTO travels (user_id, destination, date, start_time, end_time, duration, rounded_duration, daily_amount)
    VALUES (${preferences.user_id}, ${destination}, ${date}, ${startTime}, ${endTime}, ${duration}, ${roundedDuration}, ${dailyAmount})
  `;

  revalidatePath('/dashboard/travels');
  redirect('/dashboard/travels');
}

export async function editTravel(id: string, preferences: PreferencesTable, formData: FormData) {
  const { destination, date, startTime, endTime } = CreateTravel.parse({
    destination: formData.get('destination'),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    endTime: formData.get('endTime'),
  });

  let duration = 111;
  let roundedDuration = 222;
  let dailyAmount = preferences.daily_fee * 10;

  await sql`
    UPDATE travels
    SET user_id = ${preferences.user_id}, destination = ${destination}, date = ${date}, start_time = ${startTime}, end_time = ${endTime}, duration = ${duration}, rounded_duration = ${roundedDuration}, daily_amount = ${dailyAmount}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/travels');
  redirect('/dashboard/travels');
}

export async function deleteTravel(id: string) {
  await sql`DELETE FROM travels WHERE id = ${id}`;
  revalidatePath('/dashboard/travels');
}