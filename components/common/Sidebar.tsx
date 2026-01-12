'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ClipboardList,
  CalendarPlus,
  CopyPlus,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: '홈', href: '/', icon: Home },
  { label: '개발 일지', href: '/logs', icon: ClipboardList },
  { label: '새 계획 만들기', href: '/plans/new', icon: CalendarPlus },
  { label: '새 페이지 만들기', href: '/pages/new', icon: CopyPlus },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed flex h-screen w-48 flex-col bg-white">
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
        <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
          <LogOut className="h-5 w-5 text-slate-600" />
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
