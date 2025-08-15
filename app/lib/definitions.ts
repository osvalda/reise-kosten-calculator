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
  rounded_duration: number;
  daily_amount: number;
};

export type Revenue = {
  month: string;
  revenue: number;
  month_order: number;
  year: number;
};

export type Addresses = {
  lat1: string;
  lon1: string;
  lat2: string;
  lon2: string;
};


