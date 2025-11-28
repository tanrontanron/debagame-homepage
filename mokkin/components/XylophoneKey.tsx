import React, { useEffect, useState } from 'react';
import { NoteDefinition, NoteType } from '../types';

interface XylophoneKeyProps {
  note: NoteDefinition;
  isActive: boolean;
  onPlay: (note: NoteDefinition) => void;
  index: number;
  totalNotes: number;
}

export const XylophoneKey: React.FC<XylophoneKeyProps> = ({ note, isActive, onPlay, index, totalNotes }) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsPressed(true);
      const timer = setTimeout(() => setIsPressed(false), 120);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleInteraction = () => {
    onPlay(note);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleInteraction();
    }
  };

  // --- サイズ計算ロジック ---
  const positionRatio = index / totalNotes; // 0.0 (Left) -> 1.0 (Right)

  // 長さ (Height): 
  const baseLengthRem = note.type === NoteType.NATURAL ? 24 : 16;
  const minLengthRem = note.type === NoteType.NATURAL ? 12 : 8;
  const heightRem = baseLengthRem - ((baseLengthRem - minLengthRem) * positionRatio);

  // 幅 (Width): 
  const baseWidthPx = 56; // 約3.5rem
  const minWidthPx = 36;  // 約2.25rem
  const widthPx = baseWidthPx - ((baseWidthPx - minWidthPx) * positionRatio);

  // --- 色計算ロジック (ローズウッドのグラデーション) ---
  const h = 0 + (20 * positionRatio);
  const s = 45 + (15 * positionRatio); 
  const l = 20 + (25 * positionRatio); 
  
  const woodColorStyle = {
    backgroundColor: `hsl(${h}, ${s}%, ${l}%)`,
    height: `${heightRem}rem`,
    width: `${widthPx}px`,
    backgroundImage: `
      repeating-linear-gradient(90deg, 
        rgba(255,255,255,0.02) 0px, 
        rgba(0,0,0,0.05) 1px, 
        transparent 2px, 
        transparent 4px
      ),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)
    `,
  };

  // シャープ（上段）の浮き上がり表現
  const shadowClass = isPressed 
    ? "shadow-[0_0_20px_rgba(255,215,0,0.8)] brightness-125 translate-y-[2px]" 
    : "shadow-[2px_2px_4px_rgba(0,0,0,0.6)] hover:brightness-110";

  // フォントサイズの決定（お子様向けに特大）
  // 幹音（白鍵相当）は最大、派生音（黒鍵相当）は少し小さめだがそれでも大きく
  const labelSizeClass = note.type === NoteType.SHARP ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl';

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center select-none 
        rounded-sm transition-transform duration-75 ease-out
        ${shadowClass} z-10 cursor-pointer
        border-r border-b border-black/30
      `}
      style={woodColorStyle}
      onMouseDown={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onTouchStart={(e) => { e.preventDefault(); handleInteraction(); }}
    >
      {/* 紐を通す穴 (Node Points) - 上部 */}
      {/* 鍵盤の端（上）から少し内側に配置 */}
      <div className="absolute top-[15%] w-2.5 h-2.5 rounded-full bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#555] opacity-80"></div>
      </div>
      
      {/* 音名ラベル (中央配置) */}
      {/* 留め具と重ならないよう、鍵盤の幾何学的中心に配置 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
        
        {/* キーボードショートカット（控えめに表示） */}
        <div className="text-[10px] text-white/30 font-mono absolute top-2">{note.keyBind}</div>
        
        {/* メインのひらがなラベル */}
        {note.label && (
          <div 
            className={`
              font-black text-white 
              drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] 
              leading-none tracking-tighter
              ${labelSizeClass}
            `}
            style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}
          >
            {note.label}
          </div>
        )}
      </div>

      {/* 紐を通す穴 (Node Points) - 下部 */}
      {/* 鍵盤の端（下）から少し内側に配置 */}
      <div className="absolute bottom-[15%] w-2.5 h-2.5 rounded-full bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center pointer-events-none">
         <div className="w-1.5 h-1.5 rounded-full bg-[#555] opacity-80"></div>
      </div>
      
      {/* 発光エフェクト (打鍵時) */}
      {isPressed && (
        <div className="absolute inset-0 bg-yellow-200/30 mix-blend-overlay rounded-sm pointer-events-none"></div>
      )}
    </div>
  );
};
