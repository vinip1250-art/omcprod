"use client"
import { useState } from "react"

export default function NewProduct() {
  const [form, setForm] = useState<any>({})

  async function handleSubmit(e: any) {
    e.preventDefault()

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    window.location.href = "/dashboard/products"
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Novo Produto</h1>

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-md">
        <input placeholder="Descrição"
          onChange={e => setForm({...form, description: e.target.value})}
          className="border p-2" />

        <input type="number" placeholder="Valor Compra"
          onChange={e => setForm({...form, purchaseValue: +e.target.value})}
          className="border p-2" />

        <input type="number" placeholder="Cashback"
          onChange={e => setForm({...form, cashbackValue: +e.target.value})}
          className="border p-2" />

        <input type="number" placeholder="Pontos"
          onChange={e => setForm({...form, pointsQuantity: +e.target.value})}
          className="border p-2" />

        <input type="number" placeholder="Revenda"
          onChange={e => setForm({...form, resaleValue: +e.target.value})}
          className="border p-2" />

        <button className="bg-blue-600 text-white py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  )
}
