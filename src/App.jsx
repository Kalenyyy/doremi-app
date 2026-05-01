import { useState, useRef, useEffect } from "react";

// Audio config per note
const NOTES = {
    G2: {
        file: "/sounds/G2_Kiri1.mp3",
        duration: 11.172,
        loopStart: 0.05,
        crossfade: 1.6,
        label: "G2",
        gesture: "⬆️ Angkat",
        accel: "y > 8",
    },
    C3: {
        file: "/sounds/C3_Kiri6.mp3",
        duration: 11.042,
        loopStart: 0.05,
        crossfade: 1.6,
        label: "C3",
        gesture: "➡️ Tengah",
        accel: "-2 < y < 2",
    },
    E3: {
        file: "/sounds/E3_Kiri10.mp3",
        duration: 10.05,
        loopStart: 0.05,
        crossfade: 1.6,
        label: "E3",
        gesture: "⬇️ Turunkan",
        accel: "y < -8",
    },
};

// --- CrossfadeLooper class ---
// Manages seamless looping of a single note using two alternating source nodes.
class CrossfadeLooper {
    constructor(ctx, buffer, config, masterGain) {
        this.ctx = ctx;
        this.buffer = buffer;
        this.config = config; // { loopStart, duration, crossfade }
        this.masterGain = masterGain;

        // Volume envelope for this note (0 = silent, 1 = full)
        this.noteGain = ctx.createGain();
        this.noteGain.gain.value = 0;
        this.noteGain.connect(masterGain);

        this._sources = [null, null];
        this._gains = [ctx.createGain(), ctx.createGain()];
        this._gains[0].connect(this.noteGain);
        this._gains[1].connect(this.noteGain);
        this._gains[0].gain.value = 0;
        this._gains[1].gain.value = 0;

        this._slot = 0; // which source is currently "playing"
        this._playing = false;
        this._scheduleTimer = null;
    }

    // Create and start a source node in the given slot at a future ctx time
    _scheduleSource(slot, when) {
        const { loopStart, crossfade } = this.config;
        const src = this.ctx.createBufferSource();
        src.buffer = this.buffer;
        src.connect(this._gains[slot]);

        const gainNode = this._gains[slot];

        // Fade in
        gainNode.gain.cancelScheduledValues(when);
        gainNode.gain.setValueAtTime(0, when);
        gainNode.gain.linearRampToValueAtTime(1, when + crossfade);

        // Fade out crossfade seconds before end
        const loopDuration = this.buffer.duration - loopStart;
        const fadeOutAt = when + loopDuration - crossfade;
        gainNode.gain.setValueAtTime(1, fadeOutAt);
        gainNode.gain.linearRampToValueAtTime(0, when + loopDuration);

        src.start(when, loopStart);
        this._sources[slot] = src;

        // Schedule next iteration before this one ends
        const scheduleNextAt = (fadeOutAt - this.ctx.currentTime - 0.1) * 1000;
        this._scheduleTimer = setTimeout(
            () => {
                if (!this._playing) return;
                const nextSlot = slot === 0 ? 1 : 0;
                const nextWhen = when + loopDuration - crossfade;
                this._scheduleSource(nextSlot, nextWhen);
            },
            Math.max(0, scheduleNextAt),
        );
    }

    start() {
        if (this._playing) return;
        this._playing = true;
        this._scheduleSource(0, this.ctx.currentTime);
    }

    stop() {
        this._playing = false;
        clearTimeout(this._scheduleTimer);
        const now = this.ctx.currentTime;
        this._sources.forEach((src, i) => {
            if (src) {
                this._gains[i].gain.cancelScheduledValues(now);
                this._gains[i].gain.setValueAtTime(
                    this._gains[i].gain.value,
                    now,
                );
                this._gains[i].gain.linearRampToValueAtTime(0, now + 0.1);
                try {
                    src.stop(now + 0.15);
                } catch (_) {}
                this._sources[i] = null;
            }
        });
    }

    // Fade this note in/out (for switching between notes)
    fadeTo(targetVol, duration = 0.2) {
        const now = this.ctx.currentTime;
        this.noteGain.gain.cancelScheduledValues(now);
        this.noteGain.gain.setValueAtTime(this.noteGain.gain.value, now);
        this.noteGain.gain.linearRampToValueAtTime(targetVol, now + duration);
    }
}

