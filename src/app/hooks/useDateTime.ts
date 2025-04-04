import { useMemo, useState, useEffect } from 'react';

/**
 * useFormatTime
 *
 * Returns a formatted local time string (e.g., "7:45 AM") for a given timestamp.
 *
 * @param timestamp - A string representing a date/time.
 * @returns A formatted time string.
 *
 * @example
 * const formattedTime = useFormatTime("2023-06-15T07:45:00Z");
 */
export function useFormatTime(timestamp: string): string {
  return useMemo(() => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }, [timestamp]);
}

/**
 * useFormattedDateTime
 *
 * Returns a formatted date & time string for a given timestamp.
 * The format is based on the user's locale (e.g., "Jun 15, 2023, 7:45 AM").
 *
 * @param timestamp - A string representing a date/time.
 * @returns A formatted date and time string.
 *
 * @example
 * const formattedDateTime = useFormattedDateTime("2023-06-15T07:45:00Z");
 */
export function useFormattedDateTime(timestamp: string): string {
  return useMemo(() => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }, [timestamp]);
}

/**
 * useFormattedDate
 *
 * Returns a formatted date string for a given timestamp.
 * For example, "Jun 15, 2023".
 *
 * @param timestamp - A string representing a date/time.
 * @returns A formatted date string.
 *
 * @example
 * const formattedDate = useFormattedDate("2023-06-15T07:45:00Z");
 */
export function useFormattedDate(timestamp: string): string {
  return useMemo(() => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      dateStyle: 'medium',
    });
  }, [timestamp]);
}

/**
 * useTimeAgo
 *
 * Returns a relative time string (e.g., "2 hours ago", "Just now") based on the given timestamp.
 *
 * @param timestamp - A string representing a date/time.
 * @returns A relative time description.
 *
 * @example
 * const timeAgo = useTimeAgo("2023-06-15T05:45:00Z");
 */
export function useTimeAgo(timestamp: string): string {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date();
      const date = new Date(timestamp);
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      let interval = seconds / 31536000;
      if (interval >= 1) {
        setTimeAgo(
          `${Math.floor(interval)} year${Math.floor(interval) !== 1 ? 's' : ''} ago`
        );
        return;
      }
      interval = seconds / 2592000;
      if (interval >= 1) {
        setTimeAgo(
          `${Math.floor(interval)} month${Math.floor(interval) !== 1 ? 's' : ''} ago`
        );
        return;
      }
      interval = seconds / 86400;
      if (interval >= 1) {
        setTimeAgo(
          `${Math.floor(interval)} day${Math.floor(interval) !== 1 ? 's' : ''} ago`
        );
        return;
      }
      interval = seconds / 3600;
      if (interval >= 1) {
        setTimeAgo(
          `${Math.floor(interval)} hour${Math.floor(interval) !== 1 ? 's' : ''} ago`
        );
        return;
      }
      interval = seconds / 60;
      if (interval >= 1) {
        setTimeAgo(
          `${Math.floor(interval)} minute${Math.floor(interval) !== 1 ? 's' : ''} ago`
        );
        return;
      }
      setTimeAgo('Just now');
    };

    updateTimeAgo();
    const intervalId = setInterval(updateTimeAgo, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return timeAgo;
}

/**

 * useTimeOfDay
 *
 * Returns a string indicating whether it is currently "morning", "afternoon", or "evening".
 * This hook updates when the time of day changes.
 *
 * @returns "morning" if before 12:00 PM, "afternoon" if before 6:00 PM, otherwise "evening".
 *
 * @example
 * const timeOfDay = useTimeOfDay();
 */
const MORNING_END_HOUR = 12;
const AFTERNOON_END_HOUR = 18;

export function useTimeOfDay(): string {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const updateTimeOfDay = () => {
      const newTimeOfDay = getTimeOfDay();
      if (newTimeOfDay !== timeOfDay) {
        setTimeOfDay(newTimeOfDay);
      }
    };

    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [timeOfDay]);

  return timeOfDay;
}

// Helper function to determine the time of day using named constants.
function getTimeOfDay(): string {
  const currentHour = new Date().getHours();
  if (currentHour < MORNING_END_HOUR) {
    return 'morning';
  } else if (currentHour < AFTERNOON_END_HOUR) {
    return 'afternoon';
  }
  return 'evening';
}
