export interface TarotCard {
  id: string

  name: string

  arcana: "major" | "minor"

  suit?: "cups" | "wands" | "swords" | "pentacles"

  number?: number | string

  element?: string

  astrology?: string

  hebrew?: string

  path?: number

  image: string
}