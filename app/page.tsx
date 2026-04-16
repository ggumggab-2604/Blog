import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0B0F1A] text-white">
      <h1 className="text-4xl font-bold mb-4">로그인 성공!</h1>
      <p className="text-zinc-400 mb-8">{user.email}님, 환영합니다.</p>
      
      <form action="/auth/signout" method="post">
        <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors font-medium">
          로그아웃
        </button>
      </form>
    </div>
  )
}
