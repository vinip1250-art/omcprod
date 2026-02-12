"use client"
import { useEffect, useState } from "react"

export default function Compras() {
  const [purchases, setPurchases] = useState<any[]>([])
  const [form, setForm] = useState<any>({})
  const [editing, setEditing] = useState(false)

  async function load() {
    const res = await fetch("/api/compras", {
      credentials: "include"
    })
    const data = await res.json()
    setPurchases(data)
  }

  useEffect(() => {
    load()
  }, [])

  async function save() {
    const method = editing ? "PUT" : "POST"

    await fetch("/api/compras", {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    })

    setForm({})
    setEditing(false)
    load()
  }

  async function remove(id: string) {
    await fetch("/api/compras?id=" + id, {
      method: "DELETE",
      credentials: "include"
    })
    load()
  }

  function edit(p: any) {
    setForm(p)
    setEditing(true)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Compras
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded shadow mb-8 space-y-3">
        <input
          placeholder="Item"
          className="border p-2 w-full"
          onChange={e =>
            setForm({ ...form, productId: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          onChange={e =>
            setForm({ ...form, purchaseDate: e.target.value })
          }
        />

        <input
          placeholder="Pedido"
          className="border p-2 w-full"
          onChange={e =>
            setForm({ ...form, orderNumber: e.target.value })
          }
        />

        <input
          placeholder="Valor pago"
          type="number"
          className="border p-2 w-full"
          onChange={e =>
            setForm({
              ...form,
              purchaseValue: Number(e.target.value)
            })
          }
        />

        <input
          placeholder="Frete"
          type="number"
          className="border p-2 w-full"
          onChange={e =>
            setForm({
              ...form,
              freightCost: Number(e.target.value)
            })
          }
        />

        <input
          placeholder="Cashback"
          type="number"
          className="border p-2 w-full"
          onChange={e =>
            setForm({
              ...form,
              cashbackValue: Number(e.target.value)
            })
          }
        />

        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editing ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      {/* LISTA */}
      <table className="min-w-full bg-white shadow rounded text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th>Pedido</th>
            <th>Valor</th>
            <th>Frete</th>
            <th>Cashback</th>
            <th>Custo Final</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {purchases.map(p => (
            <tr key={p.id} className="border-t text-center">
              <td>{p.orderNumber}</td>
              <td>{p.purchaseValue}</td>
              <td>{p.freightCost}</td>
              <td>{p.cashbackValue}</td>
              <td className="font-semibold">
                {p.finalCost?.toFixed(2)}
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => edit(p)}
                  className="text-blue-600"
                >
                  Editar
                </button>
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
