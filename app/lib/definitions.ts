export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image_url: string;
  role: 'admin' | 'user';
};

export type RoundingTypes = 'math' | 'up';

export type PreferencesTable = {
  id: string;
  daily_fee: number;
  home_base: string;
  user_id: string;
  rounding_rule: RoundingTypes;
  currency: 'eur' | 'usd';
  language: 'deutsch' | 'english' | 'magyar';
};

export type UserData = {
  user: User;
  preferences: PreferencesTable;
};

export type TravelsTable = {
  id: string;
  user_id: string;
  date: Date;
  destination: string;
  start_time: number;
  end_time: number;
  duration: number;
  rounded_duration: number;
  daily_amount: number;
  zip: string;
};

export type Revenue = {
  month: string;
  revenue: number;
  month_order: number;
  year: number;
};