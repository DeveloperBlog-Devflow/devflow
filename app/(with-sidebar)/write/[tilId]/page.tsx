import PostDetail from '@/components/write/PostDetail';

type Props = {
  params: Promise<{ tilId: string }>;
};

const Page = async ({ params }: Props) => {
  const { tilId } = await params;
  return <PostDetail tilId={tilId} />;
};

export default Page;
