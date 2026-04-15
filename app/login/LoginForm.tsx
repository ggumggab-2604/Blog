'use client'

import { useActionState, useState } from 'react'
import { login, signup } from './actions'
import { useFormStatus } from 'react-dom'

function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 ${
        pending 
          ? 'bg-zinc-400 dark:bg-zinc-600 cursor-not-allowed opacity-70' 
          : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]'
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          처리 중...
        </span>
      ) : (isLogin ? '로그인' : '계정 생성하기')}
    </button>
  )
}

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  
  // useActionState를 활용하여 Server Action의 결과 상태를 클라이언트 폼에 연결합니다.
  const [state, formAction] = useActionState(isLogin ? login : signup, { error: '', success: '' })

  return (
    <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-8 shadow-2xl transition-all duration-500">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          {isLogin ? '환영합니다 돌아오셨군요!' : '새로운 여정을 시작하세요'}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {isLogin ? '서비스를 이용하시려면 로그인을 진행해주세요' : '이메일 주소로 안전하게 계정을 만들어보세요'}
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="email">이메일 아이디</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="hello@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">비밀번호</label>
            {isLogin && <a href="#" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">비밀번호를 잊으셨나요?</a>}
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        {/* 오류 메시지 UI */}
        {state?.error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{state.error}</p>
          </div>
        )}
        
        {/* 성공 메시지 UI (회원가입 후 인증 메일 발송 안내) */}
        {state?.success && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400 p-4 rounded-xl text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="leading-relaxed">{state.success}</p>
          </div>
        )}

        <div className="pt-2">
          <SubmitButton isLogin={isLogin} />
        </div>
      </form>

      {/* 상태 토글 (로그인 <-> 회원가입) */}
      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {isLogin ? '아직 계정이 없으신가요?' : '이미 가입하셨나요?'}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin)
          }}
          className="ml-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          {isLogin ? '새 계정 만들기' : '기존 계정으로 로그인'}
        </button>
      </div>
    </div>
  )
}
