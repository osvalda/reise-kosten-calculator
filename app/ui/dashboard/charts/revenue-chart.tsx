'use client'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Revenue } from '@/app/lib/definitions';
import { TooltipProps } from 'recharts';

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p className="label">{`${label} : ${payload && payload[0] ? payload[0].value + " EUR" : ''}`}</p>
        </>
      )}
    </div>
  );
};

const Example = ({ revenues }: { revenues: Revenue[] }) => {

  return (
    <div >
        <ResponsiveContainer width="100%" height="100%">
            <div >
            <BarChart
                width={800}
                height={500}
                id='month'
                data={revenues}
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'EUR', angle: -90, position: 'insideLeft' }}/>
                <Tooltip cursor={false} content={CustomTooltip}/>
                <Bar dataKey="revenue" fill="#8884d8" unit="EUR" />
            </BarChart>
            </div>
        </ResponsiveContainer>
    </div>
  );
};

export default Example;
