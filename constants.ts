import { CardData } from './types';

export const INITIAL_CARDS: CardData[] = [
  // 🟢 VERDE - Alimentos para consumo libre
  { id: 1, text: '🥬 Lechuga', correctCategory: 'green' },
  { id: 2, text: '🍎 Manzana', correctCategory: 'green' },
  { id: 3, text: '🥕 Zanahoria', correctCategory: 'green' },
  { id: 4, text: '🍅 Jitomate', correctCategory: 'green' },
  { id: 5, text: '🥦 Brócoli', correctCategory: 'green' },
  { id: 6, text: '🍊 Naranja', correctCategory: 'green' },
  { id: 7, text: '🥒 Pepino', correctCategory: 'green' },
  { id: 8, text: '🍓 Fresa', correctCategory: 'green' },
  { id: 9, text: '🫑 Chile', correctCategory: 'green' },
  { id: 10, text: '🍌 Plátano', correctCategory: 'green' },

  // 🟡 AMARILLO - Alimentos de consumo moderado
  { id: 11, text: '🌽 Elote', correctCategory: 'yellow' },
  { id: 12, text: '🫘 Frijoles', correctCategory: 'yellow' },
  { id: 13, text: '🍚 Arroz', correctCategory: 'yellow' },
  { id: 14, text: '🥚 Huevo', correctCategory: 'yellow' },
  { id: 15, text: '🥛 Leche', correctCategory: 'yellow' },
  { id: 16, text: '🧀 Queso', correctCategory: 'yellow' },
  { id: 17, text: '🐔 Pollo', correctCategory: 'yellow' },
  { id: 18, text: '🐟 Pescado', correctCategory: 'yellow' },
  { id: 19, text: '🌮 Tortilla', correctCategory: 'yellow' },
  { id: 20, text: '🥔 Papa', correctCategory: 'yellow' },

  // 🔴 ROJO - Alimentos que hay que evitar
  { id: 21, text: '🍩 Donas', correctCategory: 'red' },
  { id: 22, text: '🥤 Refresco', correctCategory: 'red' },
  { id: 23, text: '🍟 Papas fritas', correctCategory: 'red' },
  { id: 24, text: '🍪 Galletas', correctCategory: 'red' },
  { id: 25, text: '🍭 Dulces', correctCategory: 'red' },
  { id: 26, text: '🧁 Pastel', correctCategory: 'red' },
  { id: 27, text: '🌭 Salchicha', correctCategory: 'red' },
  { id: 28, text: '🥟 Sabritas', correctCategory: 'red' },
  { id: 29, text: '🍦 Helado', correctCategory: 'red' },
  { id: 30, text: '🥞 Hot cakes', correctCategory: 'red' },
];

// Function to shuffle an array
export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
