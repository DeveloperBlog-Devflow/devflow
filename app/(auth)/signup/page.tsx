type FieldProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
};
const inputClass =
  'border-border placeholder:text-muted hover:border-border-hover focus:border-border-focus focus:ring-border-focus h-10 w-full rounded-md border px-3 text-sm transition-colors focus:ring-1 focus:outline-none';
function FormField({ id, label, type = 'text' }: FieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="pl-1 text-sm font-medium">
        {label}
      </label>
      <input id={id} className={inputClass} type={type} />
    </div>
  );
}
export default function Page() {
  return (
    <div className="bg-background">
      <div className="flex h-screen w-screen -translate-y-6 flex-col items-center justify-center">
        <h1 className="mb-6 flex items-center gap-2 text-4xl font-bold">
          <span className="text-primary">&lt;/&gt;</span>
          <span>DevFlow</span>
        </h1>

        <div className="bg-surface w-full max-w-md rounded-xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold">회원가입</h2>
          <h3 className="text-gray mt-2 text-sm">
            회원가입하여 계정을 생성하세요
          </h3>
          <div className="mt-6 space-y-6">
            <FormField id="nickname" label="닉네임" />
            <FormField id="email" label="이메일" type="email" />
            <FormField id="password" label="비밀번호" type="password" />
            <FormField
              id="passwordConfirm"
              label="비밀번호 확인"
              type="password"
            />
          </div>
          <button className="bg-primary hover:bg-primary-hover active:bg-primary-active mt-6 h-12 w-full rounded-lg text-base font-medium text-white transition-all duration-150 active:scale-[0.98]">
            가입하기
          </button>

          <p className="text-muted mt-4 text-center text-sm">
            계정이 있으신가요?
            <a className="text-primary ml-1 font-medium">로그인</a>
          </p>
        </div>
      </div>
    </div>
  );
}
