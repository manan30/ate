import React from 'react';
import cn from 'classnames';
import { PhoneIcon, GlobeAltIcon } from '@heroicons/react/outline';
import Card from '../../../components/Card';
import { useBadgeStyles } from '../../../hooks/ui/useBadgeStyles';
import { convertMeterToMile } from '../../../utils/functions/convert-meter-to-mile';
import { Level2HereCategories } from '../../../hooks/ui/constants';
import type { BrowseItem } from '../../../api/places/types';
import { formatTimeToHrs } from '../../../utils/functions/convert-number-to-hrs';
import { weekDayMappings } from '../../../utils/constants';

type ExploreNearbyCardProps = {
  item: BrowseItem;
};

const level2CategoryCodes = Object.keys(Level2HereCategories);

const ExploreNearbyCard: React.FC<ExploreNearbyCardProps> = ({ item }) => {
  const level2Category = item.categories?.find((c) =>
    level2CategoryCodes.includes(c.id)
  );
  const otherCategories = item.categories
    ?.filter((c) => c.id !== level2Category?.id)
    .map((c) => c.name);

  const primaryFoodType = item.foodTypes?.filter((ft) => ft.primary);

  const categoryBadgeStyles = useBadgeStyles(level2Category?.name ?? '');
  const foodTypeBadgeStyles = useBadgeStyles('foodType');
  const contacts = item.contacts?.[0];
  const isOpen = item.openingHours?.[0].isOpen;
  const hours: Record<string, string> =
    item.openingHours?.[0].structured.reduce(
      (acc: Record<string, string>, curr: Record<string, string>) => {
        const startTime = curr.start.split('T')[1];
        const duration = curr.duration.split('PT')[1];
        const recurrence = curr.recurrence.split(':')[2].split(',');

        const formattedStartTime =
          Number(startTime.slice(0, startTime.length - 2)) / 100;
        const formattedDurationHours = Number(duration.split('H')[0]);
        const formattedDurationMins =
          Number(duration.split('H')[1].split('M')[0]) / 100;

        const endTime = formatTimeToHrs(formattedStartTime, {
          hrs: formattedDurationHours,
          mins: formattedDurationMins
        });

        for (let i = 0; i < recurrence.length; i += 1) {
          acc[weekDayMappings[recurrence[i] as keyof typeof weekDayMappings]] =
            endTime;
        }
        return acc;
      },
      {} as Record<string, string>
    );

  const todaysHours = Object.entries(hours).find(([key]) => {
    const day = Intl.DateTimeFormat('default', { weekday: 'short' }).format(
      new Date()
    );
    return key === day;
  })?.[1];

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
        {primaryFoodType?.length ? (
          <div className='flex items-center space-x-3'>
            {primaryFoodType.map((foodType) => (
              <div className={foodTypeBadgeStyles} key={foodType.id}>
                {foodType.name}
              </div>
            ))}
          </div>
        ) : null}
        {todaysHours ? (
          <div className='text-xs italic font-light text-slate-600'>
            Open until {todaysHours}
          </div>
        ) : null}
        {isOpen ? (
          <div className='text-xs italic font-light text-slate-600'>
            Currently open
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
