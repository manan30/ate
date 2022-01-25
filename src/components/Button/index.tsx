import React from 'react';
import cn from 'classnames';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'error' | 'link';
  className?: string;
  onClickHandler: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  onClickHandler
}) => {
  const buttonClasses = cn(
    'px-4 py-2 rounded-md text-sm font-medium text-slate-50 hover:shadow-md focus:shadow-md focus:outline-none',
    variant === 'secondary' && 'bg-orange-600 hover:bg-orange-700',
    variant === 'primary' && 'bg-slate-600 hover:bg-slate-700',
    variant === 'error' && 'bg-red-600 hover:bg-red-700',
    variant === 'link' &&
      'text-orange-600 hover:text-orange-700 hover:shadow-none focus:shadow-none',
    className && className
  );
  return (
    <button className={buttonClasses} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Button;
