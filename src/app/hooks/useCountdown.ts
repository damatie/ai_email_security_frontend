import { useState, useEffect, useCallback } from 'react';

interface UseCountdownProps {
  initialMinutes: number;
  initialSeconds: number;
  onCountdownComplete?: () => void;
}

export const useCountdown = ({
  initialMinutes,
  initialSeconds,
  onCountdownComplete,
}: UseCountdownProps) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  // Reset the countdown to initial values
  const resetCountdown = useCallback(() => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsRunning(true);
  }, [initialMinutes, initialSeconds]);

  useEffect(() => {
    // Don't start the timer if both minutes and seconds are already 0
    if (minutes === 0 && seconds === 0) {
      setIsRunning(false);
      return;
    }

    let timerId: NodeJS.Timeout | null = null;

    if (isRunning) {
      timerId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer reached 0:00
          setIsRunning(false);
          if (onCountdownComplete) {
            onCountdownComplete();
          }
        }
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [minutes, seconds, isRunning, onCountdownComplete]);

  return {
    minutes,
    seconds,
    resetCountdown,
    setMinutes,
    setSeconds,
    isRunning,
  };
};
