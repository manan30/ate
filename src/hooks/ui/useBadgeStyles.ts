import { HERECategories } from './constants';

export const useBadgeStyles = (type: HERECategories | string) => {
  if (type === '') return '';

  if (type === 'foodType')
    return `w-auto h-full grid place-items-center text-[0.6rem] font-medium rounded-md px-3 py-1 tracking-tight truncate text-center bg-slate-300 text-slate-800`;

  const baseStyles =
    'w-full h-full grid place-items-center text-slate-50 text-[0.6rem] font-medium rounded-md px-3 py-1 tracking-tight truncate max-w-[6rem] text-center';

  switch (type) {
    case HERECategories.Restaurant:
      return `${baseStyles} bg-green-700`;
    case HERECategories.LandmarkAttraction:
      return `${baseStyles} bg-indigo-600`;
    case HERECategories.ShoppingMall:
      return `${baseStyles} bg-rose-600`;
    default:
      return `${baseStyles} bg-slate-600`;
  }
};
