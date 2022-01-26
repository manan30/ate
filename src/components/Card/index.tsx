import React from 'react';
import cn from 'classnames';

type CardProps = {
  className?: string;
  isLoading?: boolean;
};

const Card: React.FC<CardProps> = ({ className, children, isLoading }) => {
  return (
    <div
      className={cn(
        'w-full h-auto p-4 shadow-sm rounded-md bg-slate-50 hover:shadow-md transition-all hover:-translate-y-1 hover:shadow-orange-500/20',
        className && className
      )}
    >
      {!isLoading ? (
        children
      ) : (
        <div
          className={cn(
            `flex flex-col space-y-2`,
            isLoading && 'animate-pulse'
          )}
        >
          <div className='w-4/5 h-3 bg-slate-400'></div>
          <div className='w-3/5 h-3 bg-slate-400'></div>
          <div className='w-2/5 h-3 bg-slate-400'></div>
        </div>
      )}
    </div>
  );
};

export default Card;
