'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from '@/components/layout'
import { Building2, MapPin, Briefcase } from 'lucide-react'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'

const scouts = [
  { id: 1, name: 'テック工業', location: '東京', jobDescription: 'Webアプリケーション開発' },
  { id: 2, name: 'フューチャー製造', location: '大阪', jobDescription: 'IoTシステム構築' },
  { id: 3, name: 'イノベーション産業', location: 'オンライン', jobDescription: 'AI開発' },
]

export default function EngineerScouts() {
  const [appliedScouts, setAppliedScouts] = useState<number[]>([])
  const { user } = useUser()
  const router = useRouter()

  const handleApply = (scoutId: number) => {
    setAppliedScouts([...appliedScouts, scoutId])
  }

  return (
    <Layout type="engineer">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">スカウト一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scouts.map(scout => (
          <Card key={scout.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 size={20} className="text-green-600" />
                <span>{scout.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{scout.location}</span>
              </p>
              <p className="flex items-center space-x-2 mb-2">
                <Briefcase size={16} className="text-gray-500" />
                <span>{scout.jobDescription}</span>
              </p>
              <Button 
                onClick={() => handleApply(scout.id)} 
                disabled={appliedScouts.includes(scout.id)}
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
              >
                {appliedScouts.includes(scout.id) ? '応募済み' : '応募する'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  )
}


