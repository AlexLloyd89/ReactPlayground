import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const fetchCoinPrices = async (coin: string) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: 30,
    },
  });

  return res.data.prices.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price,
  }));
};

export const UsersLayout = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['crypto-prices', selectedCoin],
    queryFn: () => fetchCoinPrices(selectedCoin),
  });

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCoin(event.target.value);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color='error'>Error fetching data</Typography>;

  return (
    <div className='flex flex-col h-full'>
      <h1 className='p-2 mb-1 rounded-md text-center text-2xl bg-gray-600'>{selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Prices</h1>

      <div className='w-full h-full bg-primary-dark rounded-lg p-4 shadow-lg flex flex-col'>

        <FormControl fullWidth>
          <InputLabel id='coin-label'>Coin</InputLabel>
          <Select labelId='coin-label' value={selectedCoin} label='Coin' onChange={handleChange}>
            <MenuItem value='bitcoin'>Bitcoin</MenuItem>
            <MenuItem value='ethereum'>Ethereum</MenuItem>
            <MenuItem value='dogecoin'>Dogecoin</MenuItem>
          </Select>
        </FormControl>

        <div className='flex-grow mt-4' style={{ minHeight: 0 }}>
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
    </div>
  );
};
