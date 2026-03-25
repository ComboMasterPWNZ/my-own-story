'use client';

import { AuthScreen } from '@/components/auth-screen';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.replace('/');
      } else {
        setChecking(false);
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white font-bold">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="mobile-container" style={{ backgroundColor: '#1A1A3D' }}>
      <AuthScreen />
    </div>
  );
}
