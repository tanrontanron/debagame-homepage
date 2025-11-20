import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Die from './components/Die';
import { INITIAL_BALANCE, BET_AMOUNTS, EvaluatedHand, TurnResult, GameResult, GameHistoryItem, GameStats, HandType } from './types';
import { rollDice, evaluateHand, playTurn, compareResults } from './services/gameLogic';

// Utility to format currency
const formatYen = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
};

const initialStats: GameStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  maxBalance: INITIAL_BALANCE,
  minBalance: INITIAL_BALANCE,
  handCounts: {},
  totalWagered: 0,
  totalPayout: 0,
};

type GamePhase = 'IDLE' | 'DEALER_TURN' | 'PLAYER_TURN' | 'RESULT';

function App() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [betAmount, setBetAmount] = useState(1000);
  const [gamePhase, setGamePhase] = useState<GamePhase>('IDLE');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Dice States
  const [dealerDice, setDealerDice] = useState<[number, number, number]>([1, 1, 1]); // Initial dummy
  const [playerDice, setPlayerDice] = useState<[number, number, number]>([4, 5, 6]); // Initial dummy

  // Turn Results
  const [dealerTurn, setDealerTurn] = useState<TurnResult | null>(null);
  const [playerTurn, setPlayerTurn] = useState<TurnResult | null>(null);
  const [lastGameResult, setLastGameResult] = useState<GameResult | null>(null);

  // Player Turn Tracking
  const [playerAttempts, setPlayerAttempts] = useState(0);
  const [isRolling, setIsRolling] = useState(false); // Visual rolling state for current turner

  const [history, setHistory] = useState<GameHistoryItem[]>([]);
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [showStats, setShowStats] = useState(false);

  // Refs
  const rollInterval = useRef<number | null>(null);
  const autoPlayTimeout = useRef<number | null>(null);

  // Stats Updater
  const updateStats = (result: GameResult, newBalance: number, wager: number) => {
    setStats(prev => {
      const pHand = result.player.hand.type;
      const newHandCounts = { ...prev.handCounts, [pHand]: (prev.handCounts[pHand] || 0) + 1 };
      return {
        totalGames: prev.totalGames + 1,
        wins: prev.wins + (result.isPlayerWin ? 1 : 0),
        losses: prev.losses + (!result.isPlayerWin && !result.isDraw ? 1 : 0),
        draws: prev.draws + (result.isDraw ? 1 : 0),
        maxBalance: Math.max(prev.maxBalance, newBalance),
        minBalance: Math.min(prev.minBalance, newBalance),
        handCounts: newHandCounts,
        totalWagered: prev.totalWagered + wager,
        totalPayout: prev.totalPayout + result.payout,
      };
    });
  };

  // START GAME (Dealer Turn)
  const startGame = useCallback(() => {
    if (gamePhase !== 'IDLE') return;
    setGamePhase('DEALER_TURN');
    setLastGameResult(null);
    setPlayerTurn(null);
    setDealerTurn(null);
    setPlayerAttempts(0);

    // Animate Dealer Roll briefly then show result
    setIsRolling(true);
    const interval = window.setInterval(() => setDealerDice(rollDice()), 50);

    setTimeout(() => {
        clearInterval(interval);
        const dTurn = playTurn();
        setDealerDice(dTurn.hand.dice);
        setDealerTurn(dTurn);
        setIsRolling(false);

        // Automatically move to player phase
        // If dealer has instant win/loss hand, we could end here, but let's let player roll for comparison fun
        setTimeout(() => {
             setGamePhase('PLAYER_TURN');
             setPlayerAttempts(3); // Player gets 3 attempts
        }, 800);
    }, 1000);

  }, [gamePhase]);

  // PLAYER ROLL
  const handlePlayerRoll = useCallback(() => {
      if (gamePhase !== 'PLAYER_TURN' || isRolling) return;

      setIsRolling(true);
      setPlayerAttempts(prev => prev - 1);

      const interval = window.setInterval(() => setPlayerDice(rollDice()), 50);

      setTimeout(() => {
          clearInterval(interval);
          const dice = rollDice();
          setPlayerDice(dice);
          const hand = evaluateHand(dice);
          setIsRolling(false);

          if (hand.type !== 'MENASHI' || playerAttempts <= 1) {
              // Hand determined or out of attempts
              const pTurn: TurnResult = { hand, rollsCount: 4 - playerAttempts };
              setPlayerTurn(pTurn);
              setGamePhase('RESULT');

              // Calculate Result
              if (dealerTurn) {
                  const result = compareResults(pTurn, dealerTurn, betAmount);
                  setLastGameResult(result);
                  const newBalance = balance + result.payout;
                  setBalance(newBalance);

                  setHistory(prev => [{
                      id: uuidv4(),
                      bet: betAmount,
                      result: result,
                      balanceAfter: newBalance,
                      timestamp: Date.now()
                  }, ...prev].slice(0, 50));
                  updateStats(result, newBalance, betAmount);
              }
          }
          // If MENASHI and attempts left, stay in PLAYER_TURN
      }, 800);

  }, [gamePhase, isRolling, playerAttempts, dealerTurn, balance, betAmount]);

  // AUTO PLAY EFFECT
  useEffect(() => {
      if (!isAutoPlaying) return;

      if (gamePhase === 'IDLE') {
          autoPlayTimeout.current = window.setTimeout(() => startGame(), 1000);
      } else if (gamePhase === 'PLAYER_TURN' && !isRolling) {
          autoPlayTimeout.current = window.setTimeout(() => handlePlayerRoll(), 500);
      } else if (gamePhase === 'RESULT') {
          autoPlayTimeout.current = window.setTimeout(() => setGamePhase('IDLE'), 2000);
      }

      return () => {
          if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);
      };
  }, [isAutoPlaying, gamePhase, isRolling, startGame, handlePlayerRoll]);

  const handleReset = () => {
    if (window.confirm("本当にリセットしますか？")) {
        setBalance(INITIAL_BALANCE);
        setHistory([]);
        setStats(initialStats);
        setGamePhase('IDLE');
        setLastGameResult(null);
        setDealerTurn(null);
        setPlayerTurn(null);
        setIsAutoPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center pb-12 font-sans">
      {/* Header */}
      <header className="w-full max-w-md bg-stone-900 p-3 sticky top-0 z-20 border-b border-stone-800 flex justify-between items-center shadow-md">
         <h1 className="text-lg font-bold text-amber-500 tracking-wider">無限チンチロ</h1>
         <div className="flex gap-4 items-center">
             <div className={`font-mono text-xl ${balance < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                  {formatYen(balance)}
             </div>
             <button onClick={() => setShowStats(!showStats)} className="text-xs bg-stone-800 px-2 py-1 rounded text-stone-400">
                 {showStats ? '戻る' : '成績'}
             </button>
         </div>
      </header>

      {showStats ? (
          <StatsView stats={stats} onClose={() => setShowStats(false)} />
      ) : (
        <main className="w-full max-w-md flex-1 flex flex-col p-3 space-y-4">

            {/* DEALER AREA */}
            <div className={`relative rounded-2xl p-4 transition-all duration-300 flex flex-col items-center
                ${gamePhase === 'DEALER_TURN' ? 'bg-red-950/40 ring-2 ring-red-500/50' : 'bg-stone-900/40'}`}>
                <div className="text-xs text-red-400 font-bold uppercase tracking-widest mb-2">
                    親 (DEALER)
                    {dealerTurn && <span className="ml-2 text-stone-400">({dealerTurn.rollsCount}回で確定)</span>}
                </div>
                <div className={`flex gap-3 scale-75 ${gamePhase === 'DEALER_TURN' && isRolling ? 'animate-pulse blur-[1px]' : ''}`}>
                    <Die value={dealerDice[0]} /> <Die value={dealerDice[1]} /> <Die value={dealerDice[2]} />
                </div>
                <div className="min-h-[2rem] mt-2">
                    {dealerTurn ? (
                        <span className="text-xl font-bold text-stone-200">{dealerTurn.hand.label}</span>
                    ) : gamePhase === 'DEALER_TURN' ? (
                        <span className="text-stone-500">ロール中...</span>
                    ) : (
                        <span className="text-stone-700">-</span>
                    )}
                </div>
            </div>

            {/* VS INDICATOR */}
            <div className="text-center text-stone-600 font-black text-xl italic opacity-30 -my-2">VS</div>

            {/* PLAYER AREA */}
            <div className={`relative bg-green-900 rounded-3xl p-6 shadow-inner-xl border-4 border-stone-800 flex flex-col items-center justify-center min-h-[240px] overflow-hidden
                 ${gamePhase === 'PLAYER_TURN' ? 'ring-4 ring-amber-400/50' : ''}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_20%,_rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

                {/* Turn Info */}
                <div className="absolute top-3 left-4 text-xs text-green-300/70 font-bold tracking-widest z-10">
                    子 (YOU) {gamePhase === 'PLAYER_TURN' && `あと${playerAttempts}回`}
                </div>

                {/* Dice - No blur when result is shown */}
                <div className={`flex gap-4 z-10 transition-all ${gamePhase === 'PLAYER_TURN' && isRolling ? 'animate-shake blur-[1px]' : ''}`}>
                    <Die value={playerDice[0]} /> <Die value={playerDice[1]} /> <Die value={playerDice[2]} />
                </div>

                {/* Player Hand Label - Always visible, moved up slightly when result is shown */}
                <div className={`z-10 mt-4 min-h-[2.5rem] flex flex-col items-center transition-transform ${gamePhase === 'RESULT' ? '-translate-y-4' : ''}`}>
                    {playerTurn ? (
                        <span className={`text-2xl font-black ${lastGameResult?.isPlayerWin ? 'text-amber-300' : 'text-stone-200'}`}>
                            {playerTurn.hand.label}
                        </span>
                    ) : gamePhase === 'PLAYER_TURN' && !isRolling && playerAttempts < 3 ? (
                        <span className="text-stone-400">目なし (再ロール...)</span>
                    ) : null}
                </div>

                {/* RESULT OVERLAY - Positioned below dice/hand label */}
                {gamePhase === 'RESULT' && lastGameResult && (
                    <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center justify-center animate-fadeIn">
                         <div className={`text-5xl font-black mb-1 drop-shadow-2xl ${lastGameResult.isPlayerWin ? 'text-yellow-400 drop-shadow-glow-gold' : lastGameResult.isDraw ? 'text-stone-300' : 'text-red-600 drop-shadow-glow-red'}`}>
                            {lastGameResult.isPlayerWin ? 'WIN!' : lastGameResult.isDraw ? 'DRAW' : 'LOSE'}
                        </div>
                         <div className="px-3 py-1 bg-black/40 rounded-full backdrop-blur-md text-stone-100 font-bold text-sm mb-1">
                             {lastGameResult.message}
                         </div>
                         <div className={`text-2xl font-mono font-black ${lastGameResult.payout >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                            {lastGameResult.payout > 0 ? '+' : ''}{formatYen(lastGameResult.payout)}
                        </div>
                    </div>
                )}
            </div>

            {/* CONTROLS */}
            <div className="space-y-3 pt-2">
                 {/* Bet Amounts */}
                <div className={`grid grid-cols-4 sm:grid-cols-7 gap-1 ${gamePhase !== 'IDLE' || isAutoPlaying ? 'opacity-30 pointer-events-none' : ''}`}>
                    {BET_AMOUNTS.map(amount => (
                        <button key={amount} onClick={() => setBetAmount(amount)}
                            className={`py-1 px-2 rounded text-xs font-mono font-bold ${betAmount === amount ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400'}`}>
                            {amount >= 10000 ? `${amount/10000}万` : amount >= 1000 ? `${amount/1000}k` : amount}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-3">
                     <button onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`col-span-1 py-3 rounded-xl font-bold text-xs flex flex-col items-center justify-center
                        ${isAutoPlaying ? 'bg-indigo-600 text-white' : 'bg-stone-800 text-stone-400'}`}>
                        AUTO {isAutoPlaying ? 'ON' : 'OFF'}
                     </button>

                     {gamePhase === 'IDLE' ? (
                         <button onClick={startGame} disabled={isAutoPlaying}
                             className="col-span-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white py-4 rounded-xl text-xl font-black tracking-widest shadow-lg shadow-amber-900/40">
                             勝負開始 (START)
                         </button>
                     ) : gamePhase === 'PLAYER_TURN' ? (
                         <button onClick={handlePlayerRoll} disabled={isRolling || isAutoPlaying}
                             className="col-span-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-xl text-xl font-black tracking-widest shadow-lg shadow-blue-900/40">
                             振る (ROLL)
                         </button>
                     ) : (
                         <button onClick={() => setGamePhase('IDLE')} disabled={gamePhase !== 'RESULT' || isAutoPlaying}
                             className="col-span-3 bg-stone-700 text-stone-400 py-4 rounded-xl font-bold disabled:opacity-50">
                             {gamePhase === 'RESULT' ? '次へ (NEXT)' : '...'}
                         </button>
                     )}
                </div>
            </div>

            {/* HISTORY PREVIEW */}
             {history.length > 0 && (
                 <div className="mt-4 p-3 bg-stone-900/50 rounded-xl max-h-[120px] overflow-y-auto text-xs mask-gradient-bottom space-y-1">
                    {history.slice(0, 10).map(item => (
                        <div key={item.id} className="flex justify-between text-stone-400">
                            <span>親:[{item.result.dealer.hand.dice.join('')}] vs 子:[{item.result.player.hand.dice.join('')}]</span>
                             <span className={item.result.payout > 0 ? 'text-emerald-400' : item.result.payout < 0 ? 'text-red-400' : ''}>
                                 {item.result.payout > 0 ? '+' : ''}{item.result.payout}
                             </span>
                        </div>
                    ))}
                 </div>
             )}
        </main>
      )}
      {/* Footer Reset */}
      <div className="fixed bottom-2 right-2">
          <button onClick={handleReset} className="text-xs bg-red-900/20 text-red-500/50 px-2 py-1 rounded hover:bg-red-900/50 hover:text-red-400 transition">
            完全リセット
          </button>
      </div>
    </div>
  );
}

const StatsView: React.FC<{ stats: GameStats; onClose: () => void }> = ({ stats, onClose }) => {
    const winRate = stats.totalGames > 0 ? ((stats.wins / stats.totalGames) * 100).toFixed(1) : '0.0';
    const handDescriptions: Record<HandType, string> = {
        'PINZORO': '1-1-1 (最強, 5倍)',
        'ARASHI': '同じ目x3 (2番目に強い, 3倍)',
        'SHIGORO': '4-5-6 (即勝利, 2倍)',
        'POINT': '同じ目x2 + 違う目 (通常役, 1倍)',
        'MENASHI': '役なし (最弱)',
        'HIFUMI': '1-2-3 (即負け, 2倍払)'
    };

    return (
        <main className="w-full max-w-md flex-1 p-4 overflow-y-auto space-y-6 bg-stone-900/90">
             <h2 className="text-xl font-bold text-stone-200 mb-4">戦績データ</h2>
             <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-stone-800 p-3 rounded">試行回数: <span className="float-right font-mono text-white">{stats.totalGames}</span></div>
                <div className="bg-stone-800 p-3 rounded">勝率: <span className={`float-right font-mono ${parseFloat(winRate) > 50 ? 'text-emerald-400' : 'text-white'}`}>{winRate}%</span></div>
                <div className="bg-stone-800 p-3 rounded">最高所持金: <div className="font-mono text-amber-400 text-right">{formatYen(stats.maxBalance)}</div></div>
                <div className="bg-stone-800 p-3 rounded">最低所持金: <div className="font-mono text-red-400 text-right">{formatYen(stats.minBalance)}</div></div>
                <div className="bg-stone-800 p-3 rounded col-span-2">総配当収支: <span className={`float-right font-mono ${stats.totalPayout >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatYen(stats.totalPayout)}</span></div>
             </div>
             <div>
                 <h3 className="text-stone-400 mb-2">自分の役出現数</h3>
                 <div className="space-y-2 text-sm">
                     {(['PINZORO', 'ARASHI', 'SHIGORO', 'POINT', 'MENASHI', 'HIFUMI'] as HandType[]).map(t => (
                         <div key={t} className="flex flex-col bg-stone-800/50 rounded p-2">
                             <div className="flex justify-between mb-1">
                                 <span className="font-bold text-stone-200">{t}</span>
                                 <span className="font-mono text-white">{stats.handCounts[t] || 0}回</span>
                             </div>
                             <span className="text-xs text-stone-500">{handDescriptions[t]}</span>
                         </div>
                     ))}
                 </div>
             </div>
             <button onClick={onClose} className="w-full py-3 bg-stone-700 text-stone-200 rounded-xl font-bold">閉じる</button>
        </main>
    )
}

export default App;
