"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
  const router = useRouter()
  const [description, setDescription] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ description })
    })

    router.push("/dashboard/products")
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
          placeholder="Descrição do Produto"
          className="border p-2 w-full"
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar Produto
        </button>
      </form>
    </div>
  )
}
