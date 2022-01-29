import React from 'react';
import { PhoneIcon, GlobeAltIcon } from '@heroicons/react/outline';
import Card from '../../../components/Card';
import { useBadgeStyles } from '../../../hooks/ui/useBadgeStyles';
import { convertMeterToMile } from '../../../utils/functions/convert-meter-to-mile';
import type { BrowseItem } from '../../../api/places/types';
import { formatTimeToHrs } from '../../../utils/functions/convert-number-to-hrs';
import { weekDayMappings } from '../../../utils/constants';

type ExploreNearbyCardProps = {
  item: BrowseItem;
  handleTitleClick: () => void;
};

const ExploreNearbyCard: React.FC<ExploreNearbyCardProps> = ({
  item,
  handleTitleClick
}) => {
  const primaryFoodType = item.foodTypes?.filter((ft) => ft.primary);
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
      <div className='relative flex flex-col h-36'>
        <div className='flex flex-col space-y-2 flex-1'>
          {isOpen ? (
            <div className='absolute right-0 top-0 h-3 w-3 md:h-4 md:w-4 bg-green-500 motion-safe:animate-pulse rounded-full -translate-y-5 translate-x-5'></div>
          ) : null}
          <div className='flex items-center'>
            <button
              onClick={handleTitleClick}
              className='text-base font-medium m-0 p-0 text-orange-600 rounded-sm hover:text-orange-700 focus:outline-none focus:outline-orange-600 focus:text-orange-700'
            >
              {item.title}
            </button>
            {item.distance ? (
              <div className='ml-1 text-xs italic truncate text-slate-500'>
                {' - '}
                {convertMeterToMile(item.distance)} mi
              </div>
            ) : null}
          </div>
          <div className='text-xs truncate text-slate-500'>
            {item.address?.label.split(',').slice(1).join(',')}
          </div>
          {todaysHours ? (
            <div className='text-xs italic font-light text-slate-600'>
              Open until {todaysHours}
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
        </div>
        <div>
          {contacts ? (
            <div className='flex space-x-3 item-center justify-end'>
              {contacts?.phone ? (
                <a
                  href={`tel:${contacts.phone[0]?.value ?? ''}`}
                  className='focus:outline-slate-600'
                >
                  <PhoneIcon className='w-5 h-5 text-slate-800' />
                </a>
              ) : null}
              {contacts?.www ? (
                <a
                  href={contacts.www[0]?.value ?? ''}
                  className='focus:outline-blue-600'
                >
                  <GlobeAltIcon className='w-5 h-5 text-blue-600' />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default ExploreNearbyCard;
