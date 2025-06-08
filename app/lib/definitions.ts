export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image_url: string;
  role: 'admin' | 'user';
};

export type PreferencesTable = {
  id: string;
  daily_fee: number;
  home_base: string;
  user_id: string;
  rounding_rule: 'math' | 'up';
  currency: 'eur' | 'usd';
  language: 'deutsch' | 'english' | 'magyar';
};

export type TravelsTable = {
  id: string;
  user_id: string;
  date: string;
  destination: string;
  start_time: string;
  end_time: string;
  duration: number;
  rounded_durration: number;
  daily_amount: number;
};

export type Revenue = {
  month: string;
  revenue: number;
  month_order: number;
  year: number;
};


//******************************

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
