import React, { useState, useEffect, useRef } from 'react';
import { audioService } from '../services/audioService';

interface ControlPanelProps {
  onStop?: () => void;
  isAutoPlaying?: boolean;
  onSongGenerated?: (song: any) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = () => {
  const [bpm, setBpm] = useState(100);
  const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);
  const metronomeInterval = useRef<number | null>(null);
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    audioService.setVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    if (isMetronomePlaying) {
      const intervalMs = (60 / bpm) * 1000;
      metronomeInterval.current = window.setInterval(() => {
        audioService.playClick();
      }, intervalMs);
    } else {
      if (metronomeInterval.current) {
        clearInterval(metronomeInterval.current);
        metronomeInterval.current = null;
      }
    }

    return () => {
      if (metronomeInterval.current) clearInterval(metronomeInterval.current);
    };
  }, [isMetronomePlaying, bpm]);

  return (
    <div className="flex flex-row items-center justify-end gap-2 sm:gap-4 text-sm text-stone-700 w-full overflow-x-auto no-scrollbar">
      
      {/* メトロノーム */}
      <div className="flex flex-shrink-0 items-center gap-2 bg-stone-100/80 rounded-full px-3 py-1.5 border border-stone-300 shadow-sm">
        <span className="text-base select-none">⏱️</span>
        <button
          onClick={() => setIsMetronomePlaying(!isMetronomePlaying)}
          className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all min-w-[2.5rem] border ${
            isMetronomePlaying 
              ? 'bg-rose-500 text-white border-rose-600' 
              : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
          }`}
        >
          {isMetronomePlaying ? 'ON' : 'OFF'}
        </button>
        <div className="flex items-center gap-1 border-l border-stone-300 pl-2">
          <input
            type="number"
            min="40"
            max="200"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-12 px-1 py-0.5 text-center font-mono text-sm bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <span className="text-[10px] font-bold text-stone-500">BPM</span>
        </div>
      </div>

      {/* 音量 */}
      <div className="flex flex-shrink-0 items-center gap-2 bg-stone-100/80 rounded-full px-3 py-1.5 border border-stone-300 shadow-sm">
        <span className="text-base select-none">🔊</span>
        <div className="flex flex-col justify-center w-24 sm:w-32">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-stone-700 hover:accent-amber-600 transition-colors"
          />
        </div>
        <span className="text-xs font-mono w-6 text-right text-stone-500">{volume}</span>
      </div>

    </div>
  );
};