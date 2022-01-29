import React from 'react';
import Card from '.';

type CardProps = {
  count?: number;
};

const LoadingCards: React.FC<CardProps> = ({ count = 10 }) => {
  return (
    <>
      {new Array(count).fill(0).map((_, i) => (
        <Card key={i + 1} isLoading />
      ))}
    </>
  );
};

export default LoadingCards;
