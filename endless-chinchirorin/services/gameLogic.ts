
import { HandType, EvaluatedHand, GameResult, TurnResult } from '../types';

export const rollDice = (): [number, number, number] => {
  return [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
};

export const evaluateHand = (dice: [number, number, number]): EvaluatedHand => {
  const sorted = [...dice].sort((a, b) => a - b);
  const [d1, d2, d3] = sorted;

  // PINZORO (1-1-1) -> Strongest, 5x
  if (d1 === 1 && d2 === 1 && d3 === 1) {
    return { dice, type: 'PINZORO', point: 1, strength: 5000, multiplier: 5, label: 'ピンゾロ (5倍)' };
  }

  // ARASHI (Triples 2-6) -> 2nd strongest, 3x
  if (d1 === d2 && d2 === d3) {
    return { dice, type: 'ARASHI', point: d1, strength: 3000 + d1, multiplier: 3, label: `アラシ ${d1} (3倍)` };
  }

  // SHIGORO (4-5-6) -> 3rd strongest, 2x
  if (d1 === 4 && d2 === 5 && d3 === 6) {
    return { dice, type: 'SHIGORO', point: 0, strength: 2000, multiplier: 2, label: 'シゴロ (2倍)' };
  }

  // HIFUMI (1-2-3) -> Weakest, 2x loss
  if (d1 === 1 && d2 === 2 && d3 === 3) {
    return { dice, type: 'HIFUMI', point: 0, strength: -2000, multiplier: 2, label: 'ヒフミ (2倍払)' };
  }

  // POINT
  let point = 0;
  if (d1 === d2) point = d3;
  else if (d2 === d3) point = d1;
  else if (d1 === d3) point = d2;

  if (point > 0) {
    // Standard points 1-6. Strength 1001-1006.
    return { dice, type: 'POINT', point, strength: 1000 + point, multiplier: 1, label: `出目 ${point}` };
  }

  // MENASHI
  return { dice, type: 'MENASHI', point: 0, strength: 0, multiplier: 1, label: '目なし' };
};

// Simulates a turn (up to 3 rolls)
export const playTurn = (): TurnResult => {
  for (let i = 1; i <= 3; i++) {
    const dice = rollDice();
    const hand = evaluateHand(dice);
    if (hand.type !== 'MENASHI') {
      return { hand, rollsCount: i };
    }
    if (i === 3) {
      return { hand, rollsCount: 3 }; // Finished with Menashi
    }
  }
  // Fallback should not be reached
  return { hand: evaluateHand([1, 2, 3]), rollsCount: 3 };
};

export const compareResults = (player: TurnResult, dealer: TurnResult, bet: number): GameResult => {
  const pStr = player.hand.strength;
  const dStr = dealer.hand.strength;

  let isPlayerWin = false;
  let isDraw = false;
  let finalMultiplier = 0;
  let message = '';

  if (pStr > dStr) {
    // Player Wins
    isPlayerWin = true;
    // Multiplier is based on Player's winning hand
    finalMultiplier = player.hand.multiplier;
    message = `${player.hand.label}で勝利！`;
  } else if (dStr > pStr) {
    // Dealer Wins (Player Loses)
    isPlayerWin = false;
    // Multiplier is based on Dealer's winning hand
    finalMultiplier = -dealer.hand.multiplier;
    message = `${dealer.hand.label}で敗北...`;
  } else {
    // Draw (Same strength) - Usually dealer wins in strict rules, but let's make it a Draw (push) for this game
    isDraw = true;
    finalMultiplier = 0;
    message = '引き分け (返金)';
  }

  // Special case: If winner has HIFUMI, they actually LOST. But strength check handles this.
  // HIFUMI has lowest strength (-2000).
  // If Player has POINT(strength 1000+) and Dealer has HIFUMI(-2000) -> Player wins.
  // Multiplier should be Dealer's HIFUMI multiplier (2x).
  // WAIT: Standard rule is whoever gets HIFUMI pays double.
  // If Dealer gets HIFUMI, Player wins 2x.
  // If Player gets HIFUMI, Dealer wins 2x.

  // Re-evaluating multiplier logic based on standard rules:
  // The multiplier is determined by the WINNING hand, UNLESS the loser had HIFUMI.
  // Actually simpler: The hand that isn't "POINT" or "MENASHI" usually dictates a special multiplier.

  if (isPlayerWin) {
      if (dealer.hand.type === 'HIFUMI') {
          finalMultiplier = 2; // Player wins double because dealer rolled HIFUMI
           message = '親がヒフミ！倍付け勝利！';
      } else {
          finalMultiplier = player.hand.multiplier;
      }
  } else if (!isPlayerWin && !isDraw) {
      if (player.hand.type === 'HIFUMI') {
          finalMultiplier = -2; // Player loses double because they rolled HIFUMI
          message = 'ヒフミを出してしまった...倍付け支払い';
      } else {
          finalMultiplier = -dealer.hand.multiplier;
      }
  }

  return {
    player,
    dealer,
    isPlayerWin,
    isDraw,
    finalMultiplier,
    payout: Math.floor(bet * finalMultiplier),
    message
  };
};
