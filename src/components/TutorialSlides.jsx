import { useState } from "react";
import PosisiAtas from "../components/illustrations/PosisiAtas";
import PosisiTengah from "../components/illustrations/PosisiTengah";
import PosisiBawah from "../components/illustrations/PosisiBawah";

const SLIDES = [
    {
        note: "Nada G2",
        Illustration: PosisiAtas,
        title: "Tegakkan ke atas → G2",
        desc: "Pegang ponsel tegak. Sensor membaca posisi ini sebagai nada G2.",
    },
    {
        note: "Nada C3",
        Illustration: PosisiTengah,
        title: "Miringkan ke kanan → C3",
        desc: "Putar ponsel ke kanan untuk menghasilkan nada C3.",
    },
    {
        note: "Nada E3",
        Illustration: PosisiBawah,
        title: "Balikkan ke bawah → E3",
        desc: "Balik ponsel ke bawah untuk memainkan nada E3.",
    },
];

const s = {
    root: {
        width: "100%",
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    progressRow: {
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    illustBox: {
        width: "100%",
        background: "#fff",
        borderRadius: 20,
        padding: "32px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        minHeight: 220,
    },
    badge: {
        fontSize: 10,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#999",
        border: "0.5px solid #ddd",
        padding: "4px 14px",
        borderRadius: 20,
        background: "#fff",
    },
    info: {
        textAlign: "center",
        animation: "fadeSlide .4s ease",
    },
    title: {
        fontSize: 17,
        fontWeight: 500,
        color: "#1a1a1a",
        marginBottom: 6,
    },
    desc: {
        fontSize: 13,
        color: "#777",
        lineHeight: 1.6,
        maxWidth: 260,
        margin: "0 auto",
    },
    navRow: {
        display: "flex",
        gap: 10,
        width: "100%",
        marginTop: 10,
    },
    btnBack: {
        flex: 1,
        padding: "13px 0",
        borderRadius: 14,
        background: "transparent",
        border: "0.5px solid #ccc",
        fontSize: 14,
        color: "#1a1a1a",
        cursor: "pointer",
    },
    btnNext: {
        flex: 2,
        padding: "13px 0",
        borderRadius: 14,
        background: "#1a1a1a",
        color: "#fff",
        border: "none",
        fontSize: 15,
        fontWeight: 500,
        cursor: "pointer",
    },
};

const keyframes = `
@keyframes fadeSlide {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseDot {
    0%,100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.4); opacity: 1; }
}
`;

export default function TutorialSlides({ onFinish, onBack }) {
    const [cur, setCur] = useState(0);
    const total = SLIDES.length;
    const slide = SLIDES[cur];
    const { Illustration } = slide;

    const next = () => {
        if (cur < total - 1) setCur(cur + 1);
        else onFinish();
    };

    const back = () => {
        if (cur > 0) setCur(cur - 1);
        else onBack();
    };

    return (
        <div style={s.root}>
            <style>{keyframes}</style>

            {/* Progress dots */}
            <div style={s.progressRow}>
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: cur === i ? 10 : 8,
                            height: cur === i ? 10 : 8,
                            borderRadius: "50%",
                            background:
                                cur === i ? "#1a1a1a" : "rgba(0,0,0,0.2)",
                            animation:
                                cur === i ? "pulseDot 1.2s infinite" : "none",
                            transition: "all 0.3s ease",
                        }}
                    />
                ))}
            </div>

            <span style={s.badge}>{slide.note}</span>

            <div style={s.illustBox}>
                <Illustration />
            </div>

            <div key={cur} style={s.info}>
                <div style={s.title}>{slide.title}</div>
                <div style={s.desc}>{slide.desc}</div>
            </div>

            {/* Kembali selalu ada di sebelah kiri Selanjutnya */}
            <div style={s.navRow}>
                <button style={s.btnBack} onClick={back}>
                    ← Kembali
                </button>
                <button style={s.btnNext} onClick={next}>
                    {cur === total - 1 ? "Ayo Bermain →" : "Selanjutnya →"}
                </button>
            </div>
        </div>
    );
}
