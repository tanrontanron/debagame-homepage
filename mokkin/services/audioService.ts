class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private reverbGain: GainNode | null = null;
  private volume: number = 0.5;

  constructor() {
    // Initialize lazily
  }

  private init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.volume;

      // リバーブ設定 (Concert Hall)
      this.reverbNode = this.audioContext.createConvolver();
      // 長めのホール残響 (1.5s -> 3.0s)
      this.reverbNode.buffer = this.createImpulseResponse(3.0, 3.0, false); 
      
      this.reverbGain = this.audioContext.createGain();
      this.reverbGain.gain.value = 0.4; // 残響レベルも少し上げる

      this.reverbNode.connect(this.reverbGain);
      this.reverbGain.connect(this.masterGain);
      this.masterGain.connect(this.audioContext.destination);
    }
  }

  private createImpulseResponse(duration: number, decay: number, reverse: boolean): AudioBuffer {
    if (!this.audioContext) throw new Error("AudioContext not initialized");
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = reverse ? length - i : i;
      const amplitude = Math.pow(1 - n / length, decay);
      left[i] = (Math.random() * 2 - 1) * amplitude;
      right[i] = (Math.random() * 2 - 1) * amplitude;
    }
    return impulse;
  }

  public setVolume(val: number) {
    this.volume = val;
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioContext.currentTime, 0.1);
    }
  }

  public playNote(frequency: number) {
    this.init();
    if (!this.audioContext || !this.masterGain || !this.reverbNode) return;
    if (this.audioContext.state === 'suspended') this.audioContext.resume();

    const t = this.audioContext.currentTime;

    // --- シロフォン（木琴）の音作り ---
    // 特徴: 鋭いアタック、短めのサスティン、「木」の質感（非整数倍音）
    // ユーザー要望により持続時間を延長

    // 1. マレットのアタック音 (Thud/Click)
    const attackOsc = this.audioContext.createOscillator();
    const attackGain = this.audioContext.createGain();
    attackOsc.type = 'square';
    attackOsc.frequency.setValueAtTime(400, t); 
    attackGain.gain.setValueAtTime(0.5, t);
    attackGain.gain.exponentialRampToValueAtTime(0.01, t + 0.01); 
    
    attackOsc.connect(attackGain);
    attackGain.connect(this.masterGain); 
    attackOsc.start(t);
    attackOsc.stop(t + 0.02);

    // 2. メインのトーン (Tone)
    
    // 基本波 (Fundamental)
    const osc1 = this.audioContext.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, t);
    
    // 第1上音 (Overtone 1)
    const osc2 = this.audioContext.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 3.0, t); 

    // エンベロープ (音量変化) - 持続時間を延長
    const toneGain = this.audioContext.createGain();
    toneGain.gain.setValueAtTime(0, t);
    toneGain.gain.linearRampToValueAtTime(0.8, t + 0.005); 
    // 減衰時間を延長 (0.25s -> 0.6s)
    toneGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6); 

    osc1.connect(toneGain);
    
    // 倍音用エンベロープ - こちらも少し延長して響きを豊かに
    const overtoneGain = this.audioContext.createGain();
    overtoneGain.gain.setValueAtTime(0.4, t);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2); // 0.08s -> 0.2s
    
    osc2.connect(overtoneGain);
    overtoneGain.connect(toneGain);

    toneGain.connect(this.masterGain);
    toneGain.connect(this.reverbNode); 

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 1.0); // 停止時間も余裕を持たせる
    osc2.stop(t + 1.0);
  }

  public playClick() {
    this.init();
    if (!this.audioContext || !this.masterGain) return;
    if (this.audioContext.state === 'suspended') this.audioContext.resume();

    const t = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.frequency.setValueAtTime(1200, t);
    osc.type = 'triangle';
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.05);
  }
}

export const audioService = new AudioService();