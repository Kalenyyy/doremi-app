export default function PosisiTengah() {
    return (
        <svg
            viewBox="0 0 260 200"
            width="260"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Tangan */}
            <rect
                x="100"
                y="148"
                width="60"
                height="36"
                rx="18"
                fill="#E8C9A0"
            />
            <rect
                x="88"
                y="116"
                width="84"
                height="48"
                rx="18"
                fill="#E8C9A0"
            />
            {/* Jari-jari */}
            <rect
                x="92"
                y="90"
                width="13"
                height="34"
                rx="6.5"
                fill="#E8C9A0"
            />
            <rect
                x="109"
                y="82"
                width="13"
                height="42"
                rx="6.5"
                fill="#E8C9A0"
            />
            <rect
                x="127"
                y="82"
                width="13"
                height="42"
                rx="6.5"
                fill="#E8C9A0"
            />
            <rect
                x="145"
                y="88"
                width="13"
                height="34"
                rx="6.5"
                fill="#E8C9A0"
            />
            {/* Ibu jari */}
            <rect
                x="72"
                y="120"
                width="22"
                height="13"
                rx="6.5"
                fill="#E8C9A0"
            />

            {/* HP diputar 90° searah jarum jam — kepala ke kanan (landscape) */}
            {/* Rotasi -90° di pusat HP supaya kepala mengarah kanan */}
            <g transform="rotate(-90, 130, 80)">
                <rect
                    x="104"
                    y="36"
                    width="52"
                    height="88"
                    rx="9"
                    fill="#1a1a1a"
                />
                <rect
                    x="108"
                    y="41"
                    width="44"
                    height="72"
                    rx="6"
                    fill="#2e2e2e"
                />
                <circle cx="130" cy="47" r="3.5" fill="#444" />
                <circle cx="130" cy="47" r="1.5" fill="#333" />
                <rect x="113" y="57" width="34" height="4" rx="2" fill="#555" />
                <rect x="113" y="66" width="24" height="4" rx="2" fill="#444" />
                <rect x="113" y="75" width="30" height="4" rx="2" fill="#444" />
                <rect x="113" y="84" width="20" height="4" rx="2" fill="#444" />
                <rect
                    x="122"
                    y="108"
                    width="16"
                    height="3"
                    rx="1.5"
                    fill="#555"
                />
            </g>

            {/* Panah ke kanan */}
            <line
                x1="30"
                y1="80"
                x2="195"
                y2="80"
                stroke="#1a1a1a"
                strokeWidth="1.8"
                strokeDasharray="5,4"
            />
            <polygon points="207,80 190,73 190,87" fill="#1a1a1a" />

            {/* Label */}
            <text
                x="38"
                y="95"
                fontSize="11"
                fill="#999"
                fontFamily="sans-serif"
            >
                putar kanan
            </text>
        </svg>
    );
}
