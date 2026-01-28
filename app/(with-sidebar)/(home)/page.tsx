'use client';

import HeaderSection from '@/components/home/HeaderSection';
import ProfileSection from '@/components/home/ProfileSection';
import GraphSection from '@/components/home/GraphSection';
import ButtonSection from '@/components/home/ButtonSection';
import BottomSection from '@/components/home/BottomSection';

import { useEffect, useState } from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import { getProfile, Profile } from '@/services/home/profileService.service';

const Page = () => {
  const { user: currentUser, authLoading } = useAuthUser();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const userProfile = await getProfile(currentUser.uid);
      setProfile(userProfile);
    })();
  }, [currentUser]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인 확인 중...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col gap-4 font-sans md:p-[137px]">
      <HeaderSection />

      <ProfileSection
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        profile={profile}
        uid={currentUser.uid}
      />

      <GraphSection uid={currentUser.uid} />

      <BottomSection uid={currentUser.uid} />

      <ButtonSection />
    </div>
  );
};

export default Page;
