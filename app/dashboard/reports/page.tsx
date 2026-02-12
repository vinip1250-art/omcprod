"use client"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

export default function Reports() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/dashboard", { credentials: "include" })
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return null

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Relatórios</h1>

      <PieChart width={400} height={400}>
        <Pie
          data={data.programChart}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
        >
          {data.programChart.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  )
}
