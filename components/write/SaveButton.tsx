const SaveButton = () => {
  return (
    <div className="mx-auto flex h-10 w-3xs gap-6">
      <button
        type="button"
        className="bg-primary flex-1 rounded-xl py-4 text-center text-base leading-0 font-semibold text-white shadow-sm transition hover:bg-violet-500 active:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        저장
      </button>

      <button
        type="button"
        className="flex-1 rounded-xl border border-slate-300 bg-none py-4 text-center text-base leading-0 font-semibold text-slate-700 transition hover:bg-slate-200 active:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        취소하기
      </button>
    </div>
  );
};

export default SaveButton;
