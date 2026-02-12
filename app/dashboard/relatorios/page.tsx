"use client"
import { useEffect, useState } from "react"

export default function Relatorios() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/relatorios", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <div>Carregando...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Relatórios Consolidados
      </h1>

      <ul className="space-y-4">
        <li>
          <strong>Total Investido em Compras:</strong> R${" "}
          {data.totalCompras._sum.purchaseValue || 0}
        </li>
        <li>
          <strong>Total Frete:</strong> R${" "}
          {data.totalCompras._sum.freightCost || 0}
        </li>
        <li>
          <strong>Total Estoque:</strong> R${" "}
          {data.totalEstoque._sum.finalCost || 0}
        </li>
        <li>
          <strong>Total Vendas:</strong> R${" "}
          {data.totalVendas._sum.totalValue || 0}
        </li>
        <li>
          <strong>Total Lucro:</strong> R${" "}
          {data.totalVendas._sum.profit || 0}
        </li>
        <li>
          <strong>Milhas Pendentes:</strong>{" "}
          {data.totalMilhasPendentes}
        </li>
      </ul>
    </div>
  )
}
