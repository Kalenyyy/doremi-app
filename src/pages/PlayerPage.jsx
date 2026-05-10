import { useEffect } from "react";
import AngklungIllustration from "../components/AngklungIllustration";
import { NOTES } from "../constants/notes";

const GESTURE_ICONS = { G2: "↑", C3: "→", E3: "↓" };
const GESTURE_SUB = { G2: "jam 12", C3: "jam 3", E3: "jam 6" };

const keyframes = `
@keyframes pp-float1{0%,100%{transform:translateX(-50%) translate(0,0)}50%{transform:translateX(-50%) translate(6px,-10px)}}
@keyframes pp-float2{0%,100%{transform:translateX(-50%) translate(0,0)}50%{transform:translateX(-50%) translate(-8px,8px)}}
@keyframes pp-float3{0%,100%{transform:translate(0,0)}50%{transform:translate(5px,12px)}}
@keyframes pp-float4{0%,100%{transform:translate(0,0)}50%{transform:translate(-6px,-8px)}}
@keyframes pp-pulse1{0%,100%{opacity:.15}50%{opacity:.28}}
@keyframes pp-pulse2{0%,100%{opacity:.1}50%{opacity:.2}}
@keyframes pp-ripple{0%{transform:translateX(-50%) translateY(-50%) scale(0.6);opacity:.4}100%{transform:translateX(-50%) translateY(-50%) scale(2.4);opacity:0}}
@keyframes pp-noteIn{0%{opacity:0;transform:translateY(-8px)}100%{opacity:1;transform:translateY(0)}}
@keyframes pp-pillPulse{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.015)}}
`;

const s = {
    root: {
        height: "100vh",
        background: "#faf9f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 24px 36px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
    },
    circles: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
    },
    topRow: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexShrink: 0,
    },
    label: {
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#bbb",
    },
    noteDisplay: {
        fontSize: 52,
        fontWeight: 500,
        color: "#1a1a1a",
        lineHeight: 1.05,
        fontFamily: "'Georgia', serif",
        animation: "pp-noteIn .3s ease",
    },
    notePlaceholder: {
        fontSize: 52,
        fontWeight: 500,
        color: "#ddd",
        lineHeight: 1.05,
        fontFamily: "'Georgia', serif",
    },
    badgeActive: {
        marginTop: 4,
        padding: "5px 12px",
        borderRadius: 20,
        background: "#1a1a1a",
        color: "#fff",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
    },
    badgeIdle: {
        marginTop: 4,
        padding: "5px 12px",
        borderRadius: 20,
        background: "transparent",
        color: "#ccc",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        border: "0.5px solid #ddd",
    },
    illustration: {
        position: "relative",
        zIndex: 1,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    gestures: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flexShrink: 0,
    },
    pillActive: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 14,
        background: "#1a1a1a",
        border: "0.5px solid #1a1a1a",
        animation: "pp-pillPulse 1.5s ease-in-out infinite",
    },
    pillIdle: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 14,
        background: "#fff",
        border: "0.5px solid #ebebeb",
    },
    iconActive: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(255,255,255,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        color: "#fff",
        flexShrink: 0,
    },
    iconIdle: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#f2f1ef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        color: "#888",
        flexShrink: 0,
    },
};

export default function PlayerPage({ activeNote, switchTo, audioReady }) {
    useEffect(() => {
        if (!audioReady) return;

        const handleMotion = (e) => {
            const y = e.accelerationIncludingGravity?.y;
            if (y == null) return;
            if (y > 8) switchTo("G2");
            else if (y < -8) switchTo("E3");
            else if (y > -2 && y < 2) switchTo("C3");
        };

        window.addEventListener("devicemotion", handleMotion);
        return () => window.removeEventListener("devicemotion", handleMotion);
    }, [audioReady, switchTo]);

    const isActive = !!activeNote;

    return (
        <div style={s.root}>
            <style>{keyframes}</style>

            {/* Decorative circles */}
            <div style={s.circles}>
                <div
                    style={{
                        position: "absolute",
                        top: -80,
                        left: "50%",
                        width: 380,
                        height: 380,
                        borderRadius: "50%",
                        border: "1px solid rgba(26,26,26,.06)",
                        animation: "pp-float1 8s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: -30,
                        left: "50%",
                        width: 270,
                        height: 270,
                        borderRadius: "50%",
                        border: "1px solid rgba(26,26,26,.08)",
                        animation: "pp-float2 10s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        left: "50%",
                        width: 210,
                        height: 210,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.035)",
                        animation: "pp-pulse1 5s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 60,
                        right: 20,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.05)",
                        animation: "pp-float3 6s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: 200,
                        left: 16,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.05)",
                        animation: "pp-float4 7s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 180,
                        right: 32,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.08)",
                        animation: "pp-pulse2 4s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -120,
                        left: "50%",
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        border: "1px solid rgba(26,26,26,.05)",
                        animation: "pp-float2 12s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
            </div>

            {/* Ripple — hanya muncul saat ada nada aktif */}
            {isActive && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: "38%",
                            left: "50%",
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            border: "1.5px solid rgba(26,26,26,.12)",
                            animation: "pp-ripple 2s ease-out infinite",
                            zIndex: 0,
                            pointerEvents: "none",
                            transform: "translateX(-50%) translateY(-50%)",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "38%",
                            left: "50%",
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            border: "1.5px solid rgba(26,26,26,.08)",
                            animation: "pp-ripple 2s ease-out infinite .7s",
                            zIndex: 0,
                            pointerEvents: "none",
                            transform: "translateX(-50%) translateY(-50%)",
                        }}
                    />
                </>
            )}

            {/* Top row */}
            <div style={s.topRow}>
                <div>
                    <div style={s.label}>Nada aktif</div>
                    {isActive ? (
                        <div key={activeNote} style={s.noteDisplay}>
                            {activeNote}
                        </div>
                    ) : (
                        <div style={s.notePlaceholder}>—</div>
                    )}
                </div>
                <div style={isActive ? s.badgeActive : s.badgeIdle}>
                    {isActive ? "● Aktif" : "○ Diam"}
                </div>
            </div>

            {/* Illustration */}
            <div style={s.illustration}>
                <AngklungIllustration size={200} shaking={isActive} />
            </div>

            {/* Gesture pills */}
            <div style={s.gestures}>
                {Object.entries(NOTES).map(([key, cfg]) => {
                    const active = activeNote === key;
                    return (
                        <div
                            key={key}
                            style={active ? s.pillActive : s.pillIdle}
                        >
                            <div style={active ? s.iconActive : s.iconIdle}>
                                {GESTURE_ICONS[key]}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 500,
                                        color: active ? "#fff" : "#1a1a1a",
                                    }}
                                >
                                    {cfg.gesture}
                                </div>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: active
                                            ? "rgba(255,255,255,.45)"
                                            : "#bbb",
                                        marginTop: 1,
                                    }}
                                >
                                    {GESTURE_SUB[key]}
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    fontFamily: "'Georgia', serif",
                                    color: active
                                        ? "rgba(255,255,255,.7)"
                                        : "#ccc",
                                }}
                            >
                                {cfg.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
