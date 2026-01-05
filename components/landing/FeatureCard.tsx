import { ReactNode } from 'react';
type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};
export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 pb-2  shadow-sm">
      <div className="mb-2">
        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
          {icon}
        </div>
      </div>

      <h3 className="mt-4 text-left text-lg font-semibold">{title}</h3>
      <p className="text-muted mt-2 text-left text-sm">{description}</p>
    </div>
  );
}
