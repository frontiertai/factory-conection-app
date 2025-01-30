'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from '@/components/layout'
import { Search, Clock, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/app/UserContext'
import { useRouter } from 'next/navigation'

export default function EngineerHome() {

  const { user } = useUser()
  const router = useRouter()

  /*useEffect(() => {
    if (!user) {
      router.push('/engineer/login') // ログインしていない場合はエンジニア用ログインページへリダイレクト
    }
    else{
      console.log(user)
    }
  }, [user, router])*/
  return (
    <Layout type="engineer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-600">エンジニアホーム</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="text-green-600" />
                <span>工場を探す</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">興味のある工場を見つけましょう</p>
              <Link href="/engineer/factories">
                <Button className="w-full bg-green-600 hover:bg-green-700">検索を開始</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="text-green-600" />
                <span>検索履歴</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">過去の検索履歴を確認できます</p>
              <Link href="/engineer/history">
                <Button className="w-full bg-green-600 hover:bg-green-700">履歴を見る</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="text-green-600" />
                <span>スカウト一覧</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">工場からのスカウトを確認できます</p>
              <Link href="/engineer/scouts">
                <Button className="w-full bg-green-600 hover:bg-green-700">スカウトを見る</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

