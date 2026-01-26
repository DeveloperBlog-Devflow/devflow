import Editor from '@/components/write/Editor';

type Props = {
  params: Promise<{ tilId: string }>;
};

const Page = async ({ params }: Props) => {
  const { tilId } = await params;
  return (
    <div className="bg-background flex min-h-screen flex-col gap-8 p-4">
      <Editor tilId={tilId} />
    </div>
  );
};

export default Page;
