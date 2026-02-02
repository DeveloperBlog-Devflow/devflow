'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import type { MDEditorProps } from '@uiw/react-md-editor';
import SaveButton from '@/components/write/SaveButton';
import { createTil, updateTil, fetchMyTil } from '@/services/write/til.service';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

type Props = {
  tilId?: string;
};

const Editor = ({ tilId }: Props) => {
  const isEdit = !!tilId;

  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(isEdit);
  const router = useRouter();

  useEffect(() => {
    if (!isEdit) return;

    const user = auth.currentUser;
    if (!user) {
      toast.error('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const til = await fetchMyTil(user.uid, tilId);
        if (!til) {
          toast.error('글을 찾을 수 없습니다.');
          router.back();
          return;
        }

        setTitle(til.title);
        setValue(til.content);
      } catch (e) {
        console.error(e);
        toast.error('글을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, tilId, router]);

  const onClickCancel = () => {
    setValue('');
  };

  const onClickSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    if (!title.trim()) {
      toast.error('제목을 입력하세요');
      return;
    }
    if (!value.trim()) {
      toast.error('내용을 입력하세요');
      return;
    }

    try {
      if (isEdit && tilId) {
        await updateTil(user.uid, tilId, title, value);
        toast.success('수정이 완료되었습니다.');
        router.push(`/write/${tilId}`); // 상세 페이지로
        return;
      }
      const id = await createTil(user.uid, value, title);
      toast.success('저장이 완료되었습니다.');
      // console.log('postId:', id);

      router.push(`/write/${id}`);
    } catch (e) {
      console.error(e);
      toast.error('저장에 실패했습니다.');
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  if (loading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-5xl px-4">
        <p className="text-slate-400">불러오는 중...</p>
      </div>
    );
  }
  return (
    <div
      data-color-mode="light"
      className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-8 rounded-2xl px-4 [&_.w-md-editor]:border-0! [&_.w-md-editor]:bg-transparent! [&_.w-md-editor]:shadow-none [&_.w-md-editor-text]:bg-transparent! [&_.w-md-editor-toolbar]:bg-transparent! [&_.wmde-markdown]:bg-transparent!"
    >
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
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
