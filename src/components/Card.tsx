import type { JSX } from 'react';

const Card = ({ title, description }: { title: string; description: string }): JSX.Element => {
  return (
    <>
      <div className='bg-gray-800 text-white p-4 rounded-lg shadow-lg'>
        <h2 className='text-xl font-bold mb-2'>{title}</h2>
        <p className='text-gray-300'>{description}</p>
        <button className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
          Click Me
        </button>
      </div>
    </>
  );
};

export default Card;
