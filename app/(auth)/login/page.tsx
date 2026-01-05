import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/auth/LoginForm';
export default function Page() {
  return (
    <div className="bg-background">
      <AuthCard title="로그인" description="로그인해서 학습을 이어가세요">
        <LoginForm />
      </AuthCard>
      
    </div>
  );
}
