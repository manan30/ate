import React from 'react';
import cn from 'classnames';
import useLookup from '../../hooks/here-api/useLookup';
import Modal from '../Modal';
import LoadingFallback from './LoadingFallback';
import { convertMeterToMile } from '../../utils/functions/convert-meter-to-mile';
import { useBadgeStyles } from '../../hooks/ui/useBadgeStyles';
import { Level2HereCategories } from '../../hooks/ui/constants';
import {
  formatNumberToHrs,
  sortHours
} from '../../utils/functions/convert-number-to-hrs';
import { weekDayMappings } from '../../utils/constants';
import { GlobeAltIcon, PhoneIcon } from '@heroicons/react/outline';

type PlaceDetailsModalProps = {
  placeId: string;
  handleClose: () => void;
};

const level2CategoryCodes = Object.keys(Level2HereCategories);

const PlaceDetailsModal: React.FC<PlaceDetailsModalProps> = ({
  placeId,
  handleClose
}) => {
  const { lookupData, isLoading } = useLookup(placeId);

  const level2Category = lookupData?.categories?.find((c) =>
    level2CategoryCodes.includes(c.id)
  );
  const otherCategories = lookupData?.categories
    ?.filter((c) => c.id !== level2Category?.id)
    .map((c) => c.name);

  const foodTypes = [
    ...new Set(
      lookupData?.foodTypes
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

  const contacts = lookupData?.contacts?.[0];

  const categoryBadgeStyles = useBadgeStyles(level2Category?.name ?? '');
  const foodTypeBadgeStyles = useBadgeStyles('foodType');
  const otherCategoryBadgeStyles = useBadgeStyles('categories');

  const hours: Record<string, { startTime: string; endTime: string }> =
    lookupData?.openingHours?.[0].structured.reduce(
      (
        acc: Record<string, { startTime: string; endTime: string }>,
        curr: Record<string, string>
      ) => {
        const startTime = curr.start.split('T')[1];
        const duration = curr.duration.split('PT')[1];
        const recurrence = curr.recurrence.split(':')[2].split(',');

        const formattedStartTime =
          Number(startTime.slice(0, startTime.length - 2)) / 100;
        const formattedDurationHours = Number(duration.split('H')[0]);
        const formattedDurationMins =
          Number(duration.split('H')[1].split('M')[0]) / 100;

        const readableStartTime = formatNumberToHrs(formattedStartTime);

        const endTime = formatNumberToHrs(
          formattedStartTime + formattedDurationHours + formattedDurationMins
        );

        for (let i = 0; i < recurrence.length; i += 1) {
          acc[weekDayMappings[recurrence[i] as keyof typeof weekDayMappings]] =
            { startTime: readableStartTime, endTime };
        }
        return acc;
      },
      {}
    );

  const sortedHours = sortHours(hours ?? {});

  const isOpen = lookupData?.openingHours?.[0].isOpen;

  const today = Intl.DateTimeFormat('default', { weekday: 'short' }).format(
    new Date()
  );

  return (
    <Modal
      cancelAction={{ text: 'Close', handler: handleClose }}
      Title={
        <div className='flex items-center'>
          <div className='flex-1'>{lookupData?.title}</div>
          {contacts ? (
            <div className='flex ml-auto space-x-3 item-center'>
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
      }
    >
      {isLoading ? <LoadingFallback /> : null}
      {lookupData ? (
        <div className='relative flex flex-col mt-2'>
          <div className='flex flex-col flex-1 space-y-3'>
            {lookupData.distance ? (
              <div className='ml-1 text-xs italic truncate text-slate-500'>
                {' - '}
                {convertMeterToMile(lookupData.distance)} mi
              </div>
            ) : null}
            <div className='text-xs truncate text-slate-500'>
              {lookupData.address?.label.split(',').slice(1).join(',')}
            </div>
            <div className='flex items-center space-x-3'>
              {level2Category ? (
                <div className={cn('h-auto w-auto', categoryBadgeStyles)}>
                  {level2Category.name}
                </div>
              ) : null}
              {otherCategories?.length
                ? otherCategories.map((category) => (
                    <div className={otherCategoryBadgeStyles} key={category}>
                      {category}
                    </div>
                  ))
                : null}
            </div>
            {foodTypes?.length ? (
              <div className='flex items-center space-x-3'>
                {foodTypes.map((foodType) => (
                  <div className={foodTypeBadgeStyles} key={foodType}>
                    {foodType}
                  </div>
                ))}
              </div>
            ) : null}
            {hours ? (
              <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                {sortedHours.map((entry) => (
                  <div
                    className={cn(
                      'text-xs italic font-light text-slate-600',
                      today === entry[0] && 'font-semibold'
                    )}
                    key={entry[0]}
                  >
                    {entry[0]}:{' '}
                    {typeof entry[1] === 'string'
                      ? entry[1]
                      : `${entry[1].startTime} - ${entry[1].endTime}`}{' '}
                    {today === entry[0] && isOpen && '(Open Now)'}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default PlaceDetailsModal;
