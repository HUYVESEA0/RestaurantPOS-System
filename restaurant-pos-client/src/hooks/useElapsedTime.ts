import { useState, useEffect } from 'react';

/**
 * Calculate elapsed time from a given timestamp (stopwatch format)
 * @param startTime - ISO string timestamp when table was occupied
 * @returns Formatted elapsed time (e.g., "01h23m", "00h45m", "00h00m")
 */
export const useElapsedTime = (startTime?: string): string => {
  const [elapsed, setElapsed] = useState<string>('');

  useEffect(() => {
    if (!startTime) {
      setElapsed('');
      return;
    }

    const calculateElapsed = () => {
      // ✅ FIX: Ensure we parse UTC time correctly
      // If string doesn't end with 'Z', it's treated as local time
      const normalizedStartTime = startTime.endsWith('Z')
        ? startTime
        : startTime + 'Z'; // Add Z to force UTC parsing

      const start = new Date(normalizedStartTime).getTime();
      const now = Date.now();
      const diffMs = now - start;

      // Handle negative time (future date - shouldn't happen)
      if (diffMs < 0) {
        return '00h00m';
      }

      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      // Format with leading zeros like a stopwatch: 00h00m, 01h23m, etc.
      const hoursStr = hours.toString().padStart(2, '0');
      const minutesStr = minutes.toString().padStart(2, '0');

      return `${hoursStr}h${minutesStr}m`;
    };

    // Calculate immediately
    setElapsed(calculateElapsed());

    // Update every minute (60 seconds)
    const interval = setInterval(() => {
      setElapsed(calculateElapsed());
    }, 60000);

    return () => clearInterval(interval);
  }, [startTime]);

  return elapsed;
};

/**
 * Get color class based on elapsed time
 * - Green: < 60 minutes (fresh)
 * - Yellow: 60-90 minutes (warning)
 * - Red: > 90 minutes (critical - need attention)
 */
export const getElapsedTimeColor = (startTime?: string): string => {
  if (!startTime) return '';

  // ✅ FIX: Same timezone fix here
  const normalizedStartTime = startTime.endsWith('Z')
    ? startTime
    : startTime + 'Z';

  const start = new Date(normalizedStartTime).getTime();
  const now = Date.now();
  const totalMinutes = Math.floor((now - start) / (1000 * 60));

  if (totalMinutes < 60) return 'time-fresh'; // < 1 hour - Green
  if (totalMinutes < 90) return 'time-warning'; // 1-1.5 hours - Yellow
  return 'time-critical'; // > 1.5 hours - Red
};
