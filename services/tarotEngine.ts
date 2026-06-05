export type CardType = {
  name: string;
  image: string;
  reversed?: boolean;
  revealed?: boolean;
};

export type DrawResult = {
  cards: CardType[];
  bottomCard: CardType;
};

export function shuffleDeck(cards: CardType[]) {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

export function drawCards(
  cards: CardType[],
  spreadType: string
): DrawResult {
  let amount = 1;

  if (spreadType === "three") amount = 3;

  if (spreadType === "celtic") amount = 10;

  if (spreadType === "astrological") amount = 12;

  const shuffled = shuffleDeck(cards);

  const selectedCards = shuffled
    .slice(0, amount)
    .map((card) => ({
      ...card,
      reversed: Math.random() < 0.1,
      revealed: false,
    }));

  const bottomCard = {
    ...shuffled[shuffled.length - 1],
    reversed: Math.random() < 0.1,
    revealed: false,
  };

  return {
    cards: selectedCards,
    bottomCard,
  };
}