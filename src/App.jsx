import { useState, useRef, useEffect } from "react";

function App() {
    const [permission, setPermission] = useState(false);
    const [noteLabel, setNoteLabel] = useState("-");

    const lastNote = useRef("");
    const audioCtx = useRef(null);
    const buffers = useRef({});
    const gainNodes = useRef({});
    const sourceNodes = useRef({});

    const loadBuffer = async (ctx, url) => {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        return await ctx.decodeAudioData(arrayBuffer);
    };

    const startAll = async () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.value = 1;
        masterGain.connect(ctx.destination);

        const [bufDO_LOW, bufFA, bufDO_HIGH] = await Promise.all([
            loadBuffer(ctx, "/sounds/Do_Low.mp3"),
            loadBuffer(ctx, "/sounds/Fa.mp3"),
            loadBuffer(ctx, "/sounds/Do_High.mp3"),
        ]);

        buffers.current = {
            DO_LOW: bufDO_LOW,
            FA: bufFA,
            DO_HIGH: bufDO_HIGH,
        };

        gainNodes.current = {
            DO_LOW: ctx.createGain(),
            FA: ctx.createGain(),
            DO_HIGH: ctx.createGain(),
        };

        Object.values(gainNodes.current).forEach((g) => {
            g.gain.value = 0;
            g.connect(masterGain);
        });

        Object.keys(buffers.current).forEach((key) => {
            const source = ctx.createBufferSource();
            source.buffer = buffers.current[key];
            source.loop = true;

            const loopPoints = {
                DO_LOW: { start: 0.02, end: 0.78 },
                FA: { start: 0.02, end: 1.1 },
                DO_HIGH: { start: 0.05, end: 2.4 },
            };

            source.loopStart = loopPoints[key].start;
            source.loopEnd = loopPoints[key].end;

            source.connect(gainNodes.current[key]);
            source.start(0, loopPoints[key].start);

            sourceNodes.current[key] = source;
        });
    };

    const crossfadeTo = (type, label) => {
        const ctx = audioCtx.current;
        if (!ctx) return;

        const now = ctx.currentTime;
        const FADE = 0.15;

        Object.entries(gainNodes.current).forEach(([key, gain]) => {
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(gain.gain.value, now);
            if (key === type) {
                gain.gain.linearRampToValueAtTime(1, now + FADE);
            } else {
                gain.gain.linearRampToValueAtTime(0, now + FADE);
            }
        });

        setNoteLabel(label);
        lastNote.current = type;
    };

    const requestPermission = async () => {
        if (typeof DeviceMotionEvent?.requestPermission === "function") {
            const res = await DeviceMotionEvent.requestPermission();
            if (res === "granted") {
                await startAll();
                setPermission(true);
            }
        } else {
            await startAll();
            setPermission(true);
        }
    };

    useEffect(() => {
        if (!permission) return;

        const handleMotion = (event) => {
            const y = event.accelerationIncludingGravity?.y;
            if (y == null) return;

            if (y > 8 && lastNote.current !== "DO_LOW") {
                crossfadeTo("DO_LOW", "DO rendah");
            } else if (y < -8 && lastNote.current !== "DO_HIGH") {
                crossfadeTo("DO_HIGH", "DO tinggi");
            } else if (y > -2 && y < 2 && lastNote.current !== "FA") {
                crossfadeTo("FA", "FA");
            }
        };

        window.addEventListener("devicemotion", handleMotion);
        return () => window.removeEventListener("devicemotion", handleMotion);
    }, [permission]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🎵 HP Music Controller</h1>

            {!permission && (
                <button onClick={requestPermission}>Start Sensor</button>
            )}

            {permission && (
                <>
                    <p>⬆️ Angkat = DO rendah</p>
                    <p>➡️ Tengah = FA</p>
                    <p>⬇️ Turunkan = DO tinggi</p>
                    <h2>Nada: {noteLabel}</h2>
                </>
            )}
        </div>
    );
}

export default App;
