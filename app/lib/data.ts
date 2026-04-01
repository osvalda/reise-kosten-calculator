import postgres from 'postgres';
import {
  Revenue,
  PreferencesTable,
  TravelsTable
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    const data = await sql<Revenue[]>`SELECT month, revenue, year FROM revenue ORDER BY month_order asc, year desc limit 12`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchUserPreferences(userId : string) {
  try {
    const data = await sql<PreferencesTable[]>`SELECT * FROM preferences where user_id = ${`${userId}`} LIMIT 1;`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user preferences data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredTravels(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const travels = await sql<TravelsTable[]>`
      SELECT
        id, user_id, date, destination, start_time, end_time, duration, rounded_duration, daily_amount, zip
      FROM travels
      WHERE
        travels.destination ILIKE ${`%${query}%`} OR
        CAST(travels.date AS VARCHAR) ILIKE ${`%${query}%`} OR
        CAST(travels.duration AS VARCHAR) ILIKE ${`%${query}%`} OR
        CAST(travels.zip AS VARCHAR) ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return travels;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered travels.');
  }
}

export async function fetchTravelsPages(query: string) {
  //    JOIN customers ON invoices.customer_id = customers.id
  try {
    const data = await sql`SELECT COUNT(*)
    FROM travels
    WHERE
        travels.destination ILIKE ${`%${query}%`} OR
        CAST(travels.date AS VARCHAR) ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}


export async function fetchTravelById(id: string) {
  try {
    const data = await sql<TravelsTable[]>`
      SELECT
        id, user_id, date, destination, start_time, end_time, duration, rounded_duration, daily_amount, zip
      FROM travels WHERE travels.id = ${id};
    `;

    const travel = data.map((travel) => ({
      ...travel,
      // Convert amount from cents to dollars
      // amount: invoice.amount / 100,
    }));

    return travel[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch travel by Id.');
  }
}

/************************************ */


export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql `SELECT COUNT(*) FROM travels`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      // customerCountPromise,
      // invoiceStatusPromise,
    ]);

    const numberOfTravels = Number(data[0][0].count ?? '0');
    // const numberOfCustomers = Number(data[1][0].count ?? '0');
    // const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      // numberOfCustomers,
      numberOfTravels,
      // totalPaidInvoices,
      // totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
