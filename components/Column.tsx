import React from 'react';
import { CardData, Category } from '../types';
import Card from './Card';

interface ColumnProps {
  category: Category;
  title: string;
  bgColor: string;
  borderColor: string;
  cards: CardData[];
  onDrop: (category: Category) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStartCard: (card: CardData) => void;
  feedback: Record<number, boolean> | null;
  isDeck?: boolean;
}

const Column: React.FC<ColumnProps> = ({
  category,
  title,
  bgColor,
  borderColor,
  cards,
  onDrop,
  onDragOver,
  onDragStartCard,
  feedback,
  isDeck = false,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(category);
  };
  
  const headerClasses = `p-3 font-bold text-center text-lg ${
    isDeck ? 'text-blue-800' : 
    category === 'green' ? 'text-green-800' :
    category === 'yellow' ? 'text-yellow-800' :
    'text-red-800'
  }`;

  return (
    <div
      className={`flex flex-col rounded-xl shadow-lg h-full ${isDeck ? 'lg:max-w-xs w-full' : ''}`}
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      <h2 className={`${headerClasses} ${bgColor} rounded-t-xl`}>{title}</h2>
      <div className={`flex-grow p-4 ${bgColor} border-2 border-dashed ${borderColor} rounded-b-xl min-h-[200px] transition-colors duration-300`}>
        <div className="space-y-3">
          {cards.length > 0 ? (
            cards.map(card => (
              <Card
                key={card.id}
                card={card}
                onDragStart={onDragStartCard}
                isCorrect={feedback ? feedback[card.id] : undefined}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400 italic">Arrastra una tarjeta aquí</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Column;
