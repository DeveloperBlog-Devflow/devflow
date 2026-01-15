interface HeaderSectionProps {
  className?: string;
}

const HeaderSection = ({ className }: HeaderSectionProps) => {
  return (
    <div className={className}>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
        안녕하세요 <span className="text-3xl">🖐️</span>
      </h1>
      <p className="mt-1 text-gray-500">오늘도 성장하는 하루를 만들어보세요!</p>
    </div>
  );
};

export default HeaderSection;
