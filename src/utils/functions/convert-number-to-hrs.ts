export const formatTimeToHrs = (
  start: number,
  duration: { hrs: number; mins: number }
) => {
  const totalTime = parseFloat(
    (start + duration.hrs + duration.mins).toPrecision(4)
  );

  const [hrs, mins] = `${totalTime}`.split('.').map(Number);

  const updatedHrs = (mins === 6 ? hrs + 1 : hrs) % 24;
  const updatedMins = mins ? (mins === 6 ? '0' : mins) : '0';

  return `${updatedHrs > 12 ? updatedHrs - 12 : updatedHrs}:${updatedMins}0 ${
    updatedHrs < 12 ? 'AM' : 'PM'
  }`;
};

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
