"use client"
import { useState } from "react"

export default function Register() {
  const [form, setForm] = useState<any>({})

  async function handleSubmit(e: any) {
    e.preventDefault()

    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    window.location.href = "/login"
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Criar Conta</h2>

        <input
          placeholder="Empresa"
          className="border p-2 w-full mb-3"
          onChange={e => setForm({...form, companyName: e.target.value})}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={e => setForm({...form, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full mb-3"
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Criar Conta
        </button>
      </form>
    </div>
  )
}
