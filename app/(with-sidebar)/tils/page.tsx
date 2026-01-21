import PageHeader from '@/components/common/PageHeader';

const Page = () => {
  return (
    <div className="bg-background min-h-screen p-11">
      <PageHeader
        title="일지"
        highlight="관리하기"
        description="작성한 일지를 관리해보세요"
      />
    </div>
  );
};

export default Page;
