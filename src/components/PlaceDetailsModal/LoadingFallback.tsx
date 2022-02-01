const LoadingFallback = () => {
  return (
    <div className='flex flex-col space-y-2'>
      <div className='w-4/5 h-3 rounded-sm bg-slate-400 animate-pulse'></div>
      <div className='w-3/5 h-3 rounded-sm animation-delay-150 animate-pulse bg-slate-400'></div>
      <div className='w-2/5 h-3 rounded-sm animation-delay-300 animate-pulse bg-slate-400'></div>
      <div className='w-1/3 h-3 delay-200 rounded-sm animation-delay-300 animate-pulse bg-slate-400'></div>
      <div className='w-3/12 h-3 rounded-sm animation-delay-500 animate-pulse bg-slate-400'></div>
      <div className='w-1/5 h-3 rounded-sm animation-delay-500 animate-pulse bg-slate-400'></div>
      <div className='w-1/6 h-3 rounded-sm animation-delay-700 animate-pulse bg-slate-400'></div>
      <div className='w-1/12 h-3 rounded-sm animation-delay-700 animate-pulse bg-slate-400'></div>
    </div>
  );
};

export default LoadingFallback;
