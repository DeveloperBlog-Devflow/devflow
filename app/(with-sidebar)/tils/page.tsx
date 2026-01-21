import PageHeader from '@/components/common/PageHeader';
import ToolBar from '@/components/tils/ToolBar';
import TilList from '@/components/tils/TilList';

type DiaryItem = {
  id: string;
  title: string;
  preview: string;
  createdAt: number;
};

const MOCK: DiaryItem[] = [
  {
    id: '1',
    title: '우테코 최종 테스트',
    preview:
      '우아한테크코스 최종 테스트를 준비하며 잠실 캠퍼스 잠실 캠퍼스 잠실 캠퍼스 잠실 캠퍼스....',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: '2',
    title: '우테코 최종 테스트',
    preview:
      '우아한테크코스 최종 테스트를 준비하며 잠실 캠퍼스 잠실 캠퍼스 잠실 캠퍼스 잠실 캠퍼스....',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: '3',
    title: '우테코 최종 테스트',
    preview:
      '우아한테크코스 최종 테스트를 준비하며 잠실 캠퍼스 잠실 캠퍼스 잠실 캠퍼스 잠실 캠퍼스....',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  //   ...Array.from({ length: 38 }).map((_, i) => ({
  //     id: `m-${i + 4}`,
  //     title: `일지 ${i + 4}`,
  //     preview:
  //       '내용 미리보기 텍스트입니다. 내용 미리보기 텍스트입니다. 내용 미리보기 텍스트입니다....',
  //     createdAt: Date.now() - 1000 * 60 * 60 * 2 * (i + 4),
  //   })),
];

const Page = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col gap-5 px-30 py-11">
      <PageHeader
        title="일지"
        highlight="관리하기"
        description="작성한 일지를 관리해보세요"
      />
      <ToolBar />
      <TilList items={MOCK} />
    </div>
  );
};

export default Page;
