'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RefreshCw, Trophy, Image as ImageIcon, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PuzzleGameProps {
  images: string[];
  onBack?: () => void;
}

type Tile = number | null; // null - пустая клетка

export function PuzzleGame({ images, onBack }: PuzzleGameProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  // Инициализация пазла (решенное состояние)
  const initPuzzle = useCallback(() => {
    const newTiles = Array.from({ length: 8 }, (_, i) => i);
    setTiles([...newTiles, null]);
    setIsSolved(false);
    setMoves(0);
  }, []);

  // Проверка на решаемость и перемешивание
  const shuffleTiles = () => {
    setIsShuffling(true);
    let newTiles = [...Array(8).keys(), null];
    
    // Для гарантии решаемости делаем 100 случайных валидных ходов
    for (let i = 0; i < 100; i++) {
      const emptyIndex = newTiles.indexOf(null);
      const neighbors = getNeighbors(emptyIndex);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      // Меняем местами
      const temp = newTiles[emptyIndex];
      newTiles[emptyIndex] = newTiles[randomNeighbor];
      newTiles[randomNeighbor] = temp;
    }

    setTiles(newTiles);
    setMoves(0);
    setIsSolved(false);
    setTimeout(() => setIsShuffling(false), 500);
  };

  const getNeighbors = (index: number) => {
    const neighbors = [];
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (row > 0) neighbors.push(index - 3); // top
    if (row < 2) neighbors.push(index + 3); // bottom
    if (col > 0) neighbors.push(index - 1); // left
    if (col < 2) neighbors.push(index + 1); // right

    return neighbors;
  };

  const handleTileClick = (index: number) => {
    if (isSolved || isShuffling) return;

    const emptyIndex = tiles.indexOf(null);
    const neighbors = getNeighbors(emptyIndex);

    if (neighbors.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = tiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
      setMoves(m => m + 1);

      // Проверка на победу
      const solved = newTiles.every((tile, i) => {
        if (i === 8) return tile === null;
        return tile === i;
      });
      if (solved) setIsSolved(true);
    }
  };

  if (!selectedImage) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white/10 rounded-2xl text-white active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center pr-12">
            <h2 className="text-2xl font-black text-white">Magic Puzzle</h2>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-slate-400 font-medium">From which story will we assemble the puzzle?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedImage(img);
                initPuzzle();
              }}
              className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white/10 hover:border-indigo-500 transition-colors shadow-xl"
            >
              <img src={img} alt="Puzzle option" className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button 
          onClick={() => setSelectedImage(null)}
          className="p-3 bg-white/10 rounded-2xl text-white active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/30">
          <span className="text-indigo-300 font-black">Ходов: {moves}</span>
        </div>
        <button 
          onClick={shuffleTiles}
          className="p-3 bg-white/10 rounded-2xl text-white active:scale-90 transition-transform"
        >
          <RefreshCw className={cn("w-6 h-6", isShuffling && "animate-spin")} />
        </button>
      </div>

      {/* Puzzle Board */}
      <div className="relative aspect-square w-full max-w-[340px] bg-slate-800 rounded-[2.5rem] p-3 shadow-2xl border-4 border-white/5">
        <div className="grid grid-cols-3 gap-2 h-full">
          {tiles.map((tile, idx) => (
            <div key={idx} className="relative aspect-square">
              <AnimatePresence mode="popLayout">
                {tile !== null ? (
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => handleTileClick(idx)}
                    className="w-full h-full rounded-xl overflow-hidden border-2 border-white/10 shadow-lg active:scale-95 transition-transform"
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 50}%`,
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-slate-900/50 border-2 border-dashed border-white/5" />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Win Overlay */}
        <AnimatePresence>
          {isSolved && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 bg-indigo-600/90 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2">Ура! Собрано!</h3>
              <p className="text-indigo-100 font-medium mb-8">Ты настоящий мастер волшебных пазлов. Сделано ходов: {moves}</p>
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={shuffleTiles}
                  className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black shadow-xl active:scale-95 transition-transform"
                >
                  Play Again
                </button>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-4 bg-indigo-500 text-white rounded-2xl font-black active:scale-95 transition-transform"
                >
                  Another picture
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint / Preview */}
      {!isSolved && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Hint</p>
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 opacity-50">
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
