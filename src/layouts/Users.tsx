import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type BitcoinPrice = {
  date: string;
  price: number;
};

const fetchBitcoinPrices = async (): Promise<BitcoinPrice[]> => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
    params: { vs_currency: 'usd', days: 7 },
  });

  return response.data.prices.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price,
  }));
};

export const UsersLayout = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bitcoinPrices'],
    queryFn: fetchBitcoinPrices,
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
   <div className="flex flex-col h-full">
      <h1 className='p-2 mb-1 rounded-md text-center text-2xl bg-gray-600'>Bitcoin Prices</h1>

      <div className='w-full h-full bg-primary-dark rounded-lg p-4 shadow-lg flex-grow'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <CartesianGrid stroke='#ccc' />
            <XAxis dataKey='date' stroke='#ccc' />
            <YAxis stroke='#ccc' />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563', color: '#fff' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type='monotone' dataKey='price' stroke='#38bdf8' strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
