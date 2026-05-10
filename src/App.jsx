import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TutorialPage from "./pages/TutorialPage";
import PlayerPage from "./pages/PlayerPage";
import { useAudioEngine } from "./audio/useAudioEngine";

/**
 * App
 * Manages page routing: landing → tutorial → player.
 * Audio engine is initialized when the user taps "Ayo Mulai Bermain".
 */
export default function App() {
    const [page, setPage] = useState("landing"); // "landing" | "tutorial" | "player"
    const { ready, loading, activeNote, init, switchTo } = useAudioEngine();

    const handleStart = async () => {
        await init();
        setPage("player");
    };

    if (page === "landing") {
        return <LandingPage onNext={() => setPage("tutorial")} />;
    }

    if (page === "tutorial") {
        return (
            <TutorialPage
                onBack={() => setPage("landing")}
                onStart={handleStart}
                loading={loading}
            />
        );
    }

    return (
        <PlayerPage
            activeNote={activeNote}
            switchTo={switchTo}
            audioReady={ready}
        />
    );
}
