"use client"
import { useEffect, useState } from "react"

export default function Cards() {
  const [cards, setCards] = useState<any[]>([])
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    fetch("/api/cards", { credentials: "include" })
      .then(res => res.json())
      .then(setCards)
  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault()

    await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    })

    window.location.reload()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cartões</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 space-y-3">
        <input
          placeholder="Nome do Cartão"
          className="border p-2 w-full"
          onChange={e => setForm({...form, name: e.target.value})}
        />

        <input
          placeholder="Limite"
          type="number"
          className="border p-2 w-full"
          onChange={e => setForm({...form, limit: Number(e.target.value)})}
        />

        <input
          placeholder="Pontuação Base"
          type="number"
          className="border p-2 w-full"
          onChange={e => setForm({...form, basePoints: Number(e.target.value)})}
        />

        <input
          placeholder="Programa (livelo, latam, smiles, azul)"
          className="border p-2 w-full"
          onChange={e => setForm({...form, program: e.target.value})}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Adicionar Cartão
        </button>
      </form>

      <table className="min-w-full bg-white shadow rounded text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nome</th>
            <th>Limite</th>
            <th>Programa</th>
          </tr>
        </thead>

        <tbody>
          {cards.map(card => (
            <tr key={card.id} className="border-t text-center">
              <td>{card.name}</td>
              <td>R$ {card.limit}</td>
              <td>{card.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
