'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from '@/components/layout'
import { Search, Clock, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'

export default function FactoryHome() {

  const { user } = useUser()
  const router = useRouter()

  /*useEffect(() => {
    if (!user) {
      router.push('/factory/login') // ログインしていない場合はエンジニア用ログインページへリダイレクト
    }
    else{
      console.log(user);
    }
  }, [user, router])*/

  return (
    <Layout type="factory">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">工場ホーム</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="text-blue-600" />
                <span>エンジニアを探す</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">必要なエンジニアを見つけましょう</p>
              <Link href="/factory/chat">
                <Button className="w-full">検索を開始</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="text-blue-600" />
                <span>検索履歴</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">過去の検索履歴を確認できます</p>
              <Link href="/factory/history">
                <Button className="w-full">履歴を見る</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="text-blue-600" />
                <span>応募一覧</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">エンジニアからの応募を確認できます</p>
              <Link href="/factory/applications">
                <Button className="w-full">応募を見る</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

