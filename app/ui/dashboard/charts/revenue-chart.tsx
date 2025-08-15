'use client'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Revenue } from '@/app/lib/definitions';

const Example = ({ revenues }: { revenues: Revenue[] }) => {

  return (
        <ResponsiveContainer width="100%" height="100%">
            <div >
              <BarChart
                  width={800}
                  height={500}
                  id='month'
                  data={revenues}
              >
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'EUR', angle: -90, position: 'insideLeft' }}/>
                  <Tooltip cursor={false} />
                  <Bar dataKey="revenue" fill="#8884d8" unit="EUR" />
              </BarChart>
            </div>
        </ResponsiveContainer>
  );
};

export default Example;
