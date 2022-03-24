import React from 'react';
import cn from 'classnames';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'error' | 'link' | 'default';
  className?: string;
  type?: 'submit' | 'button';
  onClickHandler?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  type = 'button',
  onClickHandler
}) => {
  const buttonClasses = cn(
    'px-4 py-1 rounded-md text-xs md:text-sm font-medium text-slate-50 focus:outline-none',
    variant === 'secondary' && 'bg-orange-300 hover:bg-orange-500',
    variant === 'primary' &&
      'bg-orange-200 hover:bg-orange-300 focus:bg-orange-300 focus:outline-orange-500 text-orange-800',
    variant === 'error' && 'bg-red-600 hover:bg-red-700',
    variant === 'default' &&
      'bg-slate-200 focus:bg-slate-300 hover:bg-slate-300 text-slate-800 focus:outline-slate-500',
    variant === 'link' &&
      'text-orange-600 hover:text-orange-700 hover:shadow-none focus:shadow-none',
    className && className
  );
  return (
    <button className={buttonClasses} type={type} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Button;
