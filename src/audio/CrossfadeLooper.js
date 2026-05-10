/**
 * CrossfadeLooper
 * Manages seamless looping of a single audio note using two alternating
 * buffer source nodes that crossfade into each other at loop boundaries.
 */
export class CrossfadeLooper {
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

        this._slot = 0;
        this._playing = false;
        this._scheduleTimer = null;
    }

    _scheduleSource(slot, when) {
        const { loopStart, crossfade } = this.config;
        const src = this.ctx.createBufferSource();
        src.buffer = this.buffer;
        src.connect(this._gains[slot]);

        const gainNode = this._gains[slot];
        const loopDuration = this.buffer.duration - loopStart;
        const fadeOutAt = when + loopDuration - crossfade;

        gainNode.gain.cancelScheduledValues(when);
        gainNode.gain.setValueAtTime(0, when);
        gainNode.gain.linearRampToValueAtTime(1, when + crossfade);
        gainNode.gain.setValueAtTime(1, fadeOutAt);
        gainNode.gain.linearRampToValueAtTime(0, when + loopDuration);

        src.start(when, loopStart);
        this._sources[slot] = src;

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

    /** Fade this note in or out. targetVol: 0–1, duration in seconds. */
    fadeTo(targetVol, duration = 0.2) {
        const now = this.ctx.currentTime;
        this.noteGain.gain.cancelScheduledValues(now);
        this.noteGain.gain.setValueAtTime(this.noteGain.gain.value, now);
        this.noteGain.gain.linearRampToValueAtTime(targetVol, now + duration);
    }
}
