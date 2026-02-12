"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState<any>({})

  async function handleSubmit(e: any) {
    e.preventDefault()

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    })

    if (res.ok) {
      router.push("/dashboard/products")
    } else {
      alert("Erro ao salvar produto")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Novo Produto
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          placeholder="Descrição"
          className="border p-2 w-full"
          required
          onChange={e =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          required
          onChange={e =>
            setForm({ ...form, purchaseDate: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Valor Compra"
          className="border p-2 w-full"
          required
          onChange={e =>
            setForm({
              ...form,
              purchaseValue: Number(e.target.value)
            })
          }
        />

        <input
          type="number"
          placeholder="Cashback"
          className="border p-2 w-full"
          defaultValue={0}
          onChange={e =>
            setForm({
              ...form,
              cashbackValue: Number(e.target.value)
            })
          }
        />

        <input
          type="number"
          placeholder="Pontos Esperados"
          className="border p-2 w-full"
          required
          onChange={e =>
            setForm({
              ...form,
              pointsQuantity: Number(e.target.value)
            })
          }
        />

        <input
          type="number"
          placeholder="Pontos Creditados"
          className="border p-2 w-full"
          onChange={e =>
            setForm({
              ...form,
              creditedPoints: Number(e.target.value)
            })
          }
        />

        <input
          placeholder="Programa (livelo, latam, smiles, azul)"
          className="border p-2 w-full"
          required
          onChange={e =>
            setForm({
              ...form,
              pointsProgram: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Valor Revenda"
          className="border p-2 w-full"
          onChange={e =>
            setForm({
              ...form,
              resaleValue: Number(e.target.value)
            })
          }
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar Produto
        </button>
      </form>
    </div>
  )
}
