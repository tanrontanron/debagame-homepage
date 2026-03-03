window.CHARACTER_CONFIGS = {
    player: {
        scale: 2.0, headW: 13, headH: 14, headY: -10, torsoW: 16, torsoH: 24,
        upperArmW: 5, upperArmLen: 11, lowerArmW: 4, lowerArmLen: 11,
        upperLegW: 5, upperLegLen: 13, lowerLegW: 4, lowerLegLen: 13,
        shoulderX: 5, shoulderY: -6, hipX: 4, hipY: 10,
        elbowAngle: 0.5, kneeAngle: 0.2, 
        shadowAlpha: 0.4,
        cSkin: '#ffdfc4', cHair: '#cbd5e1', cEye: '#0ea5e9', cBody: '#334155', cArmorAcc: '#f59e0b', cArms: '#475569', cLegs: '#1e293b',
        motions: {
            idle: { breathSpeed: 350, breathAmount: 0.8 },
            walk: { walkSpeed: 800, walkAmplitude: 0.5 },
            attack: { speed: 0.5, weak1Arc: 2.0, weak2Arc: 1.8, weak3Arc: 2.5, grandGlow: 20 },
            weapon: { armLen: 11, armW: 13, tipSize: 6, cGrip: '#475569', cBlade: '#2d8f39' }
        }
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
            weapon: { armLen: 30, armW: 6, tipSize: 12, cGrip: '#451a03', cBlade: '#dc2626' }
        }
    }
};


﻿function adjustColor(hex, amt) {
    if (!hex) return '#000000';
    let col = hex.replace('#', '');
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
    let r = parseInt(col.substring(0, 2), 16), g = parseInt(col.substring(2, 4), 16), b = parseInt(col.substring(4, 6), 16);
    r = Math.max(0, Math.min(255, r + amt)); g = Math.max(0, Math.min(255, g + amt)); b = Math.max(0, Math.min(255, b + amt));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

function drawBlock(ctx, x, y, w, h, baseColor, s) {
    ctx.fillStyle = baseColor; ctx.fillRect(x, y, w, h);
    if (w <= s || h <= s) return;
    ctx.fillStyle = adjustColor(baseColor, -50); ctx.fillRect(x, y, s, h); ctx.fillRect(x + s, y + h - s, w - s, s);
    ctx.fillStyle = adjustColor(baseColor, 40); ctx.fillRect(x + w - s, y, s, h - s); ctx.fillRect(x + s, y, w - s * 2, s);
}

function drawChamferedBlock(ctx, x, y, w, h, baseColor, s) {
    ctx.fillStyle = baseColor; ctx.fillRect(x + s, y, w - 2 * s, h); ctx.fillRect(x, y + s, w, h - 2 * s);
    ctx.fillStyle = adjustColor(baseColor, -50); ctx.fillRect(x, y + s, s, h - 2 * s); ctx.fillRect(x + s, y + h - s, w - 2 * s, s);
    ctx.fillStyle = adjustColor(baseColor, 40); ctx.fillRect(x + w - s, y + s, s, h - 2 * s); ctx.fillRect(x + s, y, w - 2 * s, s);
}

function drawDotEllipse(ctx, x, y, rx, ry, s, color) {
    ctx.fillStyle = color; let steps = Math.floor(ry / s);
    for (let i = -steps; i <= steps; i++) {
        let dy = i * s, ratio = 1 - Math.pow(dy / ry, 2);
        if (ratio < 0) continue;
        let dx = Math.floor((rx * Math.sqrt(ratio)) / s) * s;
        ctx.fillRect(x - dx, y + dy, dx * 2, s);
    }
}

function drawDotArc(ctx, x, y, r, startA, endA, thickness, color, s) {
    ctx.fillStyle = color;
    const steps = Math.floor((r * Math.abs(endA - startA)) / (s * 0.5));
    for (let i = 0; i <= steps; i++) {
        const a = startA + (endA - startA) * (i / steps);
        const px = Math.floor((Math.cos(a) * r) / s) * s, py = Math.floor((Math.sin(a) * r) / s) * s;
        ctx.fillRect(x + px - thickness / 2, y + py - thickness / 2, thickness, thickness);
    }
}

function getWristTransform(x, y, angle1, angle2, uLen, lLen, s) {
    const elbowX = x - Math.sin(angle1) * uLen, elbowY = y + Math.cos(angle1) * uLen;
    const absAngle2 = angle1 + angle2;
    return { x: elbowX - Math.sin(absAngle2) * (lLen - 2 * s), y: elbowY + Math.cos(absAngle2) * (lLen - 2 * s), angle: absAngle2 };
}

function solveArmIK(startX, startY, targetX, targetY, len1, len2, isBack) {
    const dx = targetX - startX, dy = targetY - startY, dist = Math.sqrt(dx * dx + dy * dy);
    if (dist >= len1 + len2) return { a1: Math.atan2(dy, dx) - Math.PI / 2, a2: 0 };
    const a2 = Math.acos(Math.max(-1, Math.min(1, (dist * dist - len1 * len1 - len2 * len2) / (2 * len1 * len2)))) * (isBack ? -1 : 1);
    return { a1: Math.atan2(dy, dx) - Math.atan2(len2 * Math.sin(a2), len1 + len2 * Math.cos(a2)) - Math.PI / 2, a2: a2 };
}

function _drawLimb(ctx, x, y, angle, isArm, isBack, C, dynamicBend) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
    let s = C.scale || 1.5, jointAngle = dynamicBend !== null ? dynamicBend : (isArm ? C.elbowAngle : C.kneeAngle);
    let baseCol = isArm ? (C.cArms || '#475569') : (C.cLegs || '#1e293b');
    if (isBack) baseCol = adjustColor(baseCol, -80);
    const uw = (isArm ? C.upperArmW : C.upperLegW) * s, ul = (isArm ? C.upperArmLen : C.upperLegLen) * s;
    drawBlock(ctx, -uw / 2, 0, uw, ul, baseCol, s);
    ctx.translate(0, ul); ctx.rotate(jointAngle);
    const lw = (isArm ? C.lowerArmW : C.lowerLegW) * s, ll = (isArm ? C.lowerArmLen : C.lowerLegLen) * s;
    drawBlock(ctx, -lw / 2, 0, lw, ll, baseCol, s);
    ctx.fillStyle = adjustColor(baseCol, -90); ctx.fillRect(-1.5 * s, -1.5 * s, 3 * s, 3 * s);
    ctx.restore();
}

