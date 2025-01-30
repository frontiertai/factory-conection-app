'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from '@/components/layout'
import { Building2, MapPin, Briefcase, Code } from 'lucide-react'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'

const factories = [
  { id: 1, name: 'テック工業', location: '東京', jobDescription: 'Webアプリケーション開発', engineerType: 'フロントエンド' },
  { id: 2, name: 'フューチャー製造', location: '大阪', jobDescription: 'IoTシステム構築', engineerType: 'バックエンド' },
  { id: 3, name: 'イノベーション産業', location: '名古屋', jobDescription: 'データ解析', engineerType: 'データサイエンス' },
  { id: 4, name: 'スマートファクトリー', location: 'オンライン', jobDescription: 'モバイルアプリ開発', engineerType: 'フロントエンド' },
  { id: 5, name: 'AIテック', location: 'オンライン', jobDescription: '機械学習モデル開発', engineerType: 'フロントエンド' }
]

export default function FactoriesPage() {
  const [appliedFactories, setAppliedFactories] = useState<number[]>([])
  const [engineerType, setEngineerType] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState(factories);
  const { user } = useUser()
  const router = useRouter()

  const handleSearch = () => {
    setSearchResults(factories.filter(factory => 
      factory.engineerType === 'フロントエンド' && factory.location === 'オンライン'
    ));
  }

  const handleApply = (factoryId: number) => {
    setAppliedFactories([...appliedFactories, factoryId])
  }

  return (
    <Layout type="engineer">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">工場一覧</h1>
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">検索条件を更新</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="engineerType" className="block text-sm font-medium text-gray-700 mb-2">エンジニアの種類</label>
            <Select onValueChange={setEngineerType}>
              <SelectTrigger>
                <SelectValue placeholder="エンジニアの種類を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="フロントエンド">フロントエンド</SelectItem>
                <SelectItem value="バックエンド">バックエンド</SelectItem>
                <SelectItem value="フルスタック">フルスタック</SelectItem>
                <SelectItem value="モバイル">モバイル</SelectItem>
                <SelectItem value="データサイエンス">データサイエンス</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">勤務地</label>
            <Select onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="勤務地を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="東京">東京</SelectItem>
                <SelectItem value="大阪">大阪</SelectItem>
                <SelectItem value="名古屋">名古屋</SelectItem>
                <SelectItem value="オンライン">オンライン</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded-md">検索する</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((factory) => (
          <Card key={factory.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 size={20} className="text-green-600" />
                <span>{factory.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{factory.location}</span>
              </p>
              <p className="flex items-center space-x-2 mb-2">
                <Briefcase size={16} className="text-gray-500" />
                <span>{factory.jobDescription}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Code size={16} className="text-gray-500" />
                <span>{factory.engineerType}</span>
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleApply(factory.id)}
                disabled={appliedFactories.includes(factory.id)}
                className="w-full"
              >
                {appliedFactories.includes(factory.id) ? '応募済み' : '応募する'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
