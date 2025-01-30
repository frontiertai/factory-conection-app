import Link from 'next/link'
import { Factory, User, Home, Search, Clock, UserCheck } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  type: 'factory' | 'engineer'
}

export default function Layout({ children, type }: LayoutProps) {
  const isFactory = type === 'factory'
  const color = isFactory ? 'blue' : 'green'

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className={`bg-${color}-600 text-white p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Home size={24} />
            <span className="text-xl font-bold">工場×エンジニア</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href={`/${type}/home`} className="flex items-center space-x-2 hover:underline">
              <Home size={20} />
              <span>ホーム</span>
            </Link>
            <Link href={isFactory ? "/factory/chat" : "/engineer/factories"} className="flex items-center space-x-2 hover:underline">
              <Search size={20} />
              <span>{isFactory ? "エンジニアを探す" : "工場を探す"}</span>
            </Link>
            <Link href={`/${type}/history`} className="flex items-center space-x-2 hover:underline">
              <Clock size={20} />
              <span>検索履歴</span>
            </Link>
            <Link href={isFactory ? "/factory/applications" : "/engineer/scouts"} className="flex items-center space-x-2 hover:underline">
              <UserCheck size={20} />
              <span>{isFactory ? "応募一覧" : "スカウト一覧"}</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            {isFactory ? <Factory size={24} /> : <User size={24} />}
            <span className="text-lg">{isFactory ? '工場' : 'エンジニア'}ポータル</span>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 工場×エンジニア</p>
        </div>
      </footer>
    </div>
  )
}

