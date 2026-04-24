import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";

function App() {
    const [permission, setPermission] = useState(false);
    const [noteLabel, setNoteLabel] = useState("-");

    const lastNote = useRef("");
    const lastTime = useRef(0);

    const synth = useRef(
        new Tone.Synth({
            oscillator: {
                type: "square",
            },
        }).toDestination(),
    );

    const playNote = async (note, label) => {
        await Tone.start();
        synth.current.triggerAttackRelease(note, "8n");
        setNoteLabel(label);
        console.log("Play:", note);
    };

    const requestPermission = async () => {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            const res = await DeviceMotionEvent.requestPermission();
            if (res === "granted") {
                setPermission(true);
            }
        } else {
            setPermission(true);
        }
    };

    useEffect(() => {
        if (!permission) return;

        const handleMotion = (event) => {
            const now = Date.now();
            const y = event.accelerationIncludingGravity?.y;

            if (y == null) return;

            if (now - lastTime.current < 500) return;

            if (y > 8 && lastNote.current !== "DO_LOW") {
                playNote("C4", "DO rendah");
                lastNote.current = "DO_LOW";
                lastTime.current = now;
            } else if (y < -8 && lastNote.current !== "FA") {
                playNote("F4", "FA");
                lastNote.current = "FA";
                lastTime.current = now;
            } else if (y > -2 && y < 2 && lastNote.current !== "DO_HIGH") {
                playNote("C5", "DO tinggi");
                lastNote.current = "DO_HIGH";
                lastTime.current = now;
            }
        };

        window.addEventListener("devicemotion", handleMotion);

        return () => {
            window.removeEventListener("devicemotion", handleMotion);
        };
    }, [permission]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>HP Music Controller 🎵</h1>

            {!permission && (
                <button
                    onClick={requestPermission}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Start Sensor
                </button>
            )}

            {permission && (
                <>
                    <p>Gerakkan HP kamu:</p>
                    <p>⬆️ Angkat = DO rendah</p>
                    <p>⬇️ Turunkan = FA</p>
                    <p>➡️ Tengah = DO tinggi</p>

                    <h2 style={{ marginTop: "20px" }}>Nada: {noteLabel}</h2>
                </>
            )}
        </div>
    );
}

export default App;
