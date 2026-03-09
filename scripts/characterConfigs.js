window.CHARACTER_CONFIGS = {
    player: {
        "scale": 1.5,
        "headW": 11,
        "headH": 10,
        "headY": -5,
        "torsoW": 12,
        "torsoH": 20,
        "upperArmW": 6,
        "upperArmLen": 13,
        "lowerArmW": 4,
        "lowerArmLen": 12,
        "upperLegW": 7,
        "upperLegLen": 12,
        "lowerLegW": 5,
        "lowerLegLen": 15,
        "shoulderX": 6,
        "shoulderY": -9,
        "hipX": 4,
        "hipY": 8,
        "elbowAngle": 0.5,
        "kneeAngle": 0.2,
        "shadowAlpha": 0.4,
        "cSkin": "#ffdfc4",
        "cHair": "#cbd5e1",
        "cEye": "#38bdf8",
        "cBody": "#334155",
        "cArmorAcc": "#f59e0b",
        "cArms": "#475569",
        "cLegs": "#1e293b",
        "motions": {
            "idle": {
                "breathSpeed": 350,
                "breathAmount": 0.8
            },
            "walk": {
                "walkSpeed": 800,
                "walkAmplitude": 0.5
            },
            "attack": {
                "speed": 0.5,
                "weak1Arc": 2,
                "weak2Arc": 1.8,
                "weak3Arc": 2.5,
                "grandGlow": 20
            },
            "weapon": {
                "armLen": 13,
                "armW": 3,
                "tipSize": 3,
                "cGrip": "#0087db",
                "cBlade": "#2d8f39",
                "curveAmount": 1,
                "taperAmount": 0.5
            }
        },
        "hairType": "short"
    },
    enemy1: {
        scale: 1.0, size: 12, color: '#ef4444', shape: 'circle', shadowAlpha: 0.3,
        cBody: '#ef4444', cHead: '#fff'
    },
    enemy2: {
        scale: 1.0, size: 18, color: '#b91c1c', shape: 'rect', shadowAlpha: 0.3,
        cBody: '#b91c1c', cHead: '#fef08a'
    },
    boss: {
        scale: 2.0, headW: 24, headH: 22, torsoW: 32, torsoH: 36,
        upperArmW: 6, upperArmLen: 14, lowerArmW: 6, lowerArmLen: 12,
        upperLegW: 6, upperLegLen: 14, lowerLegW: 6, lowerLegLen: 12,
        shoulderX: 18, shoulderY: -12, hipX: 10, hipY: 12,
        elbowAngle: 0.3, kneeAngle: 0.3,
        cBody: '#ef4444', cHead: '#7f1d1d', cEye: '#facc15', cArms: '#991b1b', cLegs: '#7f1d1d', shadowAlpha: 0.4,
        motions: {
            idle: { breathSpeed: 250, breathAmount: 0.8 },
            walk: { walkSpeed: 400, walkAmplitude: 1.0 },
            attack: { speed: 0.8, weakArc: 1.5, grandGlow: 30 },
            weapon: { armLen: 30, armW: 6, tipSize: 12, cGrip: '#451a03', cBlade: '#dc2626', curveAmount: 0, taperAmount: 0 }
        }
    }
};
