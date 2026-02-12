"use client"
import { useEffect, useState } from "react"

export default function Products() {
  const [products, setProducts] = useState<any[]>([])

  async function load() {
    const res = await fetch("/api/products", {
      credentials: "include"
    })
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => { load() }, [])

  async function remove(id: string) {
    await fetch("/api/products?id=" + id, {
      method: "DELETE",
      credentials: "include"
    })
    load()
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <a
          href="/dashboard/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Produto
        </a>
      </div>

      <table className="min-w-full bg-white shadow rounded text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Descrição</th>
            <th>Compra</th>
            <th>Custo Real</th>
            <th>Revenda</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t text-center">
              <td>{p.description}</td>
              <td>R$ {p.purchaseValue}</td>
              <td>R$ {p.realCost}</td>
              <td>R$ {p.resaleValue || "-"}</td>
              <td>
                <button
                  onClick={() => remove(p.id)}
                  className="text-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
