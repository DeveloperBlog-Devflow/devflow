type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AuthCard({ title, description, children }: Props) {
  return (
    <div className="flex h-screen w-screen -translate-y-6 flex-col items-center justify-center">
      <h1 className="mb-6 flex items-center gap-2 text-4xl font-bold">
        <span className="text-primary">&lt;/&gt;</span>
        <span>DevFlow</span>
      </h1>
      <div className="bg-surface w-full max-w-md rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-text-sub mt-2 text-sm">{description}</p>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
