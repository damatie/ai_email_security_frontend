// app/components/ProtectedRoute.tsx
'use client';
import { useEffect, useState } from 'react';

interface LoadingSessionPeops {
  children: React.ReactNode;
}

export default function LoadingSession({ children }: LoadingSessionPeops) {
  // Handle Hydration
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;

  return <>{children}</>;
}
