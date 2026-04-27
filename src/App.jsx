import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";

function App() {
    const [permission, setPermission] = useState(false);
    const [noteLabel, setNoteLabel] = useState("-");

    const lastNote = useRef("");

    const players = useRef({
        DO_LOW: new Tone.Player({
            url: "/sounds/Do_Low.mp3",
            loop: true,
            loopStart: 0.05,
            loopEnd: 0.6,
            fadeIn: 0.05,
            fadeOut: 0.1,
        }).toDestination(),

        FA: new Tone.Player({
            url: "/sounds/Fa.mp3",
            loop: true,
            loopStart: 0.05,
            loopEnd: 0.8,
            fadeIn: 0.05,
            fadeOut: 0.1,
        }).toDestination(),

        DO_HIGH: new Tone.Player({
            url: "/sounds/Do_High.mp3",
            loop: true,
            loopStart: 0.1,
            loopEnd: 0.7, 
            fadeIn: 0.05,
            fadeOut: 0.1,
        }).toDestination(),
    });

    const stopAll = () => {
        Object.values(players.current).forEach((p) => {
            if (p.state === "started") {
                p.stop();
            }
        });
    };

    const playNote = async (type, label) => {
        await Tone.start();

        const player = players.current[type];

        if (player.state === "started") return;

        stopAll();
        player.start();

        setNoteLabel(label);
        lastNote.current = type;
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
            const y = event.accelerationIncludingGravity?.y;
            if (y == null) return;

            // 🎯 Mapping FINAL
            if (y > 8 && lastNote.current !== "DO_LOW") {
                playNote("DO_LOW", "DO rendah");
            } else if (y < -8 && lastNote.current !== "DO_HIGH") {
                playNote("DO_HIGH", "DO tinggi");
            } else if (y > -2 && y < 2 && lastNote.current !== "FA") {
                playNote("FA", "FA");
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
                    <p>⬆️ Angkat = DO rendah</p>
                    <p>➡️ Tengah = FA</p>
                    <p>⬇️ Turunkan = DO tinggi</p>

                    <h2 style={{ marginTop: "20px" }}>Nada: {noteLabel}</h2>
                </>
            )}
        </div>
    );
}

export default App;
