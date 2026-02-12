export const mileValues: Record<string, number> = {
  livelo: 28,
  latam: 24,
  smiles: 15,
  azul: 13
}

export function calculateProduct(data: any) {
  const mileValue =
    (Number(data.pointsQuantity) / 1000) *
    (mileValues[data.pointsProgram] || 0)

  const realCost =
    Number(data.purchaseValue) -
    Number(data.cashbackValue || 0) -
    mileValue

  const profit =
    data.resaleValue
      ? Number(data.resaleValue) - realCost
      : 0

  const roi =
    realCost > 0
      ? (profit / realCost) * 100
      : 0

  return {
    mileValue,
    realCost,
    profit,
    roi
  }
}
