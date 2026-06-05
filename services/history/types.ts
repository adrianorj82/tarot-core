import { CardType } from "../tarotEngine";

export type SpreadType =
  | "single"
  | "three"
  | "celtic";

export type Reading = {
  id: string;
  date: number;
  spreadType: SpreadType;
  cards: CardType[];

  notes?: string;

  favorite?: boolean;
  archived?: boolean;
  profileId?: string | null;
};