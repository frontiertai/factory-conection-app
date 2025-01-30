'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from '@/components/layout'
import { User, MapPin, Code } from 'lucide-react'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'

const applications = [
  { id: 1, name: '浜野', type: 'フロントエンジニア', location: '東京' },
  { id: 2, name: '中島', type: 'フロントエンジニア', location: 'オンライン' },
  { id: 3, name: '池田', type: 'フロントエンジニア', location: '大阪、オンライン' },
  { id: 4, name: '村山', type: 'データサイエンスエンジニア', location: 'オンライン' },
  { id: 5, name: '嶋田', type: 'インフラエンジニア', location: '名古屋、オンライン' },
]

export default function FactoryApplications() {
  const { user } = useUser()
  const router = useRouter()
  const [scouted, setScouted] = useState<number[]>([])

  const handleScout = (applicationId: number) => {
    setScouted([...scouted, applicationId])
  }

  return (
    <Layout type="factory">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">応募一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map(application => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User size={20} className="text-blue-600" />
                <span>{application.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center space-x-2 mb-2">
                <Code size={16} className="text-gray-500" />
                <span>{application.type}</span>
              </p>
              <p className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{application.location}</span>
              </p>
              <Button 
                onClick={() => handleScout(application.id)}
                disabled={scouted.includes(application.id)}
                className="w-full mt-4"
              >
                {scouted.includes(application.id) ? 'スカウト済み' : 'スカウトする'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

