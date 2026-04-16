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
          ? 'bg-blue-600/50 cursor-not-allowed opacity-70' 
          : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 shadow-lg shadow-blue-600/20 active:translate-y-0'
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
  const [showPassword, setShowPassword] = useState(false)
  
  const [state, formAction] = useActionState(isLogin ? login : signup, { error: '', success: '' })

  return (
    <div className="bg-[#1F2937] border border-zinc-800/50 rounded-[2rem] p-8 sm:p-10 shadow-2xl overflow-hidden relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-zinc-400 text-sm">
          {isLogin ? '로그인 정보를 입력하여 계정에 접속하세요.' : '새로운 계정을 만들고 DevBlog와 함께하세요.'}
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-[#0B0F1A] rounded-xl mb-8">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            isLogin ? 'bg-[#1F2937] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            !isLogin ? 'bg-[#1F2937] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Sign Up
        </button>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block ml-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full pl-11 pr-4 py-3.5 bg-[#0B0F1A] border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block" htmlFor="password">
              Password
            </label>
            {isLogin && (
              <a href="#" className="text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-11 pr-12 py-3.5 bg-[#0B0F1A] border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 3.59 3.59"/><path d="M21 21L14.12 14.12"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><path d="m3 3 18 18"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{state.error}</p>
          </div>
        )}
        
        {state?.success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3.5 rounded-xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="leading-relaxed">{state.success}</p>
          </div>
        )}

        <SubmitButton isLogin={isLogin} />
      </form>

      <div className="mt-10 text-center">
        <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest px-4">
          By continuing, you agree to our <a href="#" className="underline decoration-zinc-700 hover:text-zinc-300 transition-colors">Terms of Service</a> and <a href="#" className="underline decoration-zinc-700 hover:text-zinc-300 transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}

