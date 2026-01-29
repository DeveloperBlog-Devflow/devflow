'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  ClipboardList,
  CalendarPlus,
  CopyPlus,
  LogOut,
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'react-toastify';

const navItems = [
  { label: '홈', href: '/', icon: Home },
  { label: '개발 일지', href: '/tils', icon: ClipboardList },
  { label: '계획 관리', href: '/plans', icon: CalendarPlus },
  { label: '새 페이지 만들기', href: '/write', icon: CopyPlus },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      document.cookie =
        'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      toast.success('로그아웃 되었습니다.');
      router.replace('/landing');
    } catch (err) {
      console.log(err);
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  return (
    <div className="fixed z-100 flex h-screen w-48 flex-col bg-white">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="text-primary text-lg font-bold">&lt;/&gt;</span>
        <span>DevFlow</span>
      </div>
      <hr className="border-slate-300" />
      <nav className="mt-4 px-4">
        <ul className="space-y-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-slate-200 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-100',
                  ].join(' ')}
                >
                  <Icon
                    className={[
                      'h-5 w-5',
                      isActive ? 'text-slate-900' : 'text-slate-600',
                    ].join(' ')}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full border-t border-slate-200 p-4">
        <button
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 text-slate-600" />
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
