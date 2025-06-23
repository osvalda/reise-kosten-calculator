'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { PreferencesTable, User, Addresses } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, auth, getUser } from '@/auth';
import { AuthError } from 'next-auth';
import { createUrl } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  destination: z.string().min(3, {message: "Please provide a destination."}),
  zip: z.string().min(4, {message: "Please provide a ZIP."}),
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
    zip?: string[];
    date?: string[];
    startTime?: string[];
    endTime?: string[];
  };
  message?: string | null;
};

export async function createTravel(preferences: PreferencesTable, prevState: State, formData: FormData) {
    const validatedFields = CreateTravel.safeParse({
        destination: formData.get('destination'),
        zip: formData.get('zip'),
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
    const { destination, zip, date, startTime, endTime } = validatedFields.data;

    let duration = 111;
    let roundedDuration = 222;
    let dailyAmount = preferences.daily_fee * 10;
    let finalDestination = destination + ", " + zip;

    try {
      await sql`
        INSERT INTO travels (user_id, destination, date, start_time, end_time, duration, rounded_duration, daily_amount)
        VALUES (${preferences.user_id}, ${finalDestination}, ${date}, ${startTime}, ${endTime}, ${duration}, ${roundedDuration}, ${dailyAmount})
      `;
    } catch (error) {
      console.error(error);
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

export async function fetchActiveUserData(): Promise<User | undefined> {
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

const geocodeAddressUrl = 'https://mapquasar.p.rapidapi.com/geocode?address=';
const distanceUrl = "https://mapquasar.p.rapidapi.com/calculate-distance?unit=km&lat2=(lat2)&lon2=(lon2)&lat1=(lat1)&lon1=(lon1)";
const addressDetailsUrl = "https://mapquasar.p.rapidapi.com/reverse-geocode?longitude=(lon1)&latitude=(lat1)";
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '601156ccdamshd55c9436266696ap142612jsnb4a8b927a2a4',
		'x-rapidapi-host': 'mapquasar.p.rapidapi.com'
	}
};

export async function getGeocodeAddress(address: string): Promise<any | undefined> {
  return fetchDestinationData(geocodeAddressUrl + address);
}

export async function getAddressDetails(lat1: string, lon1: string): Promise<any | undefined> {
  let addresses = <Addresses>{ lon1 : lon1, lat1 : lat1 };
  const url = createUrl(addressDetailsUrl, addresses);
  console.log("feloldott details url: " + url);
  return fetchDestinationData(url);
}

export async function getDistanceAsKm(lat1: string, lon1: string, lat2: string, lon2: string, ): Promise<any | undefined> {
  let addresses = <Addresses>{ lon1 : lon1, lat1 : lat1, lon2 : lon2, lat2 : lat2 };
  const url = createUrl(distanceUrl, addresses);

  return fetchDestinationData(url);
}

async function fetchDestinationData(url: string): Promise<any | undefined> {
  try {
    const response = await fetch(url, options);
    const jsresult = await response.json();
    return jsresult;
  } catch (error) {
    console.error("Could not fetch data!");
    throw error;
  }
}