export const vNickname = (s: string) =>
  s.length < 2 || s.length > 10 ? '닉네임은 2~10자여야 합니다' : '';

export const vEmail = (s: string) =>
  s && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
    ? '이메일 형식이 올바르지 않습니다'
    : '';

export const vPassword = (s: string) =>
  s && s.length < 8 ? '비밀번호는 8자 이상이어야 합니다' : '';

export const vPasswordConfirm = (pw: string, pc: string) =>
  pc && pc !== pw ? '비밀번호가 일치하지 않습니다' : '';
