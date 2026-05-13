import React from 'react';
import { CardData } from '../types';

interface CardProps {
  card: CardData;
  onDragStart: (card: CardData) => void;
  isCorrect?: boolean;
}

const CorrectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IncorrectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Card: React.FC<CardProps> = ({ card, onDragStart, isCorrect }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(card);
  };

  const baseClasses = "bg-white p-3 rounded-xl shadow-md cursor-grab active:cursor-grabbing select-none transition-all duration-200 flex items-center gap-3 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]";

  let borderClass = 'border-l-4 border-transparent';
  if (isCorrect === true) {
    borderClass = 'border-l-4 border-green-500 bg-green-50';
  } else if (isCorrect === false) {
    borderClass = 'border-l-4 border-red-500 bg-red-50';
  }

  // Extract emoji from text
  const emoji = card.text.split(' ')[0];
  const foodName = card.text.substring(emoji.length).trim();

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className={`${baseClasses} ${borderClass}`}
    >
      <span className="text-3xl shrink-0">{emoji}</span>
      <span className="font-medium text-gray-700 flex-1">{foodName}</span>
      {isCorrect === true && <CorrectIcon />}
      {isCorrect === false && <IncorrectIcon />}
    </div>
  );
};

export default Card;
