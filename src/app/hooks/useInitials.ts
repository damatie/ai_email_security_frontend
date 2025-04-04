import { useState, useEffect } from 'react';

interface UseInitialsOptions {
  name: string | null | undefined;
  separator?: string; // Separator for names (default: space)
  limit?: number; // Max number of initials (default: 2)
}

interface UseInitialsResult {
  initials: string;
}

/**
 * Generates initials from a name.
 *
 * @param {UseInitialsOptions} options - Configuration options.
 * @param {string | null | undefined} options.name - The full name.
 * @param {string} [options.separator=' '] - Separator between name parts.
 * @param {number} [options.limit=2] - Maximum number of initials to generate.
 * @returns {UseInitialsResult} An object containing the generated initials.
 *
 * @example
 * // In a component:
 * function UserAvatar({ fullName }: { fullName: string }) {
 * const { initials } = useInitials({ name: fullName });
 *
 * return (
 * <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
 * <span>{initials}</span>
 * </div>
 * );
 * }
 */
function useInitials({
  name,
  separator = ' ',
  limit = 2,
}: UseInitialsOptions): UseInitialsResult {
  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (!name) {
      setInitials('');
      return;
    }

    const parts = name.split(separator);
    let generatedInitials = '';

    for (let i = 0; i < Math.min(parts.length, limit); i++) {
      const part = parts[i]?.trim(); // Use optional chaining for safety
      if (part?.length > 0) {
        generatedInitials += part[0].toUpperCase();
      }
    }

    setInitials(generatedInitials);
  }, [name, separator, limit]);

  return { initials };
}

export default useInitials;
