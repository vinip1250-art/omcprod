"use client"
import { useState } from "react"

export default function Simulator() {
  const [form, setForm] = useState<any>({})
  const [result, setResult] = useState<any>(null)

  async function simulate(e: any) {
    e.preventDefault()

    const res = await fetch("/api/simulator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    })

    const data = await res.json()
    setResult(data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Simulador</h1>

      <form onSubmit={simulate} className="bg-white p-6 rounded shadow space-y-3">
        <input
          placeholder="Valor Compra"
          type="number"
          className="border p-2 w-full"
          onChange={e => setForm({...form, purchaseValue: Number(e.target.value)})}
        />

        <input
          placeholder="Cashback"
          type="number"
          className="border p-2 w-full"
          onChange={e => setForm({...form, cashbackValue: Number(e.target.value)})}
        />

        <input
          placeholder="Quantidade Pontos"
          type="number"
          className="border p-2 w-full"
          onChange={e => setForm({...form, pointsQuantity: Number(e.target.value)})}
        />

        <input
          placeholder="Programa (livelo, latam, smiles, azul)"
          className="border p-2 w-full"
          onChange={e => setForm({...form, pointsProgram: e.target.value})}
        />

        <input
          placeholder="Valor Revenda"
          type="number"
          className="border p-2 w-full"
          onChange={e => setForm({...form, resaleValue: Number(e.target.value)})}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Simular
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-gray-100 p-6 rounded">
          <p>Custo Real: R$ {result.realCost.toFixed(2)}</p>
          <p>Lucro: R$ {result.profit.toFixed(2)}</p>
          <p>ROI: {result.roi.toFixed(1)}%</p>
        </div>
      )}
    </div>
  )
}
