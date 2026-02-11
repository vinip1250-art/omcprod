"use client"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <p className="p-10">Carregando...</p>

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Investido" value={data.totalInvested} />
        <Card title="Custo Real" value={data.totalRealCost} />
        <Card title="Revenda" value={data.totalResale} />
        <Card title="Lucro" value={data.profit} />
      </div>
    </div>
  )
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-xl font-bold">
        R$ {value?.toFixed(2)}
      </p>
    </div>
  )
}
