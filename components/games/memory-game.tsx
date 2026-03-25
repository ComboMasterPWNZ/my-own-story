'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy, HelpCircle, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MemoryGameProps {
  images: string[];
  onBack?: () => void;
}

interface Card {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ images, onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const initGame = useCallback(() => {
    // Нам нужно 6 уникальных изображений для 12 карточек (4x3)
    // Если изображений меньше, дублируем их
    let gameImages = [...images];
    while (gameImages.length < 6) {
      gameImages = [...gameImages, ...images];
    }
    gameImages = gameImages.slice(0, 6);

    // Создаем пары
    const pairCards: Card[] = [];
    gameImages.forEach((img, index) => {
      // Добавляем две карточки для каждого изображения
      pairCards.push({
        id: index * 2,
        pairId: index,
        image: img,
        isFlipped: false,
        isMatched: false
      });
      pairCards.push({
        id: index * 2 + 1,
        pairId: index,
        image: img,
        isFlipped: false,
        isMatched: false
      });
    });

    // Перемешиваем
    const shuffled = pairCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsSolved(false);
    setIsProcessing(false);
  }, [images]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (index: number) => {
    const card = cards[index];
    
    // Игнорируем клик, если:
    // 1. Идет обработка пары
    // 2. Карточка уже перевернута или совпала
    // 3. Кликнули по той же самой карточке
    if (isProcessing || card.isFlipped || card.isMatched || flippedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsProcessing(true);
      checkMatch(newFlipped);
    }
  };

  const checkMatch = (currentFlipped: number[]) => {
    const [first, second] = currentFlipped;
    const isMatch = cards[first].pairId === cards[second].pairId;

    setTimeout(() => {
      const newCards = [...cards];
      if (isMatch) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
      } else {
        newCards[first].isFlipped = false;
        newCards[second].isFlipped = false;
      }
      
      setCards(newCards);
      setFlippedCards([]);
      setIsProcessing(false);

      // Проверка на победу
      if (newCards.every(c => c.isMatched)) {
        setIsSolved(true);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-3 bg-white/10 rounded-2xl text-white active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
          <span className="text-purple-300 font-black">Ходов: {moves}</span>
        </div>
        <button 
          onClick={initGame}
          className="p-3 bg-white/10 rounded-2xl text-white active:scale-90 transition-transform"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[340px]">
        {cards.map((card, idx) => (
          <div key={card.id} className="aspect-[3/4] relative perspective-1000">
            <motion.div
              initial={false}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              className="w-full h-full relative preserve-3d cursor-pointer"
              onClick={() => handleCardClick(idx)}
            >
              {/* Back Side (Рубашка) */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl border-2 border-white/20 flex items-center justify-center shadow-lg">
                <HelpCircle className="w-8 h-8 text-white/40" />
              </div>

              {/* Front Side (Картинка) */}
              <div 
                className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl border-2 border-purple-400 overflow-hidden shadow-xl"
              >
                <img 
                  src={card.image} 
                  alt="Memory card" 
                  className="w-full h-full object-cover"
                />
                {card.isMatched && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1">
                      <Trophy className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Win Overlay */}
      <AnimatePresence>
        {isSolved && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 bg-purple-900/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mb-6 shadow-2xl"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-4xl font-black text-white mb-2">Блестяще!</h3>
            <p className="text-purple-100 text-lg font-medium mb-8">
              Твоя память просто волшебна! <br/>
              Победа за {moves} ходов.
            </p>
            <button 
              onClick={initGame}
              className="w-full max-w-xs py-5 bg-white text-purple-600 rounded-[2rem] font-black text-xl shadow-xl active:scale-95 transition-transform"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
