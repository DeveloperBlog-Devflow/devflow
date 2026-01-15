'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { MDEditorProps } from '@uiw/react-md-editor';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Editor = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div
      data-color-mode="light"
      className="mx-auto mt-8 w-full max-w-5xl rounded-2xl px-4 [&_.w-md-editor]:border-0! [&_.w-md-editor]:bg-transparent! [&_.w-md-editor]:shadow-none [&_.w-md-editor-text]:bg-transparent! [&_.w-md-editor-toolbar]:bg-transparent! [&_.wmde-markdown]:bg-transparent!"
    >
      <MDEditor
        value={value}
        onChange={(v) => setValue(v ?? '')}
        height={850}
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
    </div>
  );
};

export default Editor;
