interface ButtonSectionProps {
  onAddTodo: (text: string) => void;
}

const ButtonSection = ({ onAddTodo }: ButtonSectionProps) => {
  const handleAddClick = () => {
    const text = prompt('할 일을 입력하세요');
    if (text) {
      onAddTodo(text);
    }
  };

  return (
    <div className="flex w-full gap-6">
      <button
        type="button"
        className="bg-primary flex-1 rounded-xl py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-violet-500 active:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        새 TIL 작성
      </button>

      <button
        type="button"
        onClick={handleAddClick}
        className="flex-1 rounded-xl border border-slate-300 bg-none py-4 text-center text-base font-semibold text-slate-700 transition hover:bg-slate-200 active:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        계획 추가하기
      </button>
    </div>
  );
};

export default ButtonSection;
