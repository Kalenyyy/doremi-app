import { useEffect, useRef } from "react";

/**
 * AngklungIllustration
 * Animated SVG angklung. When `shaking` is true, each tube oscillates faster.
 */
export default function AngklungIllustration({ shaking = false, size = 220 }) {
    const tube1 = useRef(null);
    const tube2 = useRef(null);
    const tube3 = useRef(null);
    const tube4 = useRef(null);
    const frameRef = useRef(null);
    const tRef = useRef(0);

    useEffect(() => {
        const tubes = [
            { ref: tube1, delay: 0 },
            { ref: tube2, delay: 60 },
            { ref: tube3, delay: 120 },
            { ref: tube4, delay: 180 },
        ];

        const animate = () => {
            tRef.current += shaking ? 5 : 1.5;
            const amp = shaking ? 8 : 3;
            tubes.forEach(({ ref, delay }) => {
                if (!ref.current) return;
                const angle = Math.sin((tRef.current + delay) * 0.07) * amp;
                ref.current.setAttribute(
                    "transform",
                    `rotate(${angle}, 110, 110)`,
                );
            });
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [shaking]);

    return (
        <svg
            viewBox="0 0 220 220"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
        >
            {/* Frame */}
            <rect x="30" y="30" width="10" height="165" rx="5" fill="#7C5C3A" />
            <rect
                x="180"
                y="30"
                width="10"
                height="165"
                rx="5"
                fill="#7C5C3A"
            />
            <rect x="28" y="28" width="164" height="10" rx="5" fill="#5C3D1F" />
            <rect
                x="28"
                y="182"
                width="164"
                height="10"
                rx="5"
                fill="#5C3D1F"
            />

            {/* Tali */}
            <line
                x1="40"
                y1="38"
                x2="69"
                y2="55"
                stroke="#5C3D1F"
                strokeWidth="1.5"
                opacity="0.7"
            />
            <line
                x1="40"
                y1="38"
                x2="98"
                y2="65"
                stroke="#5C3D1F"
                strokeWidth="1.5"
                opacity="0.7"
            />
            <line
                x1="185"
                y1="38"
                x2="125"
                y2="70"
                stroke="#5C3D1F"
                strokeWidth="1.5"
                opacity="0.7"
            />
            <line
                x1="185"
                y1="38"
                x2="150"
                y2="80"
                stroke="#5C3D1F"
                strokeWidth="1.5"
                opacity="0.7"
            />

            {/* Tube 1 - paling panjang */}
            <g ref={tube1}>
                <rect
                    x="58"
                    y="55"
                    width="22"
                    height="120"
                    rx="6"
                    fill="#C8A85A"
                />
                <rect
                    x="62"
                    y="55"
                    width="6"
                    height="120"
                    rx="3"
                    fill="#D4B86E"
                    opacity="0.5"
                />
                <ellipse cx="69" cy="95" rx="5" ry="8" fill="#8B6A30" />
                <rect
                    x="58"
                    y="160"
                    width="22"
                    height="12"
                    rx="3"
                    fill="#A07835"
                />
            </g>

            {/* Tube 2 */}
            <g ref={tube2}>
                <rect
                    x="88"
                    y="65"
                    width="20"
                    height="105"
                    rx="6"
                    fill="#BFA04E"
                />
                <rect
                    x="92"
                    y="65"
                    width="5"
                    height="105"
                    rx="3"
                    fill="#CDB168"
                    opacity="0.5"
                />
                <ellipse cx="98" cy="100" rx="4" ry="7" fill="#7D5E28" />
                <rect
                    x="88"
                    y="157"
                    width="20"
                    height="11"
                    rx="3"
                    fill="#9B6E2A"
                />
            </g>

            {/* Tube 3 */}
            <g ref={tube3}>
                <rect
                    x="116"
                    y="70"
                    width="18"
                    height="95"
                    rx="6"
                    fill="#B8943E"
                />
                <rect
                    x="120"
                    y="70"
                    width="5"
                    height="95"
                    rx="3"
                    fill="#C8A858"
                    opacity="0.5"
                />
                <ellipse cx="125" cy="103" rx="4" ry="6" fill="#7A5A24" />
                <rect
                    x="116"
                    y="153"
                    width="18"
                    height="10"
                    rx="3"
                    fill="#956825"
                />
            </g>

            {/* Tube 4 - paling pendek */}
            <g ref={tube4}>
                <rect
                    x="142"
                    y="80"
                    width="16"
                    height="82"
                    rx="5"
                    fill="#A8853A"
                />
                <rect
                    x="146"
                    y="80"
                    width="4"
                    height="82"
                    rx="2"
                    fill="#BA9748"
                    opacity="0.5"
                />
                <ellipse cx="150" cy="110" rx="3" ry="5" fill="#725220" />
                <rect
                    x="142"
                    y="150"
                    width="16"
                    height="9"
                    rx="3"
                    fill="#8A5D20"
                />
            </g>
        </svg>
    );
}
