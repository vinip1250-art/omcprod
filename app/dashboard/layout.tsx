import Link from "next/link"

export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">OMC ERP</h2>

        <nav className="flex flex-col space-y-3 text-sm">
          <Link href="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="/dashboard/products" className="hover:text-blue-400">
            Produtos
          </Link>

          <Link href="/dashboard/cards" className="hover:text-blue-400">
            Cartões
          </Link>

          <Link href="/dashboard/simulator" className="hover:text-blue-400">
            Simulador
          </Link>

          <Link href="/dashboard/reports" className="hover:text-blue-400">
            Relatórios
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-10">
        {children}
      </main>

    </div>
  )
}
