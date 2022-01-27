import React from 'react';
import cn from 'classnames';
import Card from '../../../components/Card';
import { useBadgeStyles } from '../../../hooks/ui/useBadgeStyles';
import { convertMeterToMile } from '../../../utils/functions/convert-meter-to-mile';
import type { BrowseItem } from '../../../api/places/types';
import { Level2HereCategories } from '../../../hooks/ui/constants';

type ExploreNearbyCardProps = {
  item: BrowseItem;
};

const level2CategoryCodes = Object.keys(Level2HereCategories);

const ExploreNearbyCard: React.FC<ExploreNearbyCardProps> = ({ item }) => {
  const level2Category = item.categories?.find((c) =>
    level2CategoryCodes.includes(c.id)
  );
  const badgeStyles = useBadgeStyles(level2Category?.name ?? '');

  return (
    <Card key={item.id}>
      <div className='relative flex flex-col space-y-1'>
        <div className='font-medium text-slate-800'>{item.title}</div>
        <div className='text-xs truncate text-slate-500'>
          {item.address?.label.split(',').slice(1).join(',')}
        </div>
        {item.distance ? (
          <div className='text-xs italic truncate text-slate-500'>
            {convertMeterToMile(item.distance)} mi
          </div>
        ) : null}
        {level2Category ? (
          <div
            className={cn(
              'absolute right-0 h-auto w-auto -translate-y-2 translate-x-2',
              badgeStyles
            )}
          >
            {level2Category.name}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default ExploreNearbyCard;
