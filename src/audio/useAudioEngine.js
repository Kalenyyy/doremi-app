import { useRef, useState } from "react";
import { CrossfadeLooper } from "./CrossfadeLooper";
import { NOTES } from "../constants/notes";

export function useAudioEngine() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtx = useRef(null);
  const loopers = useRef({});
  const lastNote = useRef(null);
  const masterGainNode = useRef(null); 

  const loadBuffer = async (ctx, url) => {
    const res = await fetch(url);
    const ab = await res.arrayBuffer();
    return ctx.decodeAudioData(ab);
  };

  const init = async () => {
    setLoading(true);

    if (typeof DeviceMotionEvent?.requestPermission === "function") {
      const res = await DeviceMotionEvent.requestPermission();
      if (res !== "granted") {
        setLoading(false);
        return;
      }
    }

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
    masterGainNode.current = masterGain; 

    const entries = Object.entries(NOTES);
    const buffers = await Promise.all(
      entries.map(([, cfg]) => loadBuffer(ctx, cfg.file))
    );

    entries.forEach(([key, cfg], i) => {
      const looper = new CrossfadeLooper(ctx, buffers[i], cfg, masterGain);
      looper.start();
      loopers.current[key] = looper;
    });

    setLoading(false);
    setReady(true);
  };

  const switchTo = (key) => {
    if (lastNote.current === key) return;
    Object.entries(loopers.current).forEach(([k, looper]) => {
      looper.fadeTo(k === key ? 1 : 0, 0.2);
    });
    lastNote.current = key;
    setActiveNote(key);
  };

  const toggleMute = () => {
    if (!masterGainNode.current) return;
    setIsMuted((prev) => {
      const next = !prev;
      masterGainNode.current.gain.value = next ? 0 : 1;
      return next;
    });
  };

  return { ready, loading, activeNote, init, switchTo, isMuted, toggleMute };
}