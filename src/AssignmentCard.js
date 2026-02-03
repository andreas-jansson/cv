import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const AssignmentCard = ({
                            companyName = "Company",
                            date = "YYYY–YYYY",
                            title = "Role / Assignment",
                            consulting = "",
                            roleDesc = [],
                            skills = [],
                            href = null,
                            accent = "#03bfb5",
                            className = "card",
                            hoverLift = false,
                        }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40 });
    const opacity = useTransform(progress, [0, 0.12, 1], [0, 1, 1]);
    const y = useTransform(progress, [0, 0.12], [24, 0]);
    const scale = useTransform(progress, [0, 0.12], [0.98, 1]);

    const CardTag = href ? motion.a : motion.article;

    const hasSkills = Array.isArray(skills) && skills.length > 0;

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
                    background: "rgba(20,20,20,0.5)",
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
                <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
                    {/* Header */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, alignItems: "center" }}>
                        <div style={{ display: "grid", gap: 2, minWidth: 0 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                    gap: 12,
                                    flexWrap: "wrap",
                                }}
                            >
                                <h3 className="assignmentCardCompany">
                                    {companyName}
                                    <div className="assignmentCardVia">
                                        {consulting && (
                                            <>
                                                <span>via {consulting}</span>
                                            </>
                                        )}
                                    </div>
                                </h3>
                                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{date}</span>
                            </div>
                            <div className="assignmentCardTitle">{title}</div>
                        </div>
                    </div>

                    {/* Role description */}
                    {roleDesc?.length ? (
                        <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,0.78)" }}>
                            {roleDesc.map((it, i) => (
                                <li
                                    key={i}
                                    style={{
                                        margin: "6px 0",
                                        lineHeight: 1.35,
                                        overflowWrap: "anywhere",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {it}
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {/* Bottom row: divider + skills */}
                    {hasSkills ? (
                        <div style={{ display: "grid", gap: 10 }}>
                            {/* Divider */}
                            <div
                                style={{
                                    height: 1,
                                    width: "100%",
                                    background: "rgba(255,255,255,0.12)",
                                }}
                            />

                            {/* Skills */}
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 8,
                                    alignItems: "center",
                                }}
                            >
                                {skills.map((s, idx) => (
                                    <span
                                        key={`${s}-${idx}`}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            padding: "6px 10px",
                                            borderRadius: 999,
                                            border: `1px solid ${accent}55`,
                                            background: `${accent}14`,
                                            color: "rgba(255,255,255,0.85)",
                                            fontSize: 12,
                                            lineHeight: 1,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                    {s}
                  </span>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </motion.div>
        </CardTag>
    );
};

export default AssignmentCard;
