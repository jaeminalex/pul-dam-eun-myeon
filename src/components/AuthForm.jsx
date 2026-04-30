import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validateForm = () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!email.includes('@')) {
      setErrorMsg('올바른 이메일 주소를 입력해주세요.');
      return false;
    }
    if (password.length < 6) {
      setErrorMsg('비밀번호는 6자리 이상이어야 합니다.');
      return false;
    }
    return true;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMsg('로그인 되었습니다.');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMsg('회원가입이 완료되었습니다. 이메일을 확인해주세요.');
      }
    } catch (error) {
      if (error.message.includes('Invalid login credentials')) {
        setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (error.message.includes('User already registered')) {
        setErrorMsg('이미 가입된 이메일입니다.');
      } else {
        setErrorMsg(error.message || '오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
    } catch (error) {
      setErrorMsg('소셜 로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <div
          className={`auth-tab ${isLogin ? 'active' : ''}`}
          onClick={() => { setIsLogin(true); setErrorMsg(''); setSuccessMsg(''); }}
        >
          로그인
        </div>
        <div
          className={`auth-tab ${!isLogin ? 'active' : ''}`}
          onClick={() => { setIsLogin(false); setErrorMsg(''); setSuccessMsg(''); }}
        >
          회원가입
        </div>
      </div>

      <form className="auth-form" onSubmit={handleAuth}>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="6자리 이상 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '8px' }}
          disabled={loading}
        >
          {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
        </button>
      </form>

      <div className="auth-divider">또는</div>

      <button className="social-login-btn btn-kakao" onClick={() => handleSocialLogin('kakao')} type="button">
        카카오로 시작하기
      </button>
      <button className="social-login-btn btn-naver" onClick={() => handleSocialLogin('naver')} type="button" style={{ marginBottom: 0 }}>
        네이버로 시작하기
      </button>
    </div>
  );
}
