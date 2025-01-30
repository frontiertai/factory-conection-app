'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Layout from '@/components/layout'
import { Calendar, Trash2 } from 'lucide-react'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'

// 仮の検索履歴データ
const initialHistory = [
  { id: 1, query: 'フロントエンドエンジニア', date: '2025-1-26' },
  { id: 2, query: 'インフラエンジニア', date: '2025-1-06' },
  { id: 3, query: 'データサイエンスエンジニア', date: '2025-1-07' },
]

export default function SearchHistoryPage() {
  const [history, setHistory] = useState(initialHistory)

  const handleDelete = (id: number) => {
    setHistory(history.filter(item => item.id !== id))
  }

  const { user } = useUser()
  const router = useRouter()

  /*useEffect(() => {
    if (!user) {
      router.push('/factory/login') // ログインしていない場合はエンジニア用ログインページへリダイレクト
    }
  }, [user, router])*/

  return (
    <Layout type="factory">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">検索履歴</h1>
      <div className="space-y-4 max-w-2xl mx-auto">
        {history.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>{item.query}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center space-x-2 text-gray-600">
                <Calendar size={16} />
                <span>検索日: {item.date}</span>
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => handleDelete(item.id)} className="w-full flex items-center justify-center">
                <Trash2 size={16} className="mr-2" />
                <span>削除</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

