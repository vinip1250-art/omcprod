"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"

export default function MonthlyChart({ data }: any) {
  return (
    <div className="bg-white p-6 rounded shadow mt-8">
      <h2 className="text-lg font-bold mb-4">Lucro Mensal</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
