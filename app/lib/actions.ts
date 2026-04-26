'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { PreferencesTable, User } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';
import { signIn, auth, getUser } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  destination: z.string().min(3, { message: "Please provide a destination." }),
  zip: z.string().min(4, { message: "Please provide a ZIP." }),
  date: z.coerce.date({
    // invalid_type_error: 'Please provide date of travel.',
  }),
  startTime: z.string().min(5, { message: "Please provide start time." }),
  endTime: z.string().min(5, { message: "Please provide end time." }),
});

const CreateTravel = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    destination?: string[];
    zip?: string[];
    date?: string[];
    startTime?: string[];
    endTime?: string[];
  };
  message?: string | null;
};

export type FormSchemaType = z.infer<typeof FormSchema>;
export type FormResponse = {
  status: 'success' | 'error';
  keepOpen: boolean;
  errors?: {
    date?: string[];
    destination?: string[];
    zip?: string[];
    startTime?: string[];
    endTime?: string[];
  };
  message?: string;
  data?: FormSchemaType;
};

export async function createTravel(preferences: PreferencesTable, prevState: State, formData: FormData) {
  const response: FormResponse = { status: 'success', keepOpen: false, message: 'Tour date created successfully.' };
  const data = Object.fromEntries(formData);
  const validatedFields = CreateTravel.safeParse({
    destination: formData.get('destination'),
    zip: formData.get('zip'),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    endTime: formData.get('endTime'),
  });

  if (!validatedFields.success) {
    response.status = 'error';
    response.errors = validatedFields.error.flatten().fieldErrors;
    response.keepOpen = true;
    response.message = 'Missing Fields. Failed to Create Travel.';
    response.data = data as unknown as FormSchemaType;
    return response;
  }

  const { destination, zip, date, startTime, endTime } = validatedFields.data;

  const duration = 111;
  const roundedDuration = 222;
  const dailyAmount = preferences.daily_fee * 10;

  try {
    await sql`
        INSERT INTO travels (user_id, destination, date, start_time, end_time, duration, rounded_duration, daily_amount, zip)
        VALUES (${preferences.user_id}, ${destination}, ${date}, ${startTime}, ${endTime}, ${duration}, ${roundedDuration}, ${dailyAmount}, ${zip})
      `;
  } catch (error) {
    console.error('Create Error:', error);
    response.status = 'error';
    response.keepOpen = true;
    response.message = 'Failed to create travel record.';
    response.data = formData as unknown as FormSchemaType;
    return response;
  }

  revalidatePath('/dashboard/travels');
  revalidatePath('/dashboard');
  return response;
}

export async function editTravel(id: string, preferences: PreferencesTable, prevState: State, formData: FormData) {
  const response: FormResponse = { status: 'success', keepOpen: false, message: 'Tour date created successfully.' };
  const data = Object.fromEntries(formData);
  const validatedFields = CreateTravel.safeParse({
    destination: formData.get('destination'),
    zip: formData.get('zip'),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    endTime: formData.get('endTime'),
  });

  if (!validatedFields.success) {
    response.status = 'error';
    response.errors = validatedFields.error.flatten().fieldErrors;
    response.keepOpen = true;
    response.message = 'Missing Fields. Failed to Parse Travel.';
    response.data = data as unknown as FormSchemaType;
    return response;
  }

  const { destination, zip, date, startTime, endTime } = validatedFields.data;

  const duration = 111;
  const roundedDuration = 222;
  const dailyAmount = preferences.daily_fee * 10;

  try {
    await sql`
      UPDATE travels
      SET user_id = ${preferences.user_id}, destination = ${destination}, date = ${date}, start_time = ${startTime},
      end_time = ${endTime}, duration = ${duration}, rounded_duration = ${roundedDuration}, daily_amount = ${dailyAmount},
      zip = ${zip}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Update Error:', error);
    response.status = 'error';
    response.keepOpen = true;
    response.message = 'Failed to update travel record.';
    response.data = formData as unknown as FormSchemaType;
    return response;
  }

  revalidatePath('/dashboard/travels');
  revalidatePath('/dashboard');
  return response;
}

export async function deleteTravel(id: string) {
  try {
    await sql`DELETE FROM travels WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete Error:', error);
    throw new Error('Failed to delete travel record.');
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

export async function fetchActiveUserData(): Promise<User> {
  try {
    const email = await getEmailFromAuth();
    if (!email) throw new Error("Wrong email!");

    const user = await getUser(email);
    return user;
  } catch (error) {
    console.error("Could not fetch active user!");
    throw error;
  }
}

export async function fetchUserDataByEmail(email: string | undefined): Promise<User | undefined> {
  try {
    if (!email) throw new Error("Wrong email!");

    const user = await getUser(email);
    return user;
  } catch (error) {
    console.error("Could not fetch user!");
    throw error;
  }
}

export async function getEmailFromAuth(): Promise<string | undefined> {
  try {
    const authData = await auth();
    const email = authData?.user?.email;
    return email;
  } catch (error) {
    console.error("Could not auth user!");
    throw error;
  }
}