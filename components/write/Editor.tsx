'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { MDEditorProps } from '@uiw/react-md-editor';
import SaveButton from '@/components/write/SaveButton';
import { createPost } from '@/services/write/post.service';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Editor = () => {
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const router = useRouter();

  const onClickCancel = () => {
    setValue('');
  };

  const onClickSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력하세요');
      return;
    }
    if (!value.trim()) {
      alert('내용을 입력하세요');
      return;
    }

    try {
      const id = await createPost(user.uid, value, title);
      alert('저장 완료!');
      console.log('postId:', id);

      router.push(`/write/${id}`);
    } catch (e) {
      console.error(e);
      alert('저장 실패');
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div
      data-color-mode="light"
      className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-8 rounded-2xl px-4 [&_.w-md-editor]:border-0! [&_.w-md-editor]:bg-transparent! [&_.w-md-editor]:shadow-none [&_.w-md-editor-text]:bg-transparent! [&_.w-md-editor-toolbar]:bg-transparent! [&_.wmde-markdown]:bg-transparent!"
    >
      <input
        type="text"
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        className="py-3 text-3xl focus:ring-0 focus:outline-none"
      />
      <MDEditor
        value={value}
        onChange={(v) => setValue(v ?? '')}
        height={700}
        preview="live"
        textareaProps={{
          placeholder: '내용을 입력하세요',
          maxLength: 2000,
        }}
        commandsFilter={(cmd) => {
          if (cmd?.name === 'fullscreen') return false;
          return cmd;
        }}
      />
      <SaveButton onClickCancel={onClickCancel} onClickSave={onClickSave} />
    </div>
  );
};

export default Editor;
