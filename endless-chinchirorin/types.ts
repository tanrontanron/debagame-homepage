
export type HandType = 'PINZORO' | 'ARASHI' | 'SHIGORO' | 'POINT' | 'MENASHI' | 'HIFUMI';

export interface EvaluatedHand {
  dice: [number, number, number];
  type: HandType;
  point: number; // 0 if no point, 1-6 for POINT/ARASHI/PINZORO
  strength: number; // For comparison
  multiplier: number; // Base multiplier for this hand
  label: string;
}

export interface TurnResult {
  hand: EvaluatedHand;
  rollsCount: number; // How many times rolled (1-3)
}

export interface GameResult {
  player: TurnResult;
  dealer: TurnResult;
  isPlayerWin: boolean;
  isDraw: boolean;
  finalMultiplier: number; // Positive for player win, negative for loss
  payout: number;
  message: string;
}

export interface GameHistoryItem {
  id: string;
  bet: number;
  result: GameResult;
  balanceAfter: number;
  timestamp: number;
}

export interface GameStats {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  maxBalance: number;
  minBalance: number;
  handCounts: {
    [key in HandType]?: number;
  };
  totalWagered: number;
  totalPayout: number;
}

export const INITIAL_BALANCE = 10000;
export const BET_AMOUNTS = [100, 500, 1000, 5000, 10000, 50000, 100000];
