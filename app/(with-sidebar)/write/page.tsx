import Editor from '@/components/write/Editor';
import SaveButton from '@/components/write/SaveButton';

const Page = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col gap-8">
      <Editor />
      <SaveButton />
    </div>
  );
};

export default Page;
