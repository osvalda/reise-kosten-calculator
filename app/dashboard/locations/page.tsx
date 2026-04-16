import { Metadata } from 'next';
import Test from '@/components/location/test';

export const metadata: Metadata = {
  title: 'Locations',
};


export default function Page() {
  return <section>
    <p>Locations Page</p>
    <Test />
  </section>;
}