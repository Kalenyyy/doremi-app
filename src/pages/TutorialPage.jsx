import TutorialSlides from "../components/TutorialSlides";

const keyframes = `
@keyframes ts-float1 { 0%,100%{transform:translateX(-50%) translate(0,0)} 50%{transform:translateX(-50%) translate(6px,-10px)} }
@keyframes ts-float2 { 0%,100%{transform:translateX(-50%) translate(0,0)} 50%{transform:translateX(-50%) translate(-8px,8px)} }
@keyframes ts-float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(5px,12px)} }
@keyframes ts-float4 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-6px,-8px)} }
@keyframes ts-pulse1 { 0%,100%{opacity:.18} 50%{opacity:.32} }
@keyframes ts-pulse2 { 0%,100%{opacity:.12} 50%{opacity:.24} }
`;

const s = {
    root: {
        height: "100dvh",
        background: "#faf9f7",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
    },
    circles: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
    },
    header: {
        position: "relative",
        zIndex: 1,
        padding: "52px 28px 16px",
        textAlign: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: 500,
        color: "#1a1a1a",
        fontFamily: "'Georgia', serif",
        margin: 0,
    },
    desc: {
        fontSize: 13,
        color: "#888",
        marginTop: 4,
        marginBottom: 0,
    },
    body: {
        flex: 1,
        position: "relative",
        zIndex: 1,
        padding: "12px 24px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
};

export default function TutorialPage({ onBack, onStart }) {
    return (
        <div style={s.root}>
            <style>{keyframes}</style>

            <div style={s.circles}>
                <div
                    style={{
                        position: "absolute",
                        top: -60,
                        left: "50%",
                        width: 340,
                        height: 340,
                        borderRadius: "50%",
                        border: "1px solid rgba(26,26,26,.07)",
                        animation: "ts-float1 7s ease-in-out infinite",
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
                        animation: "ts-float2 9s ease-in-out infinite",
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
                        animation: "ts-pulse1 5s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 80,
                        right: 28,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.06)",
                        animation: "ts-float3 6s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: 160,
                        left: 24,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.06)",
                        animation: "ts-float4 8s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 200,
                        right: 40,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "rgba(26,26,26,.1)",
                        animation: "ts-pulse2 4s ease-in-out infinite",
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
                        animation: "ts-float2 11s ease-in-out infinite",
                        transform: "translateX(-50%)",
                    }}
                />
            </div>

            <div style={s.header}>
                <h2 style={s.title}>Cara Bermain</h2>
                <p style={s.desc}>Ikuti langkah sebelum mulai bermain</p>
            </div>

            <div style={s.body}>
                <TutorialSlides onFinish={onStart} onBack={onBack} />
            </div>
        </div>
    );
}
