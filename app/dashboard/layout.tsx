export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-lg font-bold">OMC ERP</h2>
        <nav className="space-y-2">
          <a href="/dashboard">Dashboard</a>
          <a href="/dashboard/products">Produtos</a>
          <a href="/dashboard/cards">Cartões</a>
          <a href="/dashboard/simulator">Simulador</a>
          <a href="/dashboard/reports">Relatórios</a>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  )
}
