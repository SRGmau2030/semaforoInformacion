
import { CardData } from './types';

export const INITIAL_CARDS: CardData[] = [
  { id: 1, text: 'Foto de tu mascota', correctCategory: 'green' },
  { id: 2, text: 'Tu apodo o nickname', correctCategory: 'green' },
  { id: 3, text: 'Un dibujo que hiciste', correctCategory: 'green' },
  { id: 4, text: 'Tu comida favorita', correctCategory: 'green' },
  { id: 5, text: 'Tu nombre completo', correctCategory: 'yellow' },
  { id: 6, text: 'Tu edad', correctCategory: 'yellow' },
  { id: 7, text: 'Foto con el uniforme escolar', correctCategory: 'yellow' },
  { id: 8, text: 'El nombre de tu colegio', correctCategory: 'yellow' },
  { id: 9, text: 'Una foto con tus amigos', correctCategory: 'yellow' },
  { id: 10, text: 'Tu dirección de casa', correctCategory: 'red' },
  { id: 11, text: 'Tu número de teléfono', correctCategory: 'red' },
  { id: 12, text: 'Tu contraseña', correctCategory: 'red' },
  { id: 13, text: 'Ubicación actual', correctCategory: 'red' },
  { id: 14, text: 'Una foto de credencial escorlar', correctCategory: 'red' },
];

// Function to shuffle an array
export function shuffle<T,>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;

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
