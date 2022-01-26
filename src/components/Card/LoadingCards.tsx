import React from 'react';
import Card from '.';

type CardProps = {
  count?: number;
};

const LoadingCards: React.FC<CardProps> = ({ count = 10 }) => {
  return (
    <div className='grid w-full grid-cols-3 gap-4'>
      {new Array(count).fill(0).map((_, i) => (
        <Card key={i + 1} isLoading />
      ))}
    </div>
  );
};

export default LoadingCards;
