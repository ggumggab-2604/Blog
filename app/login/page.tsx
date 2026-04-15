import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      {/* 장식용 백그라운드 디자인 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>
      
      <div className="w-full max-w-md z-10">
        <LoginForm />
      </div>
    </div>
  )
}
