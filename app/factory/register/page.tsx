'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from '@/components/layout'
import Link from 'next/link'
import { firestore } from '@/firebaseConfig'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { useUser } from '@/app/UserContext'  // useUser をインポート

export default function FactoryRegister() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { setUser } = useUser()  // UserContext から setUser を取得

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 名前と勤務地が選択されていない場合、エラーメッセージを表示
    if (!name || !location) {
      setErrorMessage('名前と勤務地を入力してください。')
      return
    }

    // 名前が既に登録されているか確認
    const factoriesRef = collection(firestore, 'factories')
    const q = query(factoriesRef, where('name', '==', name))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // 同じ名前の工場が見つかった場合、エラーメッセージを設定
      setErrorMessage('この名前の工場はすでに登録されています。')
      return
    }

    try {
      // 新しい工場を登録
      await addDoc(factoriesRef, {
        name,
        location,
        tech_id: [],  // 初回登録時はtech_idは空配列
      })

      // 工場登録後、UserContext に登録した工場情報を設定
      setUser({ name, location, type: 'factory' })

      // 登録後、ホームページへ遷移
      router.push('/factory/home')
    } catch (error) {
      // Firebaseのエラー処理
      setErrorMessage('工場登録中にエラーが発生しました。')
      console.error('工場登録エラー:', error)
    }
  }

  return (
    <Layout type="factory">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">工場初期登録</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}  {/* エラーメッセージ表示 */}
          <Button type="submit" className="w-full">登録</Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/factory/login" className="text-blue-600">登録済みの方はこちらから</Link>
        </div>
      </div>
    </Layout>
  )
}


