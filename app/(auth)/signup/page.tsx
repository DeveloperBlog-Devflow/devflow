import { AuthCard } from '@/components/auth/AuthCard';
import { SignupForm } from '@/components/auth/SignupForm';
export default function Page() {
  return (
    <div className="bg-background">
      <AuthCard title="회원가입" description="회원가입하여 계정을 생성하세요">
        <SignupForm />
      </AuthCard>
    </div>
  );
}
