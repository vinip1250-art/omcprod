export const valuesPerThousand: Record<string, number> = {
  livelo: 28,
  esfera: 28,
  latam: 24,
  smiles: 15,
  azul: 13
}

export function calculateRealCost(
  purchaseValue: number,
  cashback: number,
  points: number,
  program: string
) {
  const value = valuesPerThousand[program] || 0
  const milesValue = (points / 1000) * value
  return purchaseValue - cashback - milesValue
}
