import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Factory, User } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center space-y-8 bg-white p-12 rounded-xl shadow-2xl">
        <h1 className="text-5xl font-bold text-gray-800">工場とエンジニアを繋げるECサイト</h1>
        <p className="text-2xl text-gray-600">あなたの立場を選択してください</p>
        <div className="flex justify-center space-x-8">
          <Link href="/factory/register" className="group">
            <div className="flex flex-col items-center space-y-4 p-6 bg-blue-100 rounded-lg transition-all duration-300 group-hover:bg-blue-200 group-hover:shadow-lg">
              <Factory size={64} className="text-blue-600" />
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                工場側
              </Button>
            </div>
          </Link>
          <Link href="/engineer/register" className="group">
            <div className="flex flex-col items-center space-y-4 p-6 bg-green-100 rounded-lg transition-all duration-300 group-hover:bg-green-200 group-hover:shadow-lg">
              <User size={64} className="text-green-600" />
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                エンジニア側
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