function _drawWeapon(ctx, x, y, angle, scale, flipBlade, C, wpnCfg) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.scale(scale, scale);
    if (flipBlade) ctx.scale(-1, 1);

    let s = C.scale || 1.5, bBaseY = 8 * s;
    drawBlock(ctx, -wpnCfg.armW / 2 * s, 0, wpnCfg.armW * s, bBaseY, wpnCfg.cGrip, s);

    const bLen = Math.floor(wpnCfg.armLen + 15), bw = wpnCfg.tipSize;
    for (let i = 0; i < bLen; i++) {
        let shiftX = 0, currentW = bw;
        if (i > bLen * 0.4) {
            let ratio = (i - bLen * 0.4) / (bLen * 0.6);
            shiftX = Math.floor(Math.pow(ratio, 2) * 5);
            currentW = Math.max(2, bw - Math.floor(ratio * bw * 0.8));
        }
        let rx = (-bw / 2 + shiftX) * s, ry = bBaseY + i * s, rw = currentW * s;
        ctx.fillStyle = wpnCfg.cBlade; ctx.fillRect(rx, ry, rw, s);
        if (rw >= 2 * s) {
            ctx.fillStyle = '#94a3b8'; ctx.fillRect(rx, ry, s, s);
            ctx.fillStyle = '#ffffff'; ctx.fillRect(rx + rw - s, ry, s, s);
        }
    }
    ctx.restore();
}

function drawEntity(ctx, x, y, target, currentAction, time, ad, CONFIGS) {
    const C = CONFIGS[target];
    if (!C) return;
    const s = C.scale || 1.5;
    const wpnCfg = (C.motions && C.motions.weapon) ? C.motions.weapon : { armLen: 18, armW: 6, tipSize: 6, cGrip: '#1e293b', cBlade: '#f8fafc' };

    // 互換性フォールバック
    C.cSkin = C.cSkin || C.cHead || '#ffdfc4';
    C.cHair = C.cHair || '#cbd5e1';
    C.cBody = C.cBody || '#334155';
    C.cArmorAcc = C.cArmorAcc || '#f59e0b';
    C.cArms = C.cArms || '#475569';
    C.cLegs = C.cLegs || '#1e293b';
    C.cEye = C.cEye || '#0ea5e9';
    C.lowerArmW = C.lowerArmW || 4; C.lowerLegW = C.lowerLegW || 4;
    C.lowerArmLen = C.lowerArmLen || 11; C.lowerLegLen = C.lowerLegLen || 13;
    C.breathSpeed = C.breathSpeed || 350; C.headY = C.headY || -10;

    let targetIsEnemy = target.includes('enemy');

    ctx.save();
    ctx.translate(x, y);

    // クラシックな敵の場合（シンプル図形）
    if (C.shape === 'circle' || C.shape === 'rect') {
        const bounceY = Math.sin(time / 200) * 3 * s;
        const groundY = 0;
        drawDotEllipse(ctx, 0, groundY + (C.size * 1.5) * s, (C.size * 1.5) * s, 4 * s, s, `rgba(0,0,0,${C.shadowAlpha})`);

        ctx.fillStyle = C.cBody || '#ef4444';
        ctx.globalAlpha = 1;
        if (C.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, -C.size * s + bounceY, C.size * s, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-C.size * s, -C.size * 2 * s + bounceY, C.size * 2 * s, C.size * 2 * s);
        }
        ctx.restore();
        return;
    }

    // プレイヤー／ボスのヒューマノイド描画ロジック
    let ap = 0;
    if (ad && ad.cooldown > 0 && ad.maxCD > 0) {
        ap = 1.0 - (ad.cooldown / ad.maxCD);
    }

    // エディタ向け: baseやweapon時は何もアクションさせない
    if (currentAction === 'base' || currentAction === 'weapon') {
        ap = 0;
        currentAction = 'idle';
    }

    let bounce = 0, breath = 0, torsoSquash = 0;
    let legFront = -0.3, legBack = 0.4, armFront = -0.9, armBack = 0.6;
    let kneeBend = null, kneeBendBack = null, elbowBendFront = null, elbowBendBack = null;
    let walkShiftX = 0; // 追加：踏み込み移動用

    const baseKneeBend = C.kneeAngle + 0.3;
    const uL = C.upperLegLen, lL = C.lowerLegLen;
    const baseFrontFootY = uL * Math.cos(-0.3) + lL * Math.cos(-0.3 + baseKneeBend);
    const baseBackFootY = uL * Math.cos(0.4) + lL * Math.cos(0.4 + baseKneeBend);

    const getBend = (dy, a) => { let cv = (dy - uL * Math.cos(a)) / lL; return Math.acos(Math.max(-1, Math.min(1, cv))) - a; };

    // --- 体/脚のモーション ---
    if (currentAction === 'idle') {
        const breathWave = Math.pow((Math.sin(time / C.breathSpeed) + 1) / 2, 2);
        torsoSquash = breathWave * 0.8 * 0.8 * s; bounce = breathWave * 0.8 * 1.5 * s;
        kneeBend = getBend(baseFrontFootY - bounce / s, legFront); kneeBendBack = getBend(baseBackFootY - bounce / s, legBack);
    }
    else if (currentAction === 'walk') {
        // 歩行モーション
        const walkSp = (C.motions && C.motions.walk) ? C.motions.walk.walkSpeed : 150;
        const wave = Math.sin((time / walkSp) * Math.PI * 2);
        legFront = -wave * 0.5; legBack = wave * 0.5;
        armFront = wave * 0.8; armBack = -wave * 0.8;
        bounce = Math.abs(wave) * 4 * s;
        kneeBend = C.kneeAngle; kneeBendBack = C.kneeAngle;
    }
    else if (currentAction === 'weak1' || currentAction === 'normal') {
        if (ap < 0.1) { legFront = -0.3; bounce = 0; torsoSquash = 0; }
        else if (ap < 0.3) { let t = (ap - 0.1) / 0.2; legFront = -0.3 - t * 0.2; bounce = t * s; torsoSquash = t * 0.5 * s; }
        else { let t = (ap - 0.3) / 0.7; legFront = -0.5 + t * 0.2; bounce = s - t * s; torsoSquash = 0.5 * s - t * 0.5 * s; }
        kneeBend = getBend(baseFrontFootY - (bounce / s), legFront); kneeBendBack = getBend(baseBackFootY - (bounce / s), legBack);
    }
    else if (currentAction === 'weak2') {
        if (ap < 0.1) { legFront = -0.3; bounce = 0; torsoSquash = 0; }
        else if (ap < 0.3) { let t = (ap - 0.1) / 0.2; legFront = -0.3 + t * 0.1; bounce = -t * s; torsoSquash = -t * s; }
        else { let t = (ap - 0.3) / 0.7; legFront = -0.2 - t * 0.1; bounce = -s + t * s; torsoSquash = -s + t * s; }
        kneeBend = getBend(baseFrontFootY - (bounce / s), legFront); kneeBendBack = getBend(baseBackFootY - (bounce / s), legBack);
    }
    else if (currentAction === 'weak3') {
        if (ap < 0.4) { let t = ap / 0.4; legFront = -0.2 + t * 0.1; bounce = -s - t * 2 * s; torsoSquash = -s - t * 2 * s; }
        else if (ap < 0.6) { let t = (ap - 0.4) / 0.2; legFront = -0.1 - t * 0.6; bounce = -3 * s + t * 6 * s; torsoSquash = -3 * s + t * 5 * s; }
        else { let t = (ap - 0.6) / 0.4; legFront = -0.7 + t * 0.4; bounce = 3 * s - t * 3 * s; torsoSquash = 2 * s - t * 2 * s; }
        kneeBend = getBend(baseFrontFootY - (bounce / s), legFront); kneeBendBack = getBend(baseBackFootY - (bounce / s), legBack);
    }
    else if (currentAction === 'thrust' || currentAction === 'pierce') {
        if (ap < 0.2) { let t = ap / 0.2; legFront = -0.5 + t * 0.2; bounce = s - t * s; torsoSquash = 0.5 * s; }
        else if (ap < 0.4) { let t = (ap - 0.2) / 0.2; legFront = -0.3 - t * 0.5; bounce = t * 1.5 * s; torsoSquash = 0.5 * s + t * s; }
        else { let t = (ap - 0.4) / 0.6; legFront = -0.8 + t * 0.5; bounce = 1.5 * s - t * 1.5 * s; torsoSquash = 1.5 * s - t * 1.5 * s; }
        kneeBend = getBend(baseFrontFootY - (bounce / s), legFront); kneeBendBack = getBend(baseBackFootY - (bounce / s), legBack);
    }
    else if (currentAction === 'grandcross' || currentAction === 'wide') {
        if (ap < 0.2) { let t = ap / 0.2; legFront = -0.2; bounce = t * 3 * s; torsoSquash = t * 2 * s; }
        else if (ap < 0.4) { legFront = -0.6; bounce = -2 * s; torsoSquash = -1 * s; }
        else if (ap < 0.6) { let t = (ap - 0.4) / 0.2; legFront = -0.4; bounce = -4 * s; torsoSquash = -4 * s; }
        else if (ap < 0.8) { legFront = -0.8; bounce = 4 * s; torsoSquash = 3 * s; }
        else { let t = (ap - 0.8) / 0.2; legFront = -0.8 + t * 0.5; bounce = 4 * s - t * 4 * s; torsoSquash = 3 * s - t * 3 * s; }
        kneeBend = getBend(baseFrontFootY - (bounce / s), legFront); kneeBendBack = getBend(baseBackFootY - (bounce / s), legBack);
    }
    else if (currentAction === 'strong' || currentAction === 'front-wide') {
        if (ap < 0.3) { let t = ap / 0.3; torsoSquash = t * 3 * s; bounce = t * 4 * s; legFront = -0.3 + t * 0.4; }
        else if (ap < 0.5) { let t = (ap - 0.3) / 0.2; torsoSquash = 3 * s - t * 5 * s; bounce = 4 * s - t * 6 * s; legFront = 0.1 - t * 0.8; }
        else { let t = (ap - 0.5) / 0.5; torsoSquash = -2 * s + t * 2 * s; bounce = -2 * s + t * 2 * s; legFront = -0.7 + t * 0.4; }
        kneeBend = getBend(baseFrontFootY - (bounce / s), legFront); kneeBendBack = getBend(baseBackFootY - (bounce / s), legBack);
    }

    if (currentAction !== 'idle' && currentAction !== 'walk') {
        if (ap >= 0.4 && ap < 0.6) {
            walkShiftX = Math.sin((ap - 0.4) * 5 * Math.PI) * 15 * s;
        }
    }

    // --- 腕（手前）と武器スケールのモーション ---
    let wpnScale = 1.0;

    if (currentAction === 'idle') {
        const breathWave = Math.pow((Math.sin(time / C.breathSpeed) + 1) / 2, 2);
        armFront = -0.4 + (breathWave * 0.05);
        elbowBendFront = -1.2;
        wpnScale = 0.9;
    } else if (currentAction !== 'walk') {
        if (currentAction === 'weak1' || currentAction === 'normal') {
            if (ap < 0.1) { let t = ap / 0.1; armFront = -0.4 - t * 1.1; elbowBendFront = -1.2 + t * 1.4; wpnScale = 0.9 + t * 0.2; }
            else if (ap < 0.3) { let t = (ap - 0.1) / 0.2; armFront = -1.5 + t * 2.1; elbowBendFront = 0.2 - t * 0.1; wpnScale = 1.1 + t * 0.2; }
            else { let t = (ap - 0.3) / 0.7; armFront = 0.6 - t * 1.2; elbowBendFront = 0.1 + t * 0.5; wpnScale = 1.3 - t * 0.4; }
        } else if (currentAction === 'weak2') {
            if (ap < 0.1) { let t = ap / 0.1; armFront = -0.6 + t * 1.2; elbowBendFront = -0.7 + t * 1.2; wpnScale = 0.9 + t * 0.3; }
            else if (ap < 0.3) { let t = (ap - 0.1) / 0.2; armFront = 0.6 - t * 2.4; elbowBendFront = 0.5 - t * 0.4; wpnScale = 1.2 - t * 0.7; }
            else { let t = (ap - 0.3) / 0.7; armFront = -1.8 + t * 0.4; elbowBendFront = 0.1 + t * 0.3; wpnScale = 0.5 - t * 0.1; }
        } else if (currentAction === 'weak3') {
            if (ap < 0.4) { let t = ap / 0.4; armFront = -1.4 - t * 0.6; elbowBendFront = 0.4 - t * 1.6; wpnScale = 0.4; }
            else if (ap < 0.6) { let t = (ap - 0.4) / 0.2; armFront = -2.0 + t * 3.4; elbowBendFront = -1.2 + t * 1.6; wpnScale = 0.4 + t * 1.2; }
            else { let t = (ap - 0.6) / 0.4; armFront = 1.4 - t * 0.2; elbowBendFront = 0.4 + t * 0.2; wpnScale = 1.6 - t * 0.2; }
        } else if (currentAction === 'thrust' || currentAction === 'pierce') {
            if (ap < 0.2) { let t = ap / 0.2; armFront = -0.4 + t * 0.4; elbowBendFront = -1.2 - t * 0.3; wpnScale = 0.9 - t * 0.1; }
            else if (ap < 0.4) { let t = (ap - 0.2) / 0.2; armFront = 0 - t * 1.57; elbowBendFront = -1.5 + t * 1.5; wpnScale = 0.8 + t * 0.4; }
            else { let t = (ap - 0.4) / 0.6; armFront = -1.57 + t * 1.17; elbowBendFront = 0 - t * 1.2; wpnScale = 1.2 - t * 0.3; }
        } else if (currentAction === 'grandcross' || currentAction === 'wide') {
            if (ap < 0.2) { let t = ap / 0.2; armFront = -0.4 + t * 1.9; elbowBendFront = -1.2 + t * 0.2; wpnScale = 1.0; }
            else if (ap < 0.4) { armFront = -1.6; elbowBendFront = 0.2; wpnScale = 1.1; }
            else if (ap < 0.6) { let t = (ap - 0.4) / 0.2; armFront = -1.6 - t * 1.0; elbowBendFront = 0.2 - t * 1.4; wpnScale = 1.0; }
            else if (ap < 0.8) { armFront = 0.8; elbowBendFront = 0.2; wpnScale = 1.3; }
            else { let t = (ap - 0.8) / 0.2; armFront = 0.8 - t * 1.2; elbowBendFront = 0.2 - t * 1.4; wpnScale = 1.3 - t * 0.4; }
        } else if (currentAction === 'strong' || currentAction === 'front-wide') {
            if (ap < 0.3) { let t = ap / 0.3; armFront = -0.4 + t * 1.9; elbowBendFront = -1.2 + t * 0.7; wpnScale = 1.0; }
            else if (ap < 0.5) { let t = (ap - 0.3) / 0.2; armFront = 1.5 - t * 3.7; elbowBendFront = -0.5 + t * 0.7; wpnScale = 1.1; }
            else { let t = (ap - 0.5) / 0.5; armFront = -2.2 + t * 1.8; elbowBendFront = 0.2 - t * 1.4; wpnScale = 1.1 - t * 0.2; }
        }
    }

    const wTform = getWristTransform(C.shoulderX * s, C.shoulderY * s + torsoSquash, armFront, elbowBendFront !== null ? elbowBendFront : C.elbowAngle, C.upperArmLen * s, C.lowerArmLen * s, s);
    const wpnA = wTform.angle - 0.2;
    const targetX = wTform.x - Math.sin(wpnA) * 6 * s * wpnScale, targetY = wTform.y + Math.cos(wpnA) * -6 * s * wpnScale;

    // 奥の腕のIK
    let ikResult = { a1: armBack, a2: C.elbowAngle };
    if (currentAction !== 'walk') {
        ikResult = solveArmIK(-C.shoulderX * s, C.shoulderY * s + torsoSquash, targetX, targetY, C.upperArmLen * s, C.lowerArmLen * s, true);
        armBack = ikResult.a1; elbowBendBack = ikResult.a2;
    }

    ctx.translate(walkShiftX, 0);

    // 影
    drawDotEllipse(ctx, 0, (C.hipY + baseFrontFootY) * s, 25 * s + (bounce * 0.5), 4 * s, s, `rgba(0,0,0,${C.shadowAlpha})`);

    // マスコット（AI）- プレイヤーのみ表示 (boss以外)
    if (target === 'player' && (!ad || !ad.facing || ad.facing === 1)) {
        ctx.save();
        const logosY = -40 * s + Math.sin(time / 400) * 5 * s; ctx.translate(-25 * s, logosY);
        drawBlock(ctx, -9 * s, -5 * s, 18 * s, 10 * s, '#94a3b8', s); drawBlock(ctx, -5 * s, -9 * s, 10 * s, 18 * s, '#94a3b8', s);
        drawBlock(ctx, -8 * s, -4 * s, 16 * s, 8 * s, '#f8fafc', s); drawBlock(ctx, -4 * s, -8 * s, 8 * s, 16 * s, '#f8fafc', s);
        ctx.fillStyle = '#0f172a'; ctx.fillRect(-5 * s, -4 * s, 10 * s, 8 * s);
        ctx.fillStyle = '#10b981';
        if (currentAction === 'strong' || currentAction === 'weak3' || currentAction === 'grandcross' || currentAction === 'thrust' || currentAction === 'front-wide' || currentAction === 'pierce') {
            ctx.fillRect(-3 * s, -1 * s, s, s); ctx.fillRect(-2 * s, 0, s, s); ctx.fillRect(-1 * s, 1 * s, s, s);
            ctx.fillRect(2 * s, -1 * s, s, s); ctx.fillRect(1 * s, 0, s, s); ctx.fillRect(0, 1 * s, s, s);
        } else {
            ctx.fillRect(-3 * s, 0, 2 * s, 2 * s); ctx.fillRect(1 * s, 0, 2 * s, 2 * s);
        }
        ctx.restore();
    }

    ctx.save(); ctx.translate(0, bounce + breath);

    const isWeaponBehind = wpnScale < 0.85;

    // 1. 奥の足
    _drawLimb(ctx, -C.hipX * s, C.hipY * s, legBack, false, true, C, kneeBendBack !== null ? kneeBendBack : C.kneeAngle);

    // ★ 武器(奥レイヤー)
    const flipBlade = (currentAction === 'weak2' || currentAction === 'strong' || currentAction === 'front-wide');
    if (isWeaponBehind && !targetIsEnemy)
        _drawWeapon(ctx, wTform.x, wTform.y, wpnA, wpnScale, flipBlade, C, wpnCfg);

    // 2. 胴体
    ctx.save();
    if (currentAction === 'idle') ctx.rotate(0.15);
    if (currentAction === 'strong' || currentAction === 'weak3' || currentAction === 'grandcross' || currentAction === 'wide' || currentAction === 'front-wide') ctx.rotate(0.2 - (ap * 0.3));
    else if (currentAction === 'thrust' || currentAction === 'pierce') ctx.rotate(0.4 - (ap * 0.6));
    const tx = -C.torsoW / 2 * s, ty = -C.torsoH / 2 * s + torsoSquash, tw = C.torsoW * s, th = C.torsoH * s - torsoSquash;
    const halfTw = tw * 0.85;
    drawChamferedBlock(ctx, -halfTw / 2, ty, halfTw, th, C.cBody, s);
    drawBlock(ctx, -halfTw / 2, ty, halfTw, th * 0.5, '#475569', s);
    if (target !== 'boss') {
        ctx.fillStyle = C.cArmorAcc; ctx.fillRect(-halfTw / 2 + 2 * s, ty + th * 0.3, halfTw - 4 * s, 1.5 * s);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, ty + th * 0.6, s, th * 0.3); ctx.fillRect(halfTw / 2, ty + th * 0.6, s, th * 0.3);
        ctx.fillRect(0, ty + th * 0.6, halfTw / 2 + s, s); ctx.fillRect(0, ty + th * 0.9, halfTw / 2 + s, s);
    }
    ctx.restore();

    // 3. 頭部
    ctx.save();
    ctx.translate(0, ty);
    if (currentAction === 'idle') ctx.rotate(-0.1);
    const hx = -C.headW / 2 * s, hy = -C.headH * s, hw = C.headW * s, hh = C.headH * s;
    drawChamferedBlock(ctx, hx, hy, hw, hh, C.cSkin, s);
    if (target !== 'boss') {
        drawBlock(ctx, hx - 1 * s, hy - 2 * s, hw + 2 * s, hh * 0.4, C.cHair, s);
        drawBlock(ctx, hx - 1 * s, hy - 1 * s, 5 * s, hh, C.cHair, s);
        for (let i = 0; i < 8; i++) drawBlock(ctx, hx + hw * 0.2 + i * s, hy - 2 * s + i * 1.2 * s, 3 * s, 3 * s, C.cHair, s);
    }
    ctx.fillStyle = '#ffffff'; ctx.fillRect(hx + hw * 0.7, hy + hh * 0.4, 3 * s, 3 * s); ctx.fillStyle = C.cEye; ctx.fillRect(hx + hw * 0.8, hy + hh * 0.4, 1.5 * s, 3 * s);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(hx + hw * 0.4, hy + hh * 0.4, 2 * s, 3 * s); ctx.fillStyle = C.cEye; ctx.fillRect(hx + hw * 0.5, hy + hh * 0.4, s, 3 * s);
    ctx.restore();

    // 4. 奥の腕
    _drawLimb(ctx, -C.shoulderX * s, C.shoulderY * s + torsoSquash, armBack, true, true, C, elbowBendBack);

    // 5. 手前の足と腕
    _drawLimb(ctx, C.hipX * s, C.hipY * s, legFront, false, false, C, kneeBend !== null ? kneeBend : C.kneeAngle);
    _drawLimb(ctx, C.shoulderX * s, C.shoulderY * s + torsoSquash, armFront, true, false, C, elbowBendFront !== null ? elbowBendFront : C.elbowAngle);

    // ★ 武器(手前レイヤー)
    if (!isWeaponBehind && !targetIsEnemy)
        _drawWeapon(ctx, wTform.x, wTform.y, wpnA, wpnScale, flipBlade, C, wpnCfg);

    // --- ★ 斬撃エフェクトの描画 ---
    if (!targetIsEnemy && target !== 'boss') {
        ctx.save();
        if ((currentAction === 'weak1' || currentAction === 'normal') && ap >= 0.1 && ap <= 0.4) {
            let effectT = (ap - 0.1) / 0.3; ctx.translate(15 * s, -5 * s); ctx.rotate(-Math.PI * 0.1);
            ctx.scale(wpnScale, wpnScale); ctx.globalAlpha = 1.0 - effectT;
            drawDotArc(ctx, 0, 0, 45 * s, -Math.PI / 2, Math.PI / 3, 4 * s, '#ffffff', s);
        }
        else if (currentAction === 'weak2' && ap >= 0.1 && ap <= 0.4) {
            let effectT = (ap - 0.1) / 0.3; ctx.translate(20 * s, 5 * s); ctx.rotate(Math.PI * 0.1);
            ctx.scale(wpnScale, wpnScale); ctx.globalAlpha = 1.0 - effectT;
            drawDotArc(ctx, 0, 0, 50 * s, Math.PI / 2, -Math.PI / 3, 4 * s, '#ffffff', s);
        }
        else if (currentAction === 'weak3' && ap >= 0.4 && ap <= 0.7) {
            let effectT = (ap - 0.4) / 0.3; ctx.translate(25 * s, 0); ctx.rotate(Math.PI * 0.15);
            ctx.scale(wpnScale, wpnScale); ctx.globalAlpha = 1.0 - effectT;
            drawDotArc(ctx, 0, 0, 60 * s, -Math.PI * 0.8, Math.PI / 2, 8 * s, '#fbbf24', s);
        }
        else if ((currentAction === 'thrust' || currentAction === 'pierce') && ap >= 0.2 && ap <= 0.6) {
            let effectT = (ap - 0.2) / 0.4; ctx.translate(30 * s, -10 * s);
            ctx.scale(wpnScale, wpnScale); ctx.globalAlpha = 1.0 - effectT;
            let prog = Math.min(1, effectT * 4);
            let len = 120 * s;
            ctx.fillStyle = '#3b82f6'; ctx.fillRect(0, -6 * s, len * prog, 12 * s);
            ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0, -8 * s, len * prog * 0.9, 2 * s); ctx.fillRect(0, 6 * s, len * prog * 0.9, 2 * s);
            ctx.fillStyle = '#93c5fd'; ctx.fillRect(0, -3 * s, len * prog * 1.05, 6 * s);
            ctx.fillStyle = '#ffffff'; ctx.fillRect(0, -1 * s, len * prog * 1.1, 2 * s);
            ctx.fillStyle = '#60a5fa';
            ctx.fillRect(15 * s, -16 * s, 40 * s * prog, 2 * s); ctx.fillRect(5 * s, 14 * s, 45 * s * prog, 2 * s);
            ctx.fillRect(25 * s, -10 * s, 30 * s * prog, 2 * s); ctx.fillRect(20 * s, 10 * s, 35 * s * prog, 2 * s);
        }
        else if (currentAction === 'grandcross' || currentAction === 'wide') {
            if (ap >= 0.2 && ap <= 0.7) {
                let effectT1 = (ap - 0.2) / 0.5; ctx.save();
                ctx.translate(20 * s, -5 * s); ctx.globalAlpha = 1.0 - effectT1;
                let w = 110 * s, currentW = w * Math.min(1, effectT1 * 5);
                ctx.fillStyle = '#d946ef'; ctx.fillRect(-40 * s, -4 * s, currentW, 8 * s);
                ctx.fillStyle = '#ffffff'; ctx.fillRect(-40 * s, -1.5 * s, currentW, 3 * s);
                ctx.restore();
            }
            if (ap >= 0.6 && ap <= 1.0) {
                let effectT2 = (ap - 0.6) / 0.4; ctx.save();
                ctx.translate(25 * s, -5 * s); ctx.globalAlpha = 1.0 - effectT2;
                let h = 120 * s, currentH = h * Math.min(1, effectT2 * 5);
                ctx.fillStyle = '#8b5cf6'; ctx.fillRect(-4 * s, -65 * s, 8 * s, currentH);
                ctx.fillStyle = '#ffffff'; ctx.fillRect(-1.5 * s, -65 * s, 3 * s, currentH);
                ctx.restore();
            }
        }
        else if ((currentAction === 'strong' || currentAction === 'front-wide') && ap >= 0.3 && ap <= 0.7) {
            let effectT = (ap - 0.3) / 0.4; ctx.translate(20 * s, 5 * s);
            ctx.globalAlpha = 1.0 - effectT;
            drawDotArc(ctx, 0, 0, 55 * s, Math.PI * 0.7, -Math.PI * 0.3, 14 * s, '#ef4444', s);
        }
        ctx.restore();
    }

    ctx.restore(); ctx.restore();
}

window.characterRenderer = { adjustColor, drawBlock, drawChamferedBlock, drawDotEllipse, drawDotArc, getWristTransform, solveArmIK, _drawLimb, _drawWeapon, drawEntity };

// Touch to bust cache
