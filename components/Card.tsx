
import React from 'react';
import { CardData } from '../types';

interface CardProps {
  card: CardData;
  onDragStart: (card: CardData) => void;
  isCorrect?: boolean;
}

const CorrectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IncorrectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Card: React.FC<CardProps> = ({ card, onDragStart, isCorrect }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(card);
  };
  
  const baseClasses = "bg-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing select-none transition-all duration-200 flex justify-between items-center";
  
  let borderClass = 'border-l-4 border-transparent';
  if (isCorrect === true) {
    borderClass = 'border-l-4 border-green-500';
  } else if (isCorrect === false) {
    borderClass = 'border-l-4 border-red-500';
  }

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className={`${baseClasses} ${borderClass}`}
    >
      <span className="font-medium text-gray-700">{card.text}</span>
      {isCorrect === true && <CorrectIcon />}
      {isCorrect === false && <IncorrectIcon />}
    </div>
  );
};

export default Card;
