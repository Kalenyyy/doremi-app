import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TutorialPage from "./pages/TutorialPage";
import PlayerPage from "./pages/PlayerPage";
import { useAudioEngine } from "./audio/useAudioEngine";

export default function App() {
    const [page, setPage] = useState("landing");
    const { ready, loading, activeNote, init, switchTo, isMuted, toggleMute } = useAudioEngine();

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
            isMuted={isMuted}
            onToggleMute={toggleMute}
        />
    );
}