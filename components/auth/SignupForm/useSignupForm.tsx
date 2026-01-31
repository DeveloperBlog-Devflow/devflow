import { useMemo, useState } from 'react';
import { vEmail, vNickname, vPassword, vPasswordConfirm } from '../../../utils/validators';

export type SignupValues = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
type Field = keyof SignupValues;
/* 모든 필드를 한 번씩 건드려야 제출 가능 */
const allTouched = (): Record<Field, boolean> => ({
  nickname: true,
  email: true,
  password: true,
  passwordConfirm: true,
});

export function useSignupForm() {
  /* 입력값 상태*/
  const [v, setV] = useState<SignupValues>({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  /* 건드렸는지 */
  const [t, setT] = useState<Record<Field, boolean>>({
    nickname: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });
  /* focus 상태 */
  const [f, setF] = useState<Field | null>(null);
  /* error 계산 */
  const e = useMemo(
    () => ({
      nickname: vNickname(v.nickname),
      email: vEmail(v.email),
      password: vPassword(v.password),
      passwordConfirm: vPasswordConfirm(v.password, v.passwordConfirm),
    }),
    [v]
  );
  /* props 생성*/
  const register = (name: Field) => ({
    value: v[name],
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
      setV((p) => ({ ...p, [name]: ev.target.value })),
    onFocus: () => setF(name),
    onBlur: () => (
      setF((p) => (p === name ? null : p)),
      setT((p) => ({ ...p, [name]: true }))
    ),
  });

  const showError = (name: Field) => !!e[name] && t[name] && f !== name;
  const hasError = () => Object.values(e).some(Boolean);
  const touchAll = () => setT(allTouched());

  return { values: v, errors: e, register, showError, hasError, touchAll };
}
