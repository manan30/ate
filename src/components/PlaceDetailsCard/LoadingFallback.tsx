const LoadingFallback = () => {
  return (
    <div className='flex flex-col space-y-2 animate-pulse'>
      <div className='w-4/5 h-3 rounded-sm bg-slate-400'></div>
      <div className='w-3/5 h-3 rounded-sm bg-slate-400'></div>
      <div className='w-2/5 h-3 rounded-sm bg-slate-400'></div>
      <div className='w-1/3 h-3 rounded-sm bg-slate-400'></div>
      <div className='w-3/12 h-3 rounded-sm bg-slate-400'></div>
      <div className='w-1/5 h-3 rounded-sm bg-slate-400'></div>
      <div className='w-1/6 h-3 rounded-sm bg-slate-400'></div>
      <div className='w-1/12 h-3 rounded-sm bg-slate-400'></div>
    </div>
  );
};

export default LoadingFallback;
