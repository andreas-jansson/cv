import { useRef, useState } from "react";

export default function EmailCopyButton({ email = "andreas@example.com", children }) {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef(null);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopied(false), 1200);
        } catch (e) {
            // optional fallback (older browsers)
            const ta = document.createElement("textarea");
            ta.value = email;
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);

            setCopied(true);
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopied(false), 1200);
        }
    };

    return (
        <span style={{ position: "relative", display: "inline-flex" }}>
      <button
          type="button"
          className="gooey-nav-action"
          aria-label="Copy email"
          onClick={copy}
      >
        {children}
      </button>

            {/* tiny popup */}
            <span
                className={`copyToast ${copied ? "show" : ""}`}
                role="status"
            >
        Email copied
      </span>
    </span>
    );
}
