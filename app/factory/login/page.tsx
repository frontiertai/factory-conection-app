'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from '@/components/layout'
import { useRouter } from 'next/navigation'
import { firestore } from '@/firebaseConfig' // Firestore設定をインポート
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useUser } from '@/app/UserContext'
import Link from 'next/link'

export default function Login() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setUser } = useUser()  // UserContext から setUser を取得

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const q = query(collection(firestore, 'factories'), where('name', '==', name), where('location', '==', location))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        // ユーザー情報を context に保存
        setUser({ name, location, type: 'factory' })

        // ログイン後、ホームページへ遷移
        router.push('/factory/home')
      } else {
        setErrorMessage('名前または勤務地が一致しません。')
      }
    } catch (error) {
      setErrorMessage('ログイン処理中にエラーが発生しました。')
      console.error('ログインエラー:', error)
    }
  }

  return (
    <Layout type='factory'>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">ログイン</h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名前</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">勤務地</label>
            <Select onValueChange={setLocation} value={location} required>
              <SelectTrigger>
                <SelectValue placeholder="勤務地を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tokyo">東京</SelectItem>
                <SelectItem value="osaka">大阪</SelectItem>
                <SelectItem value="nagoya">名古屋</SelectItem>
                <SelectItem value="online">オンライン</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">ログイン</Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/factory/register" className="text-blue-600">新規登録はこちらから</Link>
        </div>
      </div>
    </Layout>
  )
}



