import React from 'react';
import cn from 'classnames';
import { PhoneIcon, GlobeAltIcon } from '@heroicons/react/outline';
import Card from '../../../components/Card';
import { useBadgeStyles } from '../../../hooks/ui/useBadgeStyles';
import { convertMeterToMile } from '../../../utils/functions/convert-meter-to-mile';
import { Level2HereCategories } from '../../../hooks/ui/constants';
import type { BrowseItem } from '../../../api/places/types';

type ExploreNearbyCardProps = {
  item: BrowseItem;
};

const level2CategoryCodes = Object.keys(Level2HereCategories);

// openingHours 1 item
// ▶ 0 4 items
// ▶ categories 1 item
// ▶ text 2 items
// isOpen: true
// ▶ structured 2 items
// ▶ 0 3 items
// start: "T113000"
// duration: "PT08H30M"
// recurrence: "FREQ:DAILY;BYDAY:MO,TU,WE,TH"

const ExploreNearbyCard: React.FC<ExploreNearbyCardProps> = ({ item }) => {
  const level2Category = item.categories?.find((c) =>
    level2CategoryCodes.includes(c.id)
  );
  const otherCategories = item.categories
    ?.filter((c) => c.id !== level2Category?.id)
    .map((c) => c.name);
  const foodTypes = [
    ...new Set(
      item.foodTypes
        ?.map((ft) => ft.name)
        .reduce((acc, ft) => {
          acc.push(...ft.split('-'));
          return acc;
        }, [] as string[])
        .reduce((acc, ft) => {
          acc.push(...ft.split(' '));
          return acc;
        }, [] as string[])
        .filter(Boolean)
    )
  ];
  const categoryBadgeStyles = useBadgeStyles(level2Category?.name ?? '');
  const foodTypeBadgeStyles = useBadgeStyles('foodType');
  const contacts = item.contacts?.[0];
  item.openingHours?.[0].structured.reduce(
    (acc: Record<string, string>, curr: Record<string, string>) => {
      const startTime = curr.start.split('T')[1];
      const duration = curr.duration.split('PT')[1];
      const recurrence = curr.recurrence.split(':')[2].split(',');

      for (let i = 0; i < recurrence.length; i += 1) {
        acc[recurrence[i]] = startTime + duration;
      }
      return acc;
    },
    {} as Record<string, string>
  );

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
              categoryBadgeStyles
            )}
          >
            {level2Category.name}
          </div>
        ) : null}
        {otherCategories?.length ? (
          <div className='text-xs italic font-light text-slate-600'>
            {otherCategories.join(', ')}
          </div>
        ) : null}
        {foodTypes?.length ? (
          <div className='flex items-center space-x-3'>
            {foodTypes.map((foodType) => (
              <div className={foodTypeBadgeStyles} key={foodType}>
                {foodType}
              </div>
            ))}
          </div>
        ) : null}
        {contacts ? (
          <div className='flex space-x-3 item-center'>
            {contacts?.phone ? (
              <a
                href={`tel:${contacts.phone[0]?.value ?? ''}`}
                className='focus:outline-orange-600'
              >
                <PhoneIcon className='w-4 h-4 text-gray-900' />
              </a>
            ) : null}
            {contacts?.www ? (
              <a
                href={contacts.www[0]?.value ?? ''}
                className='focus:outline-orange-600'
              >
                <GlobeAltIcon className='w-4 h-4 text-gray-900' />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default ExploreNearbyCard;
