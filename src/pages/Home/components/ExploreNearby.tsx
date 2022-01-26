import Card from '../../../components/Card';
import LoadingCards from '../../../components/Card/LoadingCards';
import useBrowse from '../../../hooks/here-api/useBrowse';

const ExploreNearby = () => {
  const { browseData, isLoading } = useBrowse();

  return (
    <section className='w-full mt-6'>
      <h2 className='text-lg font-medium text-slate-700'>Explore Nearby</h2>
      {isLoading ? (
        <LoadingCards />
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {browseData.map((item) => (
            <Card key={item.id}>
              <div className='mb-1 font-medium text-slate-800'>
                {item.title}
              </div>
              <div className='text-xs truncate text-slate-500'>
                {item.address?.label}
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExploreNearby;
