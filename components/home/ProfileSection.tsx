import { Profile } from '@/lib/home/profileService';
import Card from './Card';

interface ProfileSectionProps {
  className?: string;
  profile: Profile | null;
}

const ProfileSection = ({ className, profile }: ProfileSectionProps) => {
  return (
    <div className={className}>
      <div className="md:col-span-2">
        <Card className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-purple-100">
            <span className="text-3xl">😈</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {profile?.nickname}
            </h3>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <div className="mt-1 flex gap-2 text-xs font-medium">
              <span className="text-primary">{profile?.streakDays}일 </span>연속
              <span className="text-gray-400">|</span>
              <span className="text-primary">{profile?.tilCount}개 </span>TIL
            </div>
          </div>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card className="flex h-full flex-col items-center justify-center text-center">
          <div className="text-primary mb-1 text-4xl font-bold">3/5</div>
          <div className="text-sm font-medium text-gray-500">
            오늘의 목표 달성률
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSection;
