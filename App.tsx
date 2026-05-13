import React, { useState, useCallback } from 'react';
import { CardData, Category, Columns } from './types';
import { INITIAL_CARDS, shuffle } from './constants';
import Column from './components/Column';

// Helper to create the initial state
const getInitialState = (): Columns => ({
  deck: shuffle([...INITIAL_CARDS]),
  green: [],
  yellow: [],
  red: [],
});

const App: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(getInitialState());
  const [draggedCard, setDraggedCard] = useState<CardData | null>(null);
  const [feedback, setFeedback] = useState<Record<number, boolean> | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDragStart = (card: CardData) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((targetCategory: Category) => {
    if (!draggedCard) return;

    // Find the source category of the dragged card
    const sourceCategory = (Object.keys(columns) as Category[]).find(cat =>
      columns[cat].some(c => c.id === draggedCard.id)
    );

    if (sourceCategory && sourceCategory !== targetCategory) {
      setColumns(prevColumns => {
        const newColumns = { ...prevColumns };
        // Remove card from source
        newColumns[sourceCategory] = newColumns[sourceCategory].filter(
          c => c.id !== draggedCard.id
        );
        // Add card to target
        newColumns[targetCategory] = [...newColumns[targetCategory], draggedCard];
        return newColumns;
      });
    }

    setDraggedCard(null);
  }, [draggedCard, columns]);

  const handleCheckAnswers = () => {
    const newFeedback: Record<number, boolean> = {};
    let allCorrect = true;
    let cardsChecked = 0;

    Object.entries(columns).forEach((entry) => {
      const category = entry[0] as Category;
      const cards = entry[1];
      
      if (category === 'deck') {
        if (cards.length > 0) allCorrect = false;
        return;
      };

      cards.forEach(card => {
        const isCorrect = card.correctCategory === category;
        newFeedback[card.id] = isCorrect;
        if (!isCorrect) allCorrect = false;
        cardsChecked++;
      });
    });
    
    if (cardsChecked !== INITIAL_CARDS.length) {
      allCorrect = false;
    }

    setFeedback(newFeedback);
    if(allCorrect) {
      setShowSuccessModal(true);
    }
  };

  const handleReset = () => {
    setColumns(getInitialState());
    setFeedback(null);
    setShowSuccessModal(false);
  };

  const columnConfig = [
    { category: 'green' as Category, title: '🟢 VERDE: Come libremente', bgColor: 'bg-green-100', borderColor: 'border-green-500' },
    { category: 'yellow' as Category, title: '🟡 AMARILLO: Con moderación', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500' },
    { category: 'red' as Category, title: '🔴 ROJO: Evita', bgColor: 'bg-red-100', borderColor: 'border-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex flex-col items-center p-4 sm:p-8 font-sans">
      <header className="text-center mb-6 max-w-4xl">
        <div className="text-6xl mb-4">🍽️</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          El Semáforo del <span className="text-green-600">Plato</span> del{' '}
          <span className="text-yellow-600">Bien</span> <span className="text-red-600">Comer</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
          Arrastra cada alimento a la columna correcta según el Plato del Bien Comer.
          ¡Aprende a comer saludablemente!
        </p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
          <span>🥗 <strong>Verde:</strong> Libre consumo</span>
          <span>⚖️ <strong>Amarillo:</strong> Moderado</span>
          <span>🚫 <strong>Rojo:</strong> Evitar</span>
        </div>
      </header>
      
      <main className="w-full flex flex-col lg:flex-row gap-6 max-w-7xl">
        <Column
          category="deck"
          title="📦 Alimentos por clasificar"
          bgColor="bg-blue-100"
          borderColor="border-blue-500"
          cards={columns.deck}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStartCard={handleDragStart}
          feedback={feedback}
          isDeck={true}
        />
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
          {columnConfig.map(config => (
            <Column
              key={config.category}
              category={config.category}
              title={config.title}
              bgColor={config.bgColor}
              borderColor={config.borderColor}
              cards={columns[config.category]}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStartCard={handleDragStart}
              feedback={feedback}
            />
          ))}
        </div>
      </main>

      <footer className="mt-8 flex items-center gap-4 flex-wrap justify-center">
        <button
          onClick={handleCheckAnswers}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-all transform hover:scale-105 active:scale-95"
        >
          ✅ Revisar Respuestas
        </button>
        <button
          onClick={handleReset}
          className="px-8 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-semibold rounded-xl shadow-md hover:from-gray-400 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all transform hover:scale-105 active:scale-95"
        >
          🔄 Reiniciar
        </button>
      </footer>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform transition-all scale-95 animate-pulse-in max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Excelente Trabajo!</h2>
            <p className="text-gray-600 mb-6">
              Has clasificado todos los alimentos correctamente según el Plato del Bien Comer. 
              ¡Ahora sabes cómo alimentarte saludablemente!
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all transform hover:scale-105 active:scale-95"
            >
              🎮 Jugar de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
