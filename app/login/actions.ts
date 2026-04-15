'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: '이메일과 비밀번호를 입력해주세요.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: '로그인에 실패했습니다. 이메일 또는 비밀번호를 다시 확인해주세요.' }
  }

  redirect('/')
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: '이메일과 비밀번호를 입력해주세요.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // 회원가입 완료 안내 (클라이언트로 반환)
  return { success: '가입하신 이메일로 확인 링크를 발송했습니다. 이메일을 확인해주세요!' }
}
