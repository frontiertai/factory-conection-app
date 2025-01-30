'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from '@/components/layout'
import { User, MapPin, Code, LinkIcon } from 'lucide-react'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'

// 仮のエンジニアデータ
const engineers = [
  { id: 1, name: '山田太郎', location: '東京,オンライン', type: 'フロントエンドエンジニア', portfolio: 'https://example.com/yamada' },
  { id: 2, name: '鈴木花子', location: '大阪、オンライン', type: 'フロントエンドエンジニア', portfolio: 'https://example.com/suzuki' },
  { id: 3, name: '佐藤次郎', location: '名古屋オンライン', type: 'フロントエンドエンジニア', portfolio: 'https://example.com/sato' },
]

export default function EngineersPage() {
  const [appliedEngineers, setAppliedEngineers] = useState<number[]>([])

  const handleApply = (engineerId: number) => {
    setAppliedEngineers([...appliedEngineers, engineerId])
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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">エンジニア一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineers.map(engineer => (
          <Card key={engineer.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User size={20} className="text-blue-600" />
                <span>{engineer.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{engineer.location}</span>
              </p>
              <p className="flex items-center space-x-2 mb-2">
                <Code size={16} className="text-gray-500" />
                <span>{engineer.type}</span>
              </p>
              <a href={engineer.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 hover:underline">
                <LinkIcon size={16} />
                <span>ポートフォリオ</span>
              </a>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleApply(engineer.id)}
                disabled={appliedEngineers.includes(engineer.id)}
                className="w-full"
              >
                {appliedEngineers.includes(engineer.id) ? '応募済み' : '応募する'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