// --- Main App ---
export default function App() {
    const [permission, setPermission] = useState(false);
    const [activeNote, setActiveNote] = useState(null);
    const [loading, setLoading] = useState(false);

    const audioCtx = useRef(null);
    const loopers = useRef({});
    const lastNote = useRef(null);

    const loadBuffer = async (ctx, url) => {
        const res = await fetch(url);
        const ab = await res.arrayBuffer();
        return ctx.decodeAudioData(ab);
    };

    const startAll = async () => {
        setLoading(true);
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.value = 1;
        masterGain.connect(ctx.destination);

        // Load all buffers in parallel
        const entries = Object.entries(NOTES);
        const buffers = await Promise.all(
            entries.map(([, cfg]) => loadBuffer(ctx, cfg.file)),
        );

        entries.forEach(([key, cfg], i) => {
            const looper = new CrossfadeLooper(
                ctx,
                buffers[i],
                cfg,
                masterGain,
            );
            looper.start(); // start silent — noteGain is 0
            loopers.current[key] = looper;
        });

        setLoading(false);
        setPermission(true);
    };

    const switchTo = (key) => {
        if (lastNote.current === key) return;

        Object.entries(loopers.current).forEach(([k, looper]) => {
            looper.fadeTo(k === key ? 1 : 0, 0.2);
        });

        lastNote.current = key;
        setActiveNote(key);
    };

    const requestPermission = async () => {
        if (typeof DeviceMotionEvent?.requestPermission === "function") {
            const res = await DeviceMotionEvent.requestPermission();
            if (res === "granted") await startAll();
        } else {
            await startAll();
        }
    };

    useEffect(() => {
        if (!permission) return;

        const handleMotion = (e) => {
            const y = e.accelerationIncludingGravity?.y;
            if (y == null) return;

            if (y > 8) switchTo("G2");
            else if (y < -8) switchTo("E3");
            else if (y > -2 && y < 2) switchTo("C3");
        };

        window.addEventListener("devicemotion", handleMotion);
        return () => window.removeEventListener("devicemotion", handleMotion);
    }, [permission]);

    // --- UI ---
    const active = activeNote ? NOTES[activeNote] : null;

    return (
        <div style={styles.root}>
            <div style={styles.card}>
                <h1 style={styles.title}>🎵 HP Music Controller</h1>

                {!permission && (
                    <button
                        style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
                        onClick={requestPermission}
                        disabled={loading}
                    >
                        {loading ? "Loading sounds..." : "Start Sensor"}
                    </button>
                )}

                {permission && (
                    <div style={styles.info}>
                        <div style={styles.gestures}>
                            {Object.entries(NOTES).map(([key, cfg]) => (
                                <div
                                    key={key}
                                    style={{
                                        ...styles.gestureRow,
                                        opacity: activeNote === key ? 1 : 0.4,
                                        transform:
                                            activeNote === key
                                                ? "scale(1.05)"
                                                : "scale(1)",
                                    }}
                                >
                                    <span style={styles.gestureIcon}>
                                        {cfg.gesture.split(" ")[0]}
                                    </span>
                                    <span>
                                        {cfg.gesture
                                            .split(" ")
                                            .slice(1)
                                            .join(" ")}{" "}
                                        = <strong>{cfg.label}</strong>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div style={styles.noteDisplay}>
                            <span style={styles.noteSmall}>Nada aktif</span>
                            <span style={styles.noteBig}>
                                {active ? active.label : "—"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    root: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f0f",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#fff",
    },
    card: {
        background: "#1a1a1a",
        borderRadius: 20,
        padding: "40px 32px",
        maxWidth: 360,
        width: "90%",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    },
    title: {
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 28,
        letterSpacing: 0.5,
    },
    btn: {
        background: "#4f8ef7",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "14px 32px",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
    },
    gestures: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    gestureRow: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#242424",
        borderRadius: 10,
        padding: "10px 16px",
        fontSize: 15,
        transition: "all 0.2s ease",
    },
    gestureIcon: {
        fontSize: 20,
    },
    noteDisplay: {
        background: "#242424",
        borderRadius: 14,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
    },
    noteSmall: {
        fontSize: 12,
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    noteBig: {
        fontSize: 48,
        fontWeight: 800,
        color: "#4f8ef7",
        lineHeight: 1.1,
    },
};
