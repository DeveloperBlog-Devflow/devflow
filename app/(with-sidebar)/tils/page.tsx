import PageHeader from '@/components/common/PageHeader';
import ToolBar from '@/components/tils/ToolBar';

const Page = () => {
  return (
    <div className="bg-background min-h-screen px-30 py-11">
      <PageHeader
        title="일지"
        highlight="관리하기"
        description="작성한 일지를 관리해보세요"
      />
      <ToolBar />
    </div>
  );
};

export default Page;
