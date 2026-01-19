interface PageHeaderProps {
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

const PageHeader = ({
  title,
  highlight,
  description,
  className = '',
}: PageHeaderProps) => {
  return (
    <div className={`mb-8 pt-12 text-3xl ${className}`}>
      <h1 className="text-text text-4xl font-bold tracking-tight">
        {title}
        {/* highlight가 있을 때만 보라색으로 렌더링 */}
        {highlight && <span className="text-primary ml-2">{highlight}</span>}
      </h1>

      {description && (
        <p className="text-text-sub mt-2 text-[1.5rem] font-medium">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
