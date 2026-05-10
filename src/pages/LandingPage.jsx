import { useEffect } from "react";
import AngklungIllustration from "../components/AngklungIllustration";

const styles = {
    root: {
        height: "100dvh", // FIX mobile viewport
        background: "#faf9f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "78px 28px 68px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
    },
    circles: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
    },
    badge: {
        position: "relative",
        zIndex: 1,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#999",
        border: "0.5px solid #ddd",
        padding: "4px 14px",
        borderRadius: 20,
        background: "#fff",
        flexShrink: 0,
    },
    hero: {
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        gap: 0,
    },
    title: {
        fontSize: 30,
        fontWeight: 500,
        color: "#1a1a1a",
        lineHeight: 1.15,
        margin: "8px 0 0",
        fontFamily: "'Georgia', serif",
    },
    subtitle: {
        fontSize: 13,
        color: "#888",
        lineHeight: 1.6,
        maxWidth: 230,
        margin: "8px auto 0",
    },
    bottom: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        flexShrink: 0,
    },
    btn: {
        width: "100%",
        padding: "14px 0",
        borderRadius: 14,
        background: "#1a1a1a",
        color: "#fff",
        fontSize: 16,
        fontWeight: 500,
        border: "none",
        cursor: "pointer",
        letterSpacing: "0.3px",
    },
    hint: {
        fontSize: 11,
        color: "#bbb",
        margin: 0,
    },
};

const keyframes = `
    @keyframes lp-float1 { 0%,100%{transform:translateX(-50%) translate(0,0)} 50%{transform:translateX(-50%) translate(6px,-10px)} }
    @keyframes lp-float2 { 0%,100%{transform:translateX(-50%) translate(0,0)} 50%{transform:translateX(-50%) translate(-8px,8px)} }
    @keyframes lp-float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(5px,12px)} }
    @keyframes lp-float4 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-6px,-8px)} }
    @keyframes lp-pulse1 { 0%,100%{opacity:.18} 50%{opacity:.32} }
    @keyframes lp-pulse2 { 0%,100%{opacity:.12} 50%{opacity:.24} }
`;

export default function LandingPage({ onNext }) {
    return (
        <div style={styles.root}>
            <style>{keyframes}</style>

            {/* Decorative circles */}
            <div style={styles.circles}>
                <div
                    style={{
                        position: "absolute",
                        top: -60,
                        left: "50%",
                        width: 340,
                        height: 340,
                        borderRadius: "50%",
                        border: "1px solid rgba(26,26,26,.07)",
                        animation: "lp-float1 7s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: -20,
                        left: "50%",
                        width: 240,
                        height: 240,
                        borderRadius: "50%",
                        border: "1px solid rgba(26,26,26,.1)",
                        animation: "lp-float2 9s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        left: "50%",
                        width: 190,
                        height: 190,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.04)",
                        animation: "lp-pulse1 5s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 70,
                        right: 28,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.06)",
                        animation: "lp-float3 6s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: 140,
                        left: 24,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.06)",
                        animation: "lp-float4 8s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 160,
                        right: 40,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.1)",
                        animation: "lp-pulse2 4s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -100,
                        left: "50%",
                        width: 280,
                        height: 280,
                        borderRadius: "50%",
                        border: "1px solid rgba(26,26,26,.06)",
                        animation: "lp-float2 11s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
            </div>

            <span style={styles.badge}>Alat Musik Digital</span>

            <div style={styles.hero}>
                <AngklungIllustration size={180} shaking={false} />
                <h1 style={styles.title}>
                    Angklung
                    <br />
                    Digital
                </h1>
                <p style={styles.subtitle}>
                    Mainkan angklung hanya dengan menggerakkan ponselmu. Tidak
                    perlu instrumen fisik.
                </p>
            </div>

            <div style={styles.bottom}>
                <button style={styles.btn} onClick={onNext}>
                    Mulai →
                </button>
                <p style={styles.hint}>Pelajari cara bermain dulu</p>
            </div>
        </div>
    );
}
