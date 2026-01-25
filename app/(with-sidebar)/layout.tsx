'use client';

import Sidebar from '@/components/common/Sidebar';
import { useAuthGuard } from '@/hooks/useAuthGuard';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAuthed } = useAuthGuard({ redirectTo: '/login' });

  if (loading) return <div>로딩중...</div>;
  if (!isAuthed) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="bg-background flex-1 pl-48">{children}</main>
    </div>
  );
}
