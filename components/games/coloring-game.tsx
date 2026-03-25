'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Trash2, Download, Eraser, Palette as PaletteIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColoringGameProps {
  images: string[];
  onBack?: () => void;
}

const COLORS = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
  '#FF00FF', '#00FFFF', '#FFA500', '#800080', 
  '#FFC0CB', '#8B4513', '#000000', '#FFFFFF'
];

const BRUSH_SIZES = [5, 10, 20, 30];

export function ColoringGame({ images, onBack }: ColoringGameProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Инициализация Canvas и отрисовка ч/б изображения
  const initCanvas = useCallback((imgUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.onload = () => {
      // Рассчитываем размеры, чтобы вписать в квадрат 800x800 (внутреннее разрешение)
      const scale = Math.min(800 / img.width, 800 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      
      canvas.width = w;
      canvas.height = h;

      // Рисуем ч/б версию
      ctx.filter = 'grayscale(100%) brightness(1.2) contrast(0.8)';
      ctx.drawImage(img, 0, 0, w, h);
      ctx.filter = 'none';
      
      // Сохраняем состояние для сброса
      canvas.dataset.original = canvas.toDataURL();
    };
  }, []);

  useEffect(() => {
    if (selectedImage) {
      initCanvas(selectedImage);
    }
  }, [selectedImage, initCanvas]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctxRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Получаем координаты с учетом масштабирования canvas в CSS
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (selectedImage) initCanvas(selectedImage);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-magic-coloring.png';
    link.href = canvas.toDataURL();
    link.click();
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
            <h2 className="text-2xl font-black text-white">Magic Coloring</h2>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-slate-400 font-medium">Choose the picture you want to bring to life with colors!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(img)}
              className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white/10 hover:border-pink-500 transition-colors shadow-xl"
            >
              <img src={img} alt="Coloring option" className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-md mx-auto h-full">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button 
          onClick={() => setSelectedImage(null)}
          className="p-3 bg-white/10 rounded-2xl text-white active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={clearCanvas}
            className="p-3 bg-red-500/20 text-red-400 rounded-2xl border border-red-500/30 active:scale-90 transition-transform"
          >
            <Trash2 className="w-6 h-6" />
          </button>
          <button 
            onClick={saveImage}
            className="p-3 bg-green-500/20 text-green-400 rounded-2xl border border-green-500/30 active:scale-90 transition-transform"
          >
            <Download className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/10 touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="w-full h-full cursor-crosshair"
        />
        
        {/* Thumbnail Hint */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-xl border-2 border-white shadow-lg overflow-hidden opacity-80 pointer-events-none">
          <img src={selectedImage} alt="Hint" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Controls */}
      <div className="w-full space-y-6 bg-slate-900/50 p-6 rounded-[2.5rem] border border-white/5">
        {/* Brush Sizes */}
        <div className="flex justify-center gap-6 items-center">
          {BRUSH_SIZES.map(size => (
            <button
              key={size}
              onClick={() => setBrushSize(size)}
              className={cn(
                "rounded-full bg-white transition-all",
                brushSize === size ? "scale-125 ring-4 ring-pink-500" : "opacity-40"
              )}
              style={{ width: size/1.5 + 10, height: size/1.5 + 10 }}
            />
          ))}
          <div className="w-px h-8 bg-white/10 mx-2" />
          <button 
            onClick={() => setColor('#FFFFFF')}
            className={cn(
              "p-2 rounded-xl transition-all",
              color === '#FFFFFF' ? "bg-pink-500 text-white" : "bg-white/10 text-white/40"
            )}
          >
            <Eraser className="w-6 h-6" />
          </button>
        </div>

        {/* Color Palette */}
        <div className="grid grid-cols-6 gap-3">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                "aspect-square rounded-xl border-2 transition-all flex items-center justify-center",
                color === c ? "border-white scale-110 shadow-lg" : "border-transparent opacity-80"
              )}
              style={{ backgroundColor: c }}
            >
              {color === c && <Check className={cn("w-4 h-4", c === '#FFFFFF' ? "text-black" : "text-white")} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
