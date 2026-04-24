import { useState } from "react";
import * as Tone from "tone";

function App() {
  const [permission, setPermission] = useState(false);
  const synth = new Tone.Synth().toDestination();

  const requestPermission = async () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      const res = await DeviceMotionEvent.requestPermission();
      if (res === "granted") {
        setPermission(true);
        startListening();
      }
    } else {
      setPermission(true);
      startListening();
    }
  };

  const startListening = () => {
    window.addEventListener("devicemotion", handleMotion);
  };

  let lastNote = "";

  const handleMotion = (event) => {
    const y = event.accelerationIncludingGravity.y;

    if (!y) return;

    // Mapping sederhana
    if (y > 7 && lastNote !== "DO_LOW") {
      playNote("C4"); // Do rendah
      lastNote = "DO_LOW";
    } else if (y < -7 && lastNote !== "FA") {
      playNote("F4"); // Fa
      lastNote = "FA";
    } else if (y > 2 && y < 5 && lastNote !== "DO_HIGH") {
      playNote("C5"); // Do tinggi
      lastNote = "DO_HIGH";
    }
  };

  const playNote = async (note) => {
    await Tone.start(); // penting!
    synth.triggerAttackRelease(note, "8n");
    console.log("Play:", note);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>HP Music Controller 🎵</h1>

      {!permission && (
        <button onClick={requestPermission}>
          Start Sensor
        </button>
      )}

      {permission && <p>Gerakkan HP kamu!</p>}
    </div>
  );
}

export default App;