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

/**
 * Estado interno do baralho (1 leitura = 1 deck consumido)
 */
let deck: CardType[] = [];
let initialized = false;

/**
 * Embaralha array (Fisher-Yates)
 */
function shuffle(array: CardType[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Inicializa o deck UMA vez por leitura
 * Garante 78 cartas e impede duplicação
 */
export function initDeck(cards: CardType[]) {
  if (!cards || cards.length !== 78) {
    console.error(
      `[TarotEngine] Deck inválido: esperado 78 cartas, recebido ${cards?.length}`
    );
    return;
  }

  deck = [...cards];
  shuffle(deck);
  initialized = true;
}

/**
 * Compra cartas consumindo o deck real (SEM REPETIÇÃO)
 */
export function drawCards(
  cards: CardType[],
  spreadType: string
): DrawResult {
  if (!initialized) {
    initDeck(cards);
  }

  let amount = 1;

  switch (spreadType) {
    case "three":
      amount = 3;
      break;
    case "celtic":
      amount = 10;
      break;
    case "astrological":
      amount = 12;
      break;
    default:
      amount = 1;
  }

  // segurança: não pedir mais cartas do que existem
  if (amount > deck.length) {
    amount = deck.length;
  }

  const drawnCards: CardType[] = [];

  for (let i = 0; i < amount; i++) {
    const card = deck.shift(); // 🔥 remove do baralho

    if (!card) break;

    drawnCards.push({
      ...card,
      reversed: Math.random() < 0.1,
      revealed: false,
    });
  }

  // fundo do deck (última carta restante)
  const bottom =
    deck.length > 0
      ? deck.pop()!
      : drawnCards[drawnCards.length - 1];

  return {
    cards: drawnCards,
    bottomCard: {
      ...bottom,
      reversed: Math.random() < 0.1,
      revealed: false,
    },
  };
}

/**
 * Reset completo do deck (nova leitura)
 */
export function resetDeck(cards: CardType[]) {
  initialized = false;
  deck = [];
  initDeck(cards);
}

/**
 * Debug: cartas restantes no deck
 */
export function remainingCards() {
  return deck.length;
}