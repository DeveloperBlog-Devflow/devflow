import PostDetail from '@/components/write/PostDetail';

type Props = {
  params: Promise<{ postId: string }>;
};

const Page = async ({ params }: Props) => {
  const { postId } = await params;
  return <PostDetail postId={postId} />;
};

export default Page;
