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

  return `${updatedHrs}:${updatedMins}0 ${updatedHrs < 12 ? 'AM' : 'PM'}`;
};
