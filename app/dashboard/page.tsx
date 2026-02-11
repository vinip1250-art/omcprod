"use client"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <p className="p-10">Carregando...</p>

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Investido" value={data.totalInvested || 0} />
        <Card title="Custo Real" value={data.totalRealCost || 0} />
        <Card title="Revenda" value={data.totalResale || 0} />
        <Card title="Lucro" value={data.profit || 0} />
      </div>
    </div>
  )
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-xl font-bold">
        R$ {Number(value).toFixed(2)}
      </p>
    </div>
  )
}
