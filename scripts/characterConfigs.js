(function() {
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
                "idle": { "breathSpeed": 350, "breathAmount": 0.8 },
                "walk": { "walkSpeed": 800, "walkAmplitude": 0.5 },
                "attack": { "speed": 0.5, "weak1Arc": 2, "weak2Arc": 1.8, "weak3Arc": 2.5, "grandGlow": 20 },
                "weapon": { "armLen": 13, "armW": 3, "tipSize": 3, "cGrip": "#0087db", "cBlade": "#2d8f39", "curveAmount": 1, "taperAmount": 0.5 }
            },
            "hairType": "short"
        },
        enemy_normal: {
            scale: 1.0, size: 12, color: '#ef4444', shadowAlpha: 0.3,
            headW: 10, headH: 9, torsoW: 10, torsoH: 18,
            upperArmW: 4, upperArmLen: 10, lowerArmW: 3, lowerArmLen: 10,
            upperLegW: 4, upperLegLen: 10, lowerLegW: 3, lowerLegLen: 12,
            shoulderX: 5, shoulderY: -8, hipX: 3, hipY: 6,
            cBody: '#ef4444', cHead: '#fff', cSkin: '#fca5a5', cArms: '#991b1b', cLegs: '#7f1d1d'
        },
        enemy_heavy: {
            scale: 1.2, size: 18, color: '#b91c1c', shadowAlpha: 0.3,
            headW: 14, headH: 12, torsoW: 18, torsoH: 24,
            upperArmW: 6, upperArmLen: 12, lowerArmW: 5, lowerArmLen: 12,
            upperLegW: 6, upperLegLen: 12, lowerLegW: 5, lowerLegLen: 15,
            shoulderX: 10, shoulderY: -10, hipX: 6, hipY: 10,
            cBody: '#b91c1c', cHead: '#fef08a', cSkin: '#f87171', cArms: '#7f1d1d', cLegs: '#450a0a'
        },
        enemy_boss: {
            scale: 2.0, size: 30, color: '#7f1d1d', shadowAlpha: 0.4,
            headW: 24, headH: 22, torsoW: 32, torsoH: 36,
            upperArmW: 8, upperArmLen: 16, lowerArmW: 8, lowerArmLen: 14,
            upperLegW: 8, upperLegLen: 16, lowerLegW: 8, lowerLegLen: 14,
            shoulderX: 18, shoulderY: -12, hipX: 10, hipY: 12,
            elbowAngle: 0.3, kneeAngle: 0.3,
            cBody: '#ef4444', cHead: '#7f1d1d', cEye: '#facc15', cArms: '#991b1b', cLegs: '#7f1d1d',
            motions: {
                idle: { breathSpeed: 250, breathAmount: 0.8 },
                walk: { walkSpeed: 400, walkAmplitude: 1.0 },
                attack: { speed: 0.8, weakArc: 1.5, grandGlow: 30 },
                weapon: { armLen: 35, armW: 8, tipSize: 14, cGrip: '#451a03', cBlade: '#dc2626', curveAmount: 0, taperAmount: 0 }
            }
        }
    };
})();
