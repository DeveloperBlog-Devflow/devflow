import Sidebar from '@/components/common/Sidebar';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="bg-background flex-1 pl-48">{children}</main>
    </div>
  );
}
