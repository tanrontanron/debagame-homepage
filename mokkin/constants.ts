import { NoteDefinition, NoteType } from './types';

// 基本的な音の定義のみを保持し、色はコンポーネントで動的に生成する
// これにより「低音＝濃い色、高音＝明るい色」のグラデーションを実現する

export const NOTES: NoteDefinition[] = [
  // C4
  { id: 'C4', note: 'C4', frequency: 261.63, type: NoteType.NATURAL, color: '', keyBind: 'z', label: 'ど' },
  // C#4 / Db4 -> れ♭
  { id: 'C#4', note: 'C#4', frequency: 277.18, type: NoteType.SHARP, color: '', keyBind: 's', label: 'れ♭' },
  // D4
  { id: 'D4', note: 'D4', frequency: 293.66, type: NoteType.NATURAL, color: '', keyBind: 'x', label: 'れ' },
  // D#4 / Eb4 -> み♭
  { id: 'D#4', note: 'D#4', frequency: 311.13, type: NoteType.SHARP, color: '', keyBind: 'd', label: 'み♭' },
  // E4
  { id: 'E4', note: 'E4', frequency: 329.63, type: NoteType.NATURAL, color: '', keyBind: 'c', label: 'み' },
  // F4
  { id: 'F4', note: 'F4', frequency: 349.23, type: NoteType.NATURAL, color: '', keyBind: 'v', label: 'ふぁ' },
  // F#4 / Gb4 -> そ♭
  { id: 'F#4', note: 'F#4', frequency: 369.99, type: NoteType.SHARP, color: '', keyBind: 'g', label: 'そ♭' },
  // G4
  { id: 'G4', note: 'G4', frequency: 392.00, type: NoteType.NATURAL, color: '', keyBind: 'b', label: 'そ' },
  // G#4 / Ab4 -> ら♭
  { id: 'G#4', note: 'G#4', frequency: 415.30, type: NoteType.SHARP, color: '', keyBind: 'h', label: 'ら♭' },
  // A4
  { id: 'A4', note: 'A4', frequency: 440.00, type: NoteType.NATURAL, color: '', keyBind: 'n', label: 'ら' },
  // A#4 / Bb4 -> し♭
  { id: 'A#4', note: 'A#4', frequency: 466.16, type: NoteType.SHARP, color: '', keyBind: 'j', label: 'し♭' },
  // B4
  { id: 'B4', note: 'B4', frequency: 493.88, type: NoteType.NATURAL, color: '', keyBind: 'm', label: 'し' },
  // C5
  { id: 'C5', note: 'C5', frequency: 523.25, type: NoteType.NATURAL, color: '', keyBind: ',', label: 'ど' },
  // C#5 / Db5 -> れ♭
  { id: 'C#5', note: 'C#5', frequency: 554.37, type: NoteType.SHARP, color: '', keyBind: '2', label: 'れ♭' },
  // D5
  { id: 'D5', note: 'D5', frequency: 587.33, type: NoteType.NATURAL, color: '', keyBind: '.', label: 'れ' },
  // D#5 / Eb5 -> み♭
  { id: 'D#5', note: 'D#5', frequency: 622.25, type: NoteType.SHARP, color: '', keyBind: '3', label: 'み♭' },
  // E5
  { id: 'E5', note: 'E5', frequency: 659.25, type: NoteType.NATURAL, color: '', keyBind: '/', label: 'み' },
  // F5
  { id: 'F5', note: 'F5', frequency: 698.46, type: NoteType.NATURAL, color: '', keyBind: 'q', label: 'ふぁ' },
  // F#5 / Gb5 -> そ♭
  { id: 'F#5', note: 'F#5', frequency: 739.99, type: NoteType.SHARP, color: '', keyBind: '5', label: 'そ♭' },
  // G5
  { id: 'G5', note: 'G5', frequency: 783.99, type: NoteType.NATURAL, color: '', keyBind: 'w', label: 'そ' },
  // G#5 / Ab5 -> ら♭
  { id: 'G#5', note: 'G#5', frequency: 830.61, type: NoteType.SHARP, color: '', keyBind: '6', label: 'ら♭' },
  // A5
  { id: 'A5', note: 'A5', frequency: 880.00, type: NoteType.NATURAL, color: '', keyBind: 'e', label: 'ら' },
  // A#5 / Bb5 -> し♭
  { id: 'A#5', note: 'A#5', frequency: 932.33, type: NoteType.SHARP, color: '', keyBind: '7', label: 'し♭' },
  // B5
  { id: 'B5', note: 'B5', frequency: 987.77, type: NoteType.NATURAL, color: '', keyBind: 'r', label: 'し' },
  // C6
  { id: 'C6', note: 'C6', frequency: 1046.50, type: NoteType.NATURAL, color: '', keyBind: 't', label: 'ど' },
];