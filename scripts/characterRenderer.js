(function () {
    function adjustColor(hex, amt) {
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

    function solveArmIK(startX, startY, targetX, targetY, len1, len2, isBack) {
        const dx = targetX - startX, dy = targetY - startY, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= len1 + len2) return { a1: Math.atan2(dy, dx) - Math.PI / 2, a2: 0 };
        const a2 = Math.acos(Math.max(-1, Math.min(1, (dist * dist - len1 * len1 - len2 * len2) / (2 * len1 * len2)))) * (isBack ? -1 : 1);
        return { a1: Math.atan2(dy, dx) - Math.atan2(len2 * Math.sin(a2), len1 + len2 * Math.cos(a2)) - Math.PI / 2, a2: a2 };
    }

    function getWristTransform(x, y, angle1, angle2, uLen, lLen, s) {
        const elbowX = x - Math.sin(angle1) * uLen, elbowY = y + Math.cos(angle1) * uLen;
        const absAngle2 = angle1 + angle2;
        return { x: elbowX - Math.sin(absAngle2) * (lLen - 2 * s), y: elbowY + Math.cos(absAngle2) * (lLen - 2 * s), angle: absAngle2 };
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
            if (rw >= 2 * s) { ctx.fillStyle = '#94a3b8'; ctx.fillRect(rx, ry, s, s); ctx.fillStyle = '#ffffff'; ctx.fillRect(rx + rw - s, ry, s, s); }
        }
        ctx.restore();
    }

    const ANIMATION_DATA = {
        'weak1': [
            { progress: 0.0, poseParams: { armRight: -0.4, elbowBendRight: -1.2, torsoRotation: 0, walkShiftX: 0 } },
            { progress: 0.2, poseParams: { armRight: -1.9, elbowBendRight: -0.2, torsoRotation: -0.2, walkShiftX: 0 } },
            { progress: 0.5, poseParams: { armRight: 0.6, elbowBendRight: -0.2, torsoRotation: 0.3, walkShiftX: 10 } },
            { progress: 1.0, poseParams: { armRight: -0.4, elbowBendRight: -1.2, torsoRotation: 0.15, walkShiftX: 0 } }
        ],
        'weak2': [
            { progress: 0.0, poseParams: { armRight: 0.6, elbowBendRight: 0.5, torsoRotation: 0.3, walkShiftX: 0 } },
            { progress: 0.2, poseParams: { armRight: 0.6, elbowBendRight: 0.5, torsoRotation: 0.3, walkShiftX: 0 } },
            { progress: 0.5, poseParams: { armRight: -1.9, elbowBendRight: 0.1, torsoRotation: -0.3, walkShiftX: 15 } },
            { progress: 1.0, poseParams: { armRight: -0.4, elbowBendRight: -1.2, torsoRotation: 0.15, walkShiftX: 0 } }
        ],
        'weak3': [
            { progress: 0.0, poseParams: { armRight: -0.4, elbowBendRight: -1.2, bounce: 0, torsoRotation: 0, walkShiftX: 0 } },
            { progress: 0.4, poseParams: { armRight: -2.9, elbowBendRight: 0.3, bounce: 5, torsoRotation: -0.4, walkShiftX: 0 } },
            { progress: 0.6, poseParams: { armRight: 1.6, elbowBendRight: 0.3, bounce: -3, torsoRotation: 0.4, walkShiftX: 25 } },
            { progress: 1.0, poseParams: { armRight: -0.4, elbowBendRight: -1.2, bounce: 0, torsoRotation: 0, walkShiftX: 0 } }
        ],
        'pierce': [
            { progress: 0.0, poseParams: { armRight: -0.2, elbowBendRight: -1.5, walkShiftX: 0, torsoRotation: -0.1 } },
            { progress: 0.3, poseParams: { armRight: -0.2, elbowBendRight: -1.5, walkShiftX: -5, torsoRotation: -0.1 } },
            { progress: 0.5, poseParams: { armRight: -1.57, elbowBendRight: 0, walkShiftX: 35, torsoRotation: 0.2 } },
            { progress: 1.0, poseParams: { armRight: -0.4, elbowBendRight: -1.2, walkShiftX: 0, torsoRotation: 0 } }
        ],
        'wide': [
            { progress: 0.0, poseParams: { armRight: -1.5, elbowBendRight: 0.2, torsoRotation: -0.3 } },
            { progress: 0.5, poseParams: { armRight: 1.5, elbowBendRight: 0.2, torsoRotation: 0.3 } },
            { progress: 1.0, poseParams: { armRight: -1.5, elbowBendRight: 0.5, torsoRotation: -0.3 } }
        ],
        'strong': [
            { progress: 0.0, poseParams: { armRight: 1.0, elbowBendRight: -0.5, torsoRotation: 0.5, bounce: 0, walkShiftX: 0 } },
            { progress: 0.3, poseParams: { armRight: 1.0, elbowBendRight: -0.5, torsoRotation: 0.5, bounce: 3, walkShiftX: 0 }, easing: 'step' },
            { progress: 0.6, poseParams: { armRight: -3.0, elbowBendRight: -0.5, torsoRotation: -0.5, bounce: -2, walkShiftX: 20 } },
            { progress: 1.0, poseParams: { armRight: -0.4, elbowBendRight: -1.2, torsoRotation: 0.15, bounce: 0, walkShiftX: 0 } }
        ]
    };
    window.ANIMATION_DATA = ANIMATION_DATA;

    function mergeParams(base, p, scale) {
        const res = Object.assign({}, base);
        for (const k in p) {
            let val = p[k];
            if (k === 'bounce' || k === 'walkShiftX') val *= scale;
            res[k] = val;
        }
        return res;
    }

    function mixPose(base, p1, p2, t, scale) {
        const res = Object.assign({}, base);
        const allKeys = new Set([...Object.keys(p1), ...Object.keys(p2)]);
        for (const k of allKeys) {
            const v1 = p1[k] !== undefined ? p1[k] : base[k] || 0;
            const v2 = p2[k] !== undefined ? p2[k] : base[k] || 0;
            let val = v1 + (v2 - v1) * t;
            if (k === 'bounce' || k === 'walkShiftX') val *= scale;
            res[k] = val;
        }
        return res;
    }

    function interpolateKeys(frames, progress, basePose, scale) {
        if (!frames || frames.length === 0) return basePose;
        if (progress <= frames[0].progress) return mergeParams(basePose, frames[0].poseParams, scale);
        if (progress >= frames[frames.length - 1].progress) return mergeParams(basePose, frames[frames.length - 1].poseParams, scale);

        for (let i = 0; i < frames.length - 1; i++) {
            const p1 = frames[i];
            const p2 = frames[i + 1];
            if (progress >= p1.progress && progress < p2.progress) {
                if (p1.easing === 'step') return mergeParams(basePose, p1.poseParams, scale);
                const t = (progress - p1.progress) / (p2.progress - p1.progress);
                return mixPose(basePose, p1.poseParams, p2.poseParams, t, scale);
            }
        }
        return basePose;
    }

    window.calculatePose = function (config, action, time, attackCooldown, maxCD, x, y, facing) {
        if (!config || !config.scale) config = window.CHARACTER_CONFIGS?.player || { scale: 1.5, upperLegLen: 12, lowerLegLen: 12, kneeAngle: 0.2, shoulderX: 10, shoulderY: -10, upperArmLen: 10, lowerArmLen: 10, elbowAngle: 0.5, hipX: 5, hipY: 10 };
        const s = config.scale || 1.5;
        let ap = 0;
        if (attackCooldown > 0 && maxCD > 0) {
            ap = 1.0 - (attackCooldown / maxCD);
            ap = Math.max(0, Math.min(1, ap)); // 0.0 ~ 1.0 にクランプ
        }

        const pose = {
            x, y, facing,
            bounce: 0, breath: 0, torsoSquash: 0, torsoRotation: 0, headRotation: 0,
            armRight: -0.4, elbowBendRight: -1.2,
            armLeft: 0.6, elbowBendLeft: config.elbowAngle,
            legRight: -0.3, kneeBendRight: config.kneeAngle,
            legLeft: 0.4, kneeBendLeft: config.kneeAngle,
            wpnScale: 1.0, wpnRotation: 0, walkShiftX: 0,
            attackType: attackCooldown > 0 ? action : undefined,
            attackProgress: ap
        };

        const uL = config.upperLegLen, lL = config.lowerLegLen;
        const baseFrontFootY = uL * Math.cos(-0.3) + lL * Math.cos(-0.3 + config.kneeAngle + 0.3);
        const baseBackFootY = uL * Math.cos(0.4) + lL * Math.cos(0.4 + config.kneeAngle + 0.3);
        const getBend = (dy, a) => { let cv = (dy - uL * Math.cos(a)) / lL; return Math.acos(Math.max(-1, Math.min(1, cv))) - a; };

        if (attackCooldown > 0 && maxCD > 0) {
            ap = 1.0 - (attackCooldown / maxCD);
        } else {
            // ゲーム中、待機・歩行の場合は time から進行度を計算（ループ用）
            if (action === 'idle') ap = (time % 700) / 700;
            else if (action === 'walk') ap = (time % 800) / 800;
        }
        pose.attackProgress = Math.max(0, Math.min(1, ap));

        // --- モーションデータの適用 ---
        let animName = action;
        if (action === 'normal') animName = 'weak1';
        else if (action === 'front-wide') animName = 'strong';
        else if (action === 'thrust') animName = 'pierce';
        else if (action === 'grandcross') animName = 'wide';

        const frames = (window.ANIMATION_DATA ? window.ANIMATION_DATA[animName] : null) || (window.DEFAULT_ANIMATIONS ? window.DEFAULT_ANIMATIONS[animName] : null);
        if (frames) {
            const interpolated = interpolateKeys(frames, pose.attackProgress, pose, s);
            Object.assign(pose, interpolated);
        }

        // 共通の足の屈伸計算 (浮き上がり防止)
        if (action !== 'walk') {
            pose.kneeBendRight = getBend(baseFrontFootY - (pose.bounce / s), pose.legRight);
            pose.kneeBendLeft = getBend(baseBackFootY - (pose.bounce / s), pose.legLeft);
        }

        // 武器の回転計算 (腕の角度に追従)
        const wTform = getWristTransform(config.shoulderX * s, config.shoulderY * s + pose.torsoSquash, pose.armRight, pose.elbowBendRight, config.upperArmLen * s, config.lowerArmLen * s, s);
        pose.wpnRotation = wTform.angle - 0.2;

        // IK for back arm (武器を持つ動き)
        if (action !== 'walk') {
            const targetX = wTform.x - Math.sin(pose.wpnRotation) * 6 * s * pose.wpnScale, targetY = wTform.y + Math.cos(pose.wpnRotation) * -6 * s * pose.wpnScale;
            const ik = solveArmIK(-config.shoulderX * s, config.shoulderY * s + pose.torsoSquash, targetX, targetY, config.upperArmLen * s, config.lowerArmLen * s, true);
            pose.armLeft = ik.a1; pose.elbowBendLeft = ik.a2;
        }

        return pose;
    };

    window.drawCharacter = function (ctx, pose, config) {
        if (!config || !config.cBody) {
            config = window.CHARACTER_CONFIGS?.player || { shape: 'circle', size: 12, cBody: '#ef4444', scale: 1.0 };
        }
        const C = config; const s = C.scale || 1.5;
        const wpnCfg = C.motions?.weapon || { armLen: 18, armW: 6, tipSize: 6, cGrip: '#1e293b', cBlade: '#f8fafc' };

        ctx.save(); ctx.translate(pose.x, pose.y); if (pose.facing === -1) ctx.scale(-1, 1);

        if (C.shape === 'circle' || C.shape === 'rect') {
            const bounceY = pose.bounce;
            drawDotEllipse(ctx, 0, (C.size * 1.5) * s, (C.size * 1.5) * s, 4 * s, s, `rgba(0,0,0,0.3)`);
            ctx.fillStyle = C.cBody || '#ef4444';
            if (C.shape === 'circle') { ctx.beginPath(); ctx.arc(0, -C.size * s + bounceY, C.size * s, 0, Math.PI * 2); ctx.fill(); }
            else { ctx.fillRect(-C.size * s, -C.size * 2 * s + bounceY, C.size * 2 * s, C.size * 2 * s); }
            ctx.restore(); return;
        }

        const { bounce, breath, torsoSquash, torsoRotation, headRotation, armRight, elbowBendRight, armLeft, elbowBendLeft, legRight, kneeBendRight, legLeft, kneeBendLeft, wpnScale, wpnRotation, walkShiftX } = pose;
        ctx.translate(walkShiftX, 0);

        const baseFrontFootY = C.upperLegLen * Math.cos(-0.3) + C.lowerLegLen * Math.cos(-0.3 + C.kneeAngle + 0.3);
        drawDotEllipse(ctx, 0, (C.hipY + baseFrontFootY) * s, 25 * s + (bounce * 0.5), 4 * s, s, `rgba(0,0,0,0.3)`);

        // AI Mascot
        if (C.cBody === '#334155' || C.cBody === '#3b82f6') {
            ctx.save(); const logosY = -40 * s + Math.sin(Date.now() / 400) * 5 * s; ctx.translate(-25 * s, logosY);
            drawBlock(ctx, -9 * s, -5 * s, 18 * s, 10 * s, '#94a3b8', s); drawBlock(ctx, -5 * s, -9 * s, 10 * s, 18 * s, '#94a3b8', s);
            drawBlock(ctx, -8 * s, -4 * s, 16 * s, 8 * s, '#f8fafc', s); drawBlock(ctx, -4 * s, -8 * s, 8 * s, 16 * s, '#f8fafc', s);
            ctx.fillStyle = '#0f172a'; ctx.fillRect(-5 * s, -4 * s, 10 * s, 8 * s); ctx.fillStyle = '#10b981';
            if (pose.attackType) { ctx.fillRect(-3 * s, -1 * s, s, s); ctx.fillRect(-2 * s, 0, s, s); ctx.fillRect(-1 * s, 1 * s, s, s); ctx.fillRect(2 * s, -1 * s, s, s); ctx.fillRect(1 * s, 0, s, s); ctx.fillRect(0, 1 * s, s, s); }
            else { ctx.fillRect(-3 * s, 0, 2 * s, 2 * s); ctx.fillRect(1 * s, 0, 2 * s, 2 * s); }
            ctx.restore();
        }

        ctx.save(); ctx.translate(0, bounce + breath);
        const tw = C.torsoW * s, th = C.torsoH * s - torsoSquash;
        const ty = -th / 2;

        const drawLegBack = () => { _drawLimb(ctx, C.hipX * s, C.hipY * s, legLeft, false, true, C, kneeBendLeft); };
        const drawLegFront = () => { _drawLimb(ctx, -C.hipX * s, C.hipY * s, legRight, false, false, C, kneeBendRight); };
        const drawArmBack = () => { _drawLimb(ctx, C.shoulderX * s, C.shoulderY * s + torsoSquash, armLeft, true, true, C, elbowBendLeft); };
        const drawArmFront = () => { _drawLimb(ctx, -C.shoulderX * s, C.shoulderY * s + torsoSquash, armRight, true, false, C, elbowBendRight); };

        const drawBodyAndHead = () => {
            ctx.save(); ctx.rotate(torsoRotation);
            drawChamferedBlock(ctx, -tw / 2, ty, tw, th, C.cBody, s);
            drawBlock(ctx, -tw / 2, ty, tw, th * 0.5, '#475569', s);
            if (C.cArmorAcc) { ctx.fillStyle = C.cArmorAcc; ctx.fillRect(-tw / 2 + 2 * s, ty + th * 0.3, tw - 4 * s, 1.5 * s); }
            ctx.restore();

            ctx.save();
            ctx.translate(0, ty + (C.headY || 0) * s + 4 * s);
            ctx.rotate(headRotation);
            const hx = -C.headW / 2 * s, hy = -C.headH * s, hw = C.headW * s, hh = C.headH * s;
            drawChamferedBlock(ctx, hx, hy, hw, hh, C.cSkin || '#ffdfc4', s);

            if (C.cHair) {
                ctx.fillStyle = C.cHair;
                // 頭頂部 (丸みを帯びた形状)
                ctx.beginPath();
                ctx.moveTo(hx - 2 * s, hy - 1 * s);
                ctx.quadraticCurveTo(hx + hw / 2, hy - 7 * s, hx + hw + 2 * s, hy - 1 * s);
                ctx.fill();

                ctx.fillStyle = 'rgba(0,0,0,0.1)';
                ctx.fillRect(hx - 2 * s, hy - 1 * s, hw + 4 * s, 1.5 * s);
                ctx.fillStyle = C.cHair;

                // 背中の髪
                ctx.fillRect(hx - 4 * s, hy + s, 7 * s, hh + 16 * s);
                ctx.fillStyle = 'rgba(0,0,0,0.15)';
                ctx.fillRect(hx - 4 * s, hy + s, 3 * s, hh + 16 * s);
                ctx.fillStyle = C.cHair;
                ctx.fillRect(hx - 6 * s, hy + 6 * s, 4 * s, hh + 6 * s);

                // ギザギザ前髪
                const bx = hx + hw * 0.2;
                const bw = hw * 0.8 + 2 * s;
                ctx.fillRect(bx, hy - 2 * s, bw, 3 * s);
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    const tx = bx + (i * bw / 4);
                    ctx.moveTo(tx, hy + s);
                    ctx.lineTo(tx + bw / 8, hy + 4 * s);
                    ctx.lineTo(tx + bw / 4, hy + s);
                    ctx.fill();
                }

                ctx.fillStyle = 'rgba(0,0,0,0.1)';
                ctx.fillRect(bx, hy + 1 * s, bw, 1 * s);
                ctx.fillStyle = C.cHair;

                // サイド
                ctx.fillRect(hx - s, hy + 4 * s, 4 * s, hh + 2 * s);
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(hx - s, hy + hh + 2 * s, 4 * s, 4 * s);
            }
            const eyeCol = C.cEye || '#38bdf8';
            ctx.fillStyle = '#ffffff'; ctx.fillRect(hx + hw * 0.65, hy + hh * 0.4, 3 * s, 3 * s); ctx.fillStyle = eyeCol; ctx.fillRect(hx + hw * 0.75, hy + hh * 0.4, 1.5 * s, 3 * s);
            ctx.fillStyle = '#ffffff'; ctx.fillRect(hx + hw * 0.25, hy + hh * 0.4, 3 * s, 3 * s); ctx.fillStyle = eyeCol; ctx.fillRect(hx + hw * 0.35, hy + hh * 0.4, 1.5 * s, 3 * s);
            ctx.restore();
        };

        const drawWeapon = () => {
            const wT = getWristTransform(C.shoulderX * s, C.shoulderY * s + torsoSquash, armRight, elbowBendRight, C.upperArmLen * s, C.lowerArmLen * s, s);
            const flipBlade = (pose.attackType === 'weak2' || pose.attackType === 'strong' || pose.attackType === 'front-wide');
            _drawWeapon(ctx, wT.x, wT.y, wpnRotation, wpnScale, flipBlade, C, wpnCfg);
        };

        const drawOrder = [
            { z: pose.z_legLeft !== undefined ? pose.z_legLeft : 10, draw: drawLegBack },
            { z: pose.z_armLeft !== undefined ? pose.z_armLeft : 15, draw: drawArmBack },
            { z: pose.z_body !== undefined ? pose.z_body : 20, draw: drawBodyAndHead },
            { z: pose.z_legRight !== undefined ? pose.z_legRight : 40, draw: drawLegFront },
            { z: pose.z_armRight !== undefined ? pose.z_armRight : 50, draw: drawArmFront },
            { z: pose.z_weapon !== undefined ? pose.z_weapon : (wpnScale < 0.85 ? 5 : 60), draw: drawWeapon },
        ];

        drawOrder.sort((a, b) => a.z - b.z);
        for (const part of drawOrder) {
            part.draw();
        }

        // --- Effects ---
        if (pose.attackType && pose.attackProgress !== undefined) {
            const ap = pose.attackProgress;
            ctx.save();
            if ((pose.attackType === 'weak1' || pose.attackType === 'normal') && ap >= 0.1 && ap <= 0.4) {
                let effectT = (ap - 0.1) / 0.3; ctx.translate(15 * s, -5 * s); ctx.rotate(-Math.PI * 0.1); ctx.globalAlpha = 1.0 - effectT;
                let prog = Math.min(1, effectT * 4);
                const startA = -Math.PI / 2, totalA = Math.PI / 3 - startA;
                drawDotArc(ctx, 0, 0, 45 * s, startA, startA + totalA * prog, 8 * s, '#38bdf8', s);
                drawDotArc(ctx, 0, 0, 45 * s, startA, startA + totalA * prog * 1.05, 4 * s, '#bae6fd', s);
                drawDotArc(ctx, 0, 0, 45 * s, startA, startA + totalA * prog * 1.1, 2 * s, '#ffffff', s);
            }
            else if (pose.attackType === 'weak2' && ap >= 0.1 && ap <= 0.4) {
                let effectT = (ap - 0.1) / 0.3; ctx.translate(20 * s, 5 * s); ctx.rotate(Math.PI * 0.1); ctx.globalAlpha = 1.0 - effectT;
                let prog = Math.min(1, effectT * 4);
                const startA = Math.PI / 2, totalA = -Math.PI / 3 - startA;
                drawDotArc(ctx, 0, 0, 50 * s, startA, startA + totalA * prog, 8 * s, '#38bdf8', s);
                drawDotArc(ctx, 0, 0, 50 * s, startA, startA + totalA * prog * 1.05, 4 * s, '#bae6fd', s);
                drawDotArc(ctx, 0, 0, 50 * s, startA, startA + totalA * prog * 1.1, 2 * s, '#ffffff', s);
            }
            else if (pose.attackType === 'weak3' && ap >= 0.4 && ap <= 0.7) {
                let effectT = (ap - 0.4) / 0.3; ctx.translate(25 * s, 0); ctx.rotate(Math.PI * 0.15); ctx.globalAlpha = 1.0 - effectT;
                let prog = Math.min(1, effectT * 4);
                const startA = -Math.PI * 0.8, totalA = Math.PI / 2 - startA;
                drawDotArc(ctx, 0, 0, 60 * s, startA, startA + totalA * prog, 12 * s, '#fbbf24', s);
                drawDotArc(ctx, 0, 0, 60 * s, startA, startA + totalA * prog * 1.05, 6 * s, '#fde68a', s);
                drawDotArc(ctx, 0, 0, 60 * s, startA, startA + totalA * prog * 1.1, 3 * s, '#ffffff', s);
            }
            else if ((pose.attackType === 'thrust' || pose.attackType === 'pierce') && ap >= 0.2 && ap <= 0.6) {
                let effectT = (ap - 0.2) / 0.4; ctx.translate(30 * s, -10 * s); ctx.globalAlpha = 1.0 - effectT;
                let prog = Math.min(1, effectT * 4), len = 120 * s;
                ctx.fillStyle = '#3b82f6'; ctx.fillRect(0, -6 * s, len * prog, 12 * s);
                ctx.fillStyle = '#93c5fd'; ctx.fillRect(0, -3 * s, len * prog * 1.05, 6 * s);
                ctx.fillStyle = '#ffffff'; ctx.fillRect(0, -1 * s, len * prog * 1.1, 2 * s);
            }
            else if (pose.attackType === 'grandcross' || pose.attackType === 'wide') {
                if (ap >= 0.2 && ap <= 0.7) {
                    let et1 = (ap - 0.2) / 0.5; ctx.save(); ctx.translate(20 * s, -5 * s); ctx.globalAlpha = 1.0 - et1;
                    let w = 110 * s, curW = w * Math.min(1, et1 * 5);
                    ctx.fillStyle = '#d946ef'; ctx.fillRect(-40 * s, -4 * s, curW, 8 * s);
                    ctx.fillStyle = '#ffffff'; ctx.fillRect(-40 * s, -1.5 * s, curW, 3 * s); ctx.restore();
                }
                if (ap >= 0.6 && ap <= 1.0) {
                    let et2 = (ap - 0.6) / 0.4; ctx.save(); ctx.translate(25 * s, -5 * s); ctx.globalAlpha = 1.0 - et2;
                    let h = 120 * s, curH = h * Math.min(1, et2 * 5);
                    ctx.fillStyle = '#8b5cf6'; ctx.fillRect(-4 * s, -65 * s, 8 * s, curH);
                    ctx.fillStyle = '#ffffff'; ctx.fillRect(-1.5 * s, -65 * s, 3 * s, curH); ctx.restore();
                }
            }
            else if ((pose.attackType === 'strong' || pose.attackType === 'front-wide') && ap >= 0.3 && ap <= 0.7) {
                let effectT = (ap - 0.3) / 0.4; ctx.translate(20 * s, 5 * s); ctx.globalAlpha = 1.0 - effectT;
                let prog = Math.min(1, effectT * 4);
                const startA = Math.PI * 0.7, totalA = -Math.PI * 0.3 - startA;
                drawDotArc(ctx, 0, 0, 55 * s, startA, startA + totalA * prog, 20 * s, '#ef4444', s);
                drawDotArc(ctx, 0, 0, 55 * s, startA, startA + totalA * prog * 1.05, 10 * s, '#fca5a5', s);
                drawDotArc(ctx, 0, 0, 55 * s, startA, startA + totalA * prog * 1.1, 5 * s, '#ffffff', s);
            }
            ctx.restore();
        }
        ctx.restore(); ctx.restore();
    };

    window.drawEntity = function (ctx, x, y, type, action, time, ad, configs) {
        const latestConfigs = window.CHARACTER_CONFIGS || configs || {};
        const config = latestConfigs[type];
        const pose = window.calculatePose(config, action, time, ad?.cooldown || 0, ad?.maxCD || 0, x, y, ad?.facing || 1);
        window.drawCharacter(ctx, pose, config);
    };
})();
