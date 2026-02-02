import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * AssignmentCard
 * - Props-driven (companyName/date/title/items/logo/link)
 * - Scroll-driven reveal + progress rail (per-card progress)
 * - Hover lift (optional, via prop)
 */
const AssignmentCard = ({
                            companyName = "Company",
                            date = "YYYY–YYYY",
                            title = "Role / Assignment",
                            items = [],
                            logo = null,          // ReactNode (e.g. <Afry />)
                            href = null,          // optional link
                            accent = "#03bfb5",   // progress + focus color
                            className = "",
                            hoverLift = false,
                        }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"], // 0 when enters bottom, 1 when leaves top
    });

    // Smooth progress + nice reveal
    const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40 });
    const opacity = useTransform(progress, [0, 0.12, 1], [0, 1, 1]);
    const y = useTransform(progress, [0, 0.12], [24, 0]);
    const scale = useTransform(progress, [0, 0.12], [0.98, 1]);

    const CardTag = href ? motion.a : motion.article;

    return (
        <CardTag
            ref={ref}
            href={href || undefined}
            target={href ? "_blank" : undefined}
            rel={href ? "noreferrer" : undefined}
            style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                opacity,
                transform: "translateZ(0)",
            }}
            className={className}
        >
            <motion.div
                whileHover={hoverLift ? { y: -4, scale: 1.01 } : undefined}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{
                    display: "grid",
                    gridTemplateColumns: "10px 1fr",
                    gap: 16,
                    padding: 18,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(20,20,20,0.7)",
                    backdropFilter: "blur(8px)",
                    y,
                    scale,
                }}
            >
                {/* Progress rail */}
                <div
                    style={{
                        position: "relative",
                        width: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 6,
                            bottom: 6,
                            width: 2,
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.18)",
                        }}
                    />
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 6,
                            bottom: 6,
                            width: 2,
                            borderRadius: 2,
                            background: accent,
                            transformOrigin: "top",
                            scaleY: progress,
                        }}
                    />
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 6,
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: accent,
                            boxShadow: `0 0 0 3px rgba(0,0,0,0.35)`,
                        }}
                    />
                </div>

                {/* Content */}
                <div style={{ display: "grid", gap: 10 }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: logo ? "56px 1fr" : "1fr",
                            gap: 14,
                            alignItems: "center",
                        }}
                    >
                        {logo ? (
                            <div style={{ width: 200, height: 36, display: "flex", alignItems: "center" }}>
                                <div style={{ width: "100%", height: "100%", overflow:"hidden" }}>{logo}</div>
                            </div>
                        ) : null}

                        <div style={{ display: "grid", gap: 2 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                    gap: 12,
                                    flexWrap: "wrap",
                                }}
                            >
                                <h3 style={{ margin: 0, color: "rgba(255,255,255,0.92)", fontSize: 18 }}>
                                    {companyName}
                                </h3>
                                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{date}</span>
                            </div>
                            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>{title}</div>
                        </div>
                    </div>

                    {items?.length ? (
                        <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,0.78)" }}>
                            {items.map((it, i) => (
                                <li key={i} style={{ margin: "6px 0", lineHeight: 1.35 }}>
                                    {it}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </motion.div>
        </CardTag>
    );
};

export default AssignmentCard;
