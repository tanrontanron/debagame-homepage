import React, { useEffect, useState, useCallback } from 'react';
import { NOTES } from './constants';
import { XylophoneKey } from './components/XylophoneKey';
import { ControlPanel } from './components/ControlPanel';
import { audioService } from './services/audioService';
import { NoteDefinition, NoteType } from './types';

function App() {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [showNoteLabels, setShowNoteLabels] = useState(true);
  const [showKeyLabels, setShowKeyLabels] = useState(true);

  // 自然な鍵盤配置のためのグルーピング
  const noteGroups = React.useMemo(() => {
    const groups: { natural: NoteDefinition; sharp: NoteDefinition | null; index: number }[] = [];
    const naturals = NOTES.filter(n => n.type === NoteType.NATURAL);

    naturals.forEach((natural) => {
      let attachedSharp: NoteDefinition | null = null;
      const rawIndex = NOTES.findIndex(n => n.id === natural.id);
      if (rawIndex !== -1 && rawIndex + 1 < NOTES.length) {
        const nextNote = NOTES[rawIndex + 1];
        if (nextNote.type === NoteType.SHARP) {
          attachedSharp = nextNote;
        }
      }
      groups.push({ natural, sharp: attachedSharp, index: rawIndex });
    });
    return groups;
  }, []);

  const playNote = useCallback((note: NoteDefinition) => {
    audioService.playNote(note.frequency);
    setActiveNoteId(note.id);
    setTimeout(() => {
      setActiveNoteId(prev => (prev === note.id ? null : prev));
    }, 150);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) return;
    const key = event.key.toLowerCase();
    const note = NOTES.find(n => n.keyBind === key);
    if (note) {
      playNote(note);
    }
  }, [playNote]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="h-screen w-screen bg-stone-100 flex flex-col overflow-hidden select-none wood-bg"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {/* 1. コンパクトヘッダー (タイトル + コントロール) */}
      <div className="flex-none bg-white/95 backdrop-blur shadow-lg z-[100] px-4 py-2 border-b border-stone-300 flex items-center justify-between relative">
        <div className="flex items-center z-10">
          <button id="sidebar-toggle" className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors mr-4">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg sm:text-xl font-black text-stone-800 tracking-widest font-serif whitespace-nowrap flex items-center gap-2 pointer-events-none">
          <span className="text-2xl">🎹</span> 木琴シミュレーター
        </h1>

        <div className="flex items-center justify-end z-10">
          <ControlPanel
            showNoteLabels={showNoteLabels}
            onToggleNoteLabels={setShowNoteLabels}
            showKeyLabels={showKeyLabels}
            onToggleKeyLabels={setShowKeyLabels}
          />
        </div>
      </div>

      {/* 2. メインエリア */}
      <div className="flex-1 relative w-full overflow-auto bg-[#1a1a1a] flex items-center justify-center p-4">

        {/* 背景装飾 */}
        <div className="fixed inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-600 via-stone-900 to-black"></div>

        {/* 木琴本体コンテナ */}
        <div className="relative min-w-fit mx-auto my-auto py-8 scale-90 sm:scale-100 md:scale-110 xl:scale-125 origin-center">

          {/* 台座フレーム */}
          <div className="relative bg-[#111] px-6 sm:px-10 pb-8 rounded-lg shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-t-2 border-[#333] inline-block">

            {/* 左右のフレーム装飾 */}
            <div className="absolute top-1/2 left-[-12px] bottom-0 w-4 bg-[#222] rounded-l border-r border-[#444] shadow-lg"></div>
            <div className="absolute top-1/2 right-[-12px] bottom-0 w-4 bg-[#222] rounded-r border-l border-[#444] shadow-lg"></div>

            {/* 共鳴管（Resonators）背景イメージ */}
            <div className="absolute top-8 left-6 right-6 bottom-8 bg-[#050505] opacity-100 z-0 rounded shadow-inner overflow-hidden border border-[#222]">
              <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_40px,rgba(255,215,0,0.3)_45px,transparent_50px)]"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
            </div>

            {/* 鍵盤配置エリア */}
            <div className="relative flex items-start justify-center gap-[4px] sm:gap-[6px] z-10">

              {noteGroups.map((group, i) => (
                <div key={group.natural.id} className="relative flex flex-col items-center group w-8 sm:w-10 md:w-12 lg:w-14">

                  {/* 上段：派生音 (Sharps) - 下揃え */}
                  {/* 高さ固定(18rem)の中で下端に配置することで、底辺を揃える */}
                  <div className="h-[18rem] w-full relative z-20 pointer-events-none">
                    {group.sharp && (
                      // absolute bottom-0 でコンテナの底辺に合わせる
                      // left-[55%] で右隣（幹音間の隙間）にずらす
                      <div className="absolute left-[55%] bottom-0 pointer-events-auto filter drop-shadow-xl transition-transform group-hover:translate-y-[1px]">
                        <XylophoneKey
                          note={group.sharp}
                          isActive={activeNoteId === group.sharp.id}
                          onPlay={playNote}
                          index={group.index + 1}
                          totalNotes={NOTES.length}
                          showNoteLabels={showNoteLabels}
                          showKeyLabels={showKeyLabels}
                        />
                      </div>
                    )}
                  </div>

                  {/* 下段：幹音 (Naturals) - 上揃え */}
                  {/* 負のマージンで引き上げ、上段の下部と少し重ねる */}
                  <div className="-mt-6 z-10 transition-transform group-hover:translate-y-[1px]">
                    <XylophoneKey
                      note={group.natural}
                      isActive={activeNoteId === group.natural.id}
                      onPlay={playNote}
                      index={group.index}
                      totalNotes={NOTES.length}
                      showNoteLabels={showNoteLabels}
                      showKeyLabels={showKeyLabels}
                    />
                  </div>

                </div>
              ))}
            </div>

            {/* メーカーロゴ風バッジ */}
            <div className="absolute bottom-2 right-6 flex items-center gap-1 opacity-50">
              <div className="w-8 h-1 bg-yellow-600 rounded-full"></div>
              <span className="text-[#666] text-[10px] font-serif tracking-widest uppercase">Orchestra Model</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;