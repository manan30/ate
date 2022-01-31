export const formatNumberToHrs = (number: number) => {
  const time = number.toPrecision(4);
  const [hrs, mins] = `${time}`.split('.').map(Number);

  const updatedHrs = (mins === 6 || mins === 60 ? hrs + 1 : hrs) % 24;
  const updatedMins = `${
    mins ? (mins === 6 || mins === 60 ? '0' : mins) : '0'
  }`;

  const normalHrsFormat = updatedHrs > 12 ? updatedHrs - 12 : updatedHrs;
  const normalMinsFormat = `${updatedMins}${
    updatedMins.length === 1 ? '0' : ''
  }`.trim();
  const amOrPm = updatedHrs < 12 ? 'AM' : 'PM';

  return `${normalHrsFormat}:${normalMinsFormat} ${amOrPm}`;
};

const sorter = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7
};

export const sortHours = (
  hours: Record<string, { startTime: string; endTime: string }>
) => {
  const sortedHours = Object.entries(hours).sort(([day1], [day2]) => {
    if (
      sorter[day1 as keyof typeof sorter] > sorter[day2 as keyof typeof sorter]
    )
      return 1;
    if (
      sorter[day1 as keyof typeof sorter] < sorter[day2 as keyof typeof sorter]
    )
      return -1;
    return 0;
  });

  const paddedHours: Array<
    [string, { startTime: string; endTime: string } | string]
  > = [];
  const days = sortedHours.map((hour) => hour[0]);

  Object.keys(sorter).forEach((key) => {
    if (!days.includes(key)) paddedHours.push([key, 'NA / Closed']);
    else
      paddedHours.push(
        sortedHours.find((hour) => hour[0] === key) as [
          string,
          {
            startTime: string;
            endTime: string;
          }
        ]
      );
  });

  return paddedHours;
};
