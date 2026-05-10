/**
 * GesturePill
 * Displays a single gesture row: icon, label, and note badge.
 * Props: icon (ReactNode), label (string), note (string), active (bool)
 */
export default function GesturePill({ icon, label, note, active = false }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 16px",
                borderRadius: 12,
                background: active ? "#1a1a1a" : "#f5f5f5",
                transition: "background 0.25s ease, transform 0.2s ease",
                transform: active ? "scale(1.02)" : "scale(1)",
            }}
        >
            <div
                style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: active ? "#fff" : "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.25s ease",
                }}
            >
                <span
                    style={{
                        color: active ? "#1a1a1a" : "#fff",
                        fontSize: 16,
                        lineHeight: 1,
                    }}
                >
                    {icon}
                </span>
            </div>

            <span
                style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: active ? "#fff" : "#1a1a1a",
                    flex: 1,
                    transition: "color 0.25s ease",
                }}
            >
                {label}
            </span>

            <span
                style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: active ? "#fff" : "#888",
                    background: active ? "rgba(255,255,255,0.15)" : "#e8e8e8",
                    padding: "2px 10px",
                    borderRadius: 8,
                    transition: "all 0.25s ease",
                }}
            >
                {note}
            </span>
        </div>
    );
}
