import { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";

/**
 * items can be:
 * 1) Link item:
 *    { label: "GitHub", href: "https://...", target?: "_blank" }
 *
 * 2) Button item:
 *    { label: "Copy email", type: "button", copyText: "me@mail.com" }
 *    or
 *    { label: "Do thing", type: "button", onClick: () => {...} }
 */
const GooeyNav = ({
                      items,
                      animationTime = 600,
                      particleCount = 15,
                      particleDistances = [90, 10],
                      particleR = 100,
                      timeVariance = 300,
                      colors = [1, 2, 3, 1, 2, 3, 1, 4],
                      initialActiveIndex = 0,
                  }) => {
    const containerRef = useRef(null);
    const navRef = useRef(null);
    const filterRef = useRef(null);
    const textRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

    const noise = (n = 1) => n / 2 - Math.random() * n;

    const getXY = (distance, pointIndex, totalPoints) => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const createParticle = (i, t, d, r) => {
        let rotate = noise(r / 10);
        return {
            start: getXY(d[0], particleCount - i, particleCount),
            end: getXY(d[1] + noise(7), particleCount - i, particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
        };
    };

    const makeParticles = (element) => {
        const d = particleDistances;
        const r = particleR;
        const bubbleTime = animationTime * 2 + timeVariance;
        element.style.setProperty("--time", `${bubbleTime}ms`);

        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            const p = createParticle(i, t, d, r);
            element.classList.remove("active");

            setTimeout(() => {
                const particle = document.createElement("span");
                const point = document.createElement("span");
                particle.classList.add("particle");
                particle.style.setProperty("--start-x", `${p.start[0]}px`);
                particle.style.setProperty("--start-y", `${p.start[1]}px`);
                particle.style.setProperty("--end-x", `${p.end[0]}px`);
                particle.style.setProperty("--end-y", `${p.end[1]}px`);
                particle.style.setProperty("--time", `${p.time}ms`);
                particle.style.setProperty("--scale", `${p.scale}`);
                particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
                particle.style.setProperty("--rotate", `${p.rotate}deg`);

                point.classList.add("point");
                particle.appendChild(point);
                element.appendChild(particle);

                requestAnimationFrame(() => element.classList.add("active"));

                setTimeout(() => {
                    try {
                        element.removeChild(particle);
                    } catch {
                        /* ignore */
                    }
                }, t);
            }, 30);
        }
    };

    const updateEffectPosition = (liEl) => {
        if (!containerRef.current || !filterRef.current || !textRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = liEl.getBoundingClientRect();

        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`,
        };

        Object.assign(filterRef.current.style, styles);
        Object.assign(textRef.current.style, styles);

        // use LI text, not anchor/button text node assumptions
        textRef.current.innerText = liEl.innerText;
    };

    const clearParticles = () => {
        if (!filterRef.current) return;
        filterRef.current.querySelectorAll(".particle").forEach((p) => p.remove());
    };

    const pulseText = () => {
        if (!textRef.current) return;
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
    };

    const safeCopyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // fallback (older Safari / non-secure context)
            try {
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.setAttribute("readonly", "");
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                const ok = document.execCommand("copy");
                document.body.removeChild(ta);
                return ok;
            } catch {
                return false;
            }
        }
    };

    const activateItem = (liEl, index) => {
        if (activeIndex === index) return;
        setActiveIndex(index);
        updateEffectPosition(liEl);
        clearParticles();
        pulseText();
        makeParticles(filterRef.current);
    };

    const handleActivateFromEvent = (e, index) => {
        const liEl = e.currentTarget.closest("li");
        if (!liEl) return;
        activateItem(liEl, index);
    };

    const handleButtonClick = async (e, index, item) => {
        e.preventDefault();

        // activate gooey
        handleActivateFromEvent(e, index);

        // run action
        if (typeof item.onClick === "function") {
            item.onClick();
            return;
        }

        if (typeof item.copyText === "string") {
            await safeCopyToClipboard(item.copyText);
        }
    };

    const handleKeyDown = (e, index, item) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();

            // simulate activation + click
            const liEl = e.currentTarget.closest("li");
            if (!liEl) return;

            activateItem(liEl, index);

            if (item.type === "button") {
                if (typeof item.onClick === "function") item.onClick();
                else if (typeof item.copyText === "string") safeCopyToClipboard(item.copyText);
            } else if (item.href) {
                window.open(item.href, item.target || "_blank", "noopener,noreferrer");
            }
        }
    };

    useEffect(() => {
        if (!navRef.current || !containerRef.current) return;
        const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
        if (activeLi) {
            updateEffectPosition(activeLi);
            textRef.current?.classList.add("active");
        }

        const resizeObserver = new ResizeObserver(() => {
            const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
            if (currentActiveLi) updateEffectPosition(currentActiveLi);
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [activeIndex]);

    return (
        <div className="gooey-nav-container" ref={containerRef}>
            <nav>
                <ul ref={navRef}>
                    {items.map((item, index) => {
                        const isButton = item.type === "button" || !!item.onClick || typeof item.copyText === "string";

                        return (
                            <li key={index} className={activeIndex === index ? "active" : ""}>
                                {isButton ? (
                                    <button
                                        type="button"
                                        className="gooey-nav-action"   // style this in CSS (see below)
                                        onClick={(e) => handleButtonClick(e, index, item)}
                                        onKeyDown={(e) => handleKeyDown(e, index, item)}
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <a
                                        href={item.href}
                                        target={item.target || "_blank"}
                                        rel="noopener noreferrer"
                                        onClick={(e) => handleActivateFromEvent(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index, item)}
                                    >
                                        <div className="gooeyWrapper">
                                        <div className="gooeyLogoWrapper">
                                            {item.logo}
                                        </div>
                                        {item.label}
                                        </div>
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <span className="effect filter" ref={filterRef} />
            <span className="effect text" ref={textRef} />
        </div>
    );
};

export default GooeyNav;
