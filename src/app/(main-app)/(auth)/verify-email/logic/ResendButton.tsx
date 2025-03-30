import React, { useState, useEffect } from 'react';

interface ResendButtonProps {
  onResend: () => Promise<boolean>;
  cooldownTime?: number; // Cooldown in seconds (optional, defaults to 60)
  loadingText?: string;
  cooldownText?: string; // Text format for cooldown (optional)
  buttonText?: string; // Text for button when ready (optional)
}

export const ResendButton: React.FC<ResendButtonProps> = ({
  onResend,
  cooldownTime = 60,
  loadingText = 'Sending...',
  cooldownText = 'Resend in: {time}',
  buttonText = 'Resend Code',
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle resend action
  const handleResend = async () => {
    if (timeLeft > 0 || isLoading) return;

    try {
      setIsLoading(true);
      const success = await onResend();

      if (success) {
        setTimeLeft(cooldownTime);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Determine button state and text
  const isDisabled = timeLeft > 0 || isLoading;
  let displayText = buttonText;

  if (isLoading) {
    displayText = loadingText;
  } else if (timeLeft > 0) {
    displayText = cooldownText.replace('{time}', formatTime(timeLeft));
  }

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={isDisabled}
      className={`bg-transparent text-sm font-semibold ${
        isDisabled
          ? 'text-brand-secondary cursor-not-allowed'
          : 'text-blue-400 cursor-pointer'
      }`}
    >
      {displayText}
    </button>
  );
};
