import Link from 'next/link'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0B0F1A] text-zinc-400 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 8h10" />
              <path d="M7 12h10" />
              <path d="M7 16h10" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DevBlog</span>
        </div>
        <Link 
          href="/" 
          className="text-sm font-medium hover:text-white transition-colors"
        >
          Back to Home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[440px]">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

