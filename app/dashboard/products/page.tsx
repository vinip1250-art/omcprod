"use client"
import { useEffect, useState } from "react"

export default function Products() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts)
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Descrição</th>
            <th>Compra</th>
            <th>Custo Real</th>
            <th>Revenda</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td>{p.description}</td>
              <td>R$ {p.purchaseValue}</td>
              <td>R$ {p.realCost}</td>
              <td>R$ {p.resaleValue || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
