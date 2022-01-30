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
        'w-full h-auto p-4 shadow-sm rounded-md bg-slate-50 transition-all focus:outline-none',
        !isLoading &&
          'hover:-translate-y-1 hover:shadow-orange-500/20 hover:shadow-md',
        className && className
      )}
    >
      {!isLoading ? (
        children
      ) : (
        <div className='flex flex-col space-y-2'>
          <div
            className={cn(
              'w-4/5 h-3 bg-slate-400',
              isLoading && 'animate-pulse'
            )}
          ></div>
          <div
            className={cn(
              'w-3/5 h-3 bg-slate-400',
              isLoading && 'animate-pulse animation-delay-200'
            )}
          ></div>
          <div
            className={cn(
              'w-2/5 h-3 bg-slate-400',
              isLoading && 'animate-pulse animation-delay-400'
            )}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Card;
