import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";

function App() {
    const [permission, setPermission] = useState(false);
    const [noteLabel, setNoteLabel] = useState("-");

    const lastNote = useRef("");

    const players = useRef({});
    const gains = useRef({});
    const reverb = useRef(null);

    useEffect(() => {
        reverb.current = new Tone.Reverb({
            decay: 2,
            wet: 0.3,
        }).toDestination();

        gains.current = {
            DO_LOW: new Tone.Gain(0).connect(reverb.current),
            FA: new Tone.Gain(0).connect(reverb.current),
            DO_HIGH: new Tone.Gain(0).connect(reverb.current),
        };

        players.current = {
            DO_LOW: new Tone.Player({
                url: "/sounds/Do_Low.mp3",
                loop: true,
                loopStart: 0.05,
                loopEnd: 0.6,
            }).connect(gains.current.DO_LOW),

            FA: new Tone.Player({
                url: "/sounds/Fa.mp3",
                loop: true,
                loopStart: 0.05,
                loopEnd: 0.8,
            }).connect(gains.current.FA),

            DO_HIGH: new Tone.Player({
                url: "/sounds/Do_High.mp3",
                loop: true,
                loopStart: 0.1,
                loopEnd: 0.7,
            }).connect(gains.current.DO_HIGH),
        };
    }, []);

    const startAll = async () => {
        await Tone.start();

        Object.values(players.current).forEach((p) => {
            if (p.state !== "started") {
                p.start();
            }
        });
    };

    const crossfadeTo = (type, label) => {
        Object.entries(gains.current).forEach(([key, gain]) => {
            if (key === type) {
                gain.gain.rampTo(1, 0.2);
            } else {
                gain.gain.rampTo(0, 0.2);
            }
        });

        setNoteLabel(label);
        lastNote.current = type;
    };

    const requestPermission = async () => {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            const res = await DeviceMotionEvent.requestPermission();
            if (res === "granted") {
                setPermission(true);
                startAll();
            }
        } else {
            setPermission(true);
            startAll();
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

        return () => {
            window.removeEventListener("devicemotion", handleMotion);
        };
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
