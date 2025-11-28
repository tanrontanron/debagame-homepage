export enum NoteType {
  NATURAL = 'NATURAL',
  SHARP = 'SHARP'
}

export interface NoteDefinition {
  id: string;
  note: string; // e.g., "C4", "C#4"
  frequency: number;
  type: NoteType;
  color: string;
  keyBind: string; // Keyboard shortcut
  label: string;
}

export interface GeneratedSong {
  title: string;
  description: string;
  notes: Array<{
    note: string;
    duration: number; // in ms
  }>;
}

export interface AudioState {
  isPlaying: boolean;
  currentNote: string | null;
}