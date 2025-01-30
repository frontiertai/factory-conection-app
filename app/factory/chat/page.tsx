'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Layout from '@/components/layout'
import { Send, Search } from 'lucide-react'
import { useUser } from '@/app/UserContext'

export default function FactoryChat() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([])
  const [input, setInput] = useState('')
  const [showEngineerButton, setShowEngineerButton] = useState(false)
  const router = useRouter()

  const { user } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])

      // レスポンスまでの遅延を追加（3秒後）
      setTimeout(() => {
        if (messages.length === 0) {
          // 1度目の送信
          setMessages(prev => [...prev, { role: 'ai', content: 'もう少し詳しくお願いします' }])
        } else {
          // 2度目の送信
          setMessages(prev => [...prev, { role: 'ai', content: 'エンジニアを特定できました' }])
          setShowEngineerButton(true) // エンジニアを探すボタンを表示
        }
      }, 3000)

      setInput('')
    }
  }

  const handleFindEngineers = () => {
    router.push('/factory/engineers')
  }

  return (
    <Layout type="factory">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <h1 className="text-3xl font-bold p-6 bg-blue-600 text-white">エンジニアを探す</h1>
        <div className="p-6">
          <div className="h-96 overflow-auto mb-4 bg-gray-100 rounded-lg p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-blue-200'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="どのようなプロトタイプを作りたいですか？"
              className="flex-grow"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send size={20} />
            </Button>
          </form>
          {showEngineerButton && (
            <Button onClick={handleFindEngineers} className="mt-4 bg-green-600 hover:bg-green-700">
              <Search size={20} className="mr-2" />
              エンジニアを探す
            </Button>
          )}
        </div>
      </div>
    </Layout>
  )
}

