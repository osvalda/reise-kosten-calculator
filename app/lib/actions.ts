'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { PreferencesTable } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  destination: z.string().min(3, {message: "Please provide a destination."}),
  date: z.coerce.date({
    invalid_type_error: 'Please provide date of travel.',
  }),
  startTime: z.string().min(5, {message: "Please provide start time."}),
  endTime: z.string().min(5, {message: "Please provide end time."}),
});

const CreateTravel = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    destination?: string[];
    date?: string[];
    startTime?: string[];
    endTime?: string[];
  };
  message?: string | null;
};

export async function createTravel(preferences: PreferencesTable, prevState: State, formData: FormData) {
    const validatedFields = CreateTravel.safeParse({
        destination: formData.get('destination'),
        date: formData.get('date'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Travel.',
      };
    }
    const { destination, date, startTime, endTime } = validatedFields.data;

    let duration = 111;
    let roundedDuration = 222;
    let dailyAmount = preferences.daily_fee * 10;

    try {
      await sql`
        INSERT INTO travels (user_id, destination, date, start_time, end_time, duration, rounded_duration, daily_amount)
        VALUES (${preferences.user_id}, ${destination}, ${date}, ${startTime}, ${endTime}, ${duration}, ${roundedDuration}, ${dailyAmount})
      `;
    } catch (error) {

    }

  revalidatePath('/dashboard/travels');
  revalidatePath('/dashboard');
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

  try {
    await sql`
      UPDATE travels
      SET user_id = ${preferences.user_id}, destination = ${destination}, date = ${date}, start_time = ${startTime}, end_time = ${endTime}, duration = ${duration}, rounded_duration = ${roundedDuration}, daily_amount = ${dailyAmount}
      WHERE id = ${id}
    `;
  } catch (error) {

  }

  revalidatePath('/dashboard/travels');
  revalidatePath('/dashboard');
  redirect('/dashboard/travels');
}

export async function deleteTravel(id: string) {
  // throw new Error('Failed to Delete Travel');
  try {
    await sql`DELETE FROM travels WHERE id = ${id}`;
  } catch (error) {

  }
  revalidatePath('/dashboard/travels');
  revalidatePath('/dashboard');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}