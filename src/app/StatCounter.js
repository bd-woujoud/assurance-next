"use client";

import { useEffect } from "react";

export default function StatCounter() {
    useEffect(() => {
        // Création du script externe Statcounter
        const sc = document.createElement("script");
        sc.src = "https://www.statcounter.com/counter/counter.js";
        sc.async = true;
        document.body.appendChild(sc);

        // Création du script inline
        const inlineScript = document.createElement("script");
        inlineScript.innerHTML = `
      var sc_project=13169434;
      var sc_invisible=1;
      var sc_security="b0a8a275";
    `;
        document.body.appendChild(inlineScript);

        return () => {
            document.body.removeChild(sc);
            document.body.removeChild(inlineScript);
        };
    }, []);

    return (
        <noscript>
            <div className="statcounter">
                <a
                    title="Web Analytics Made Easy - Statcounter"
                    href="https://statcounter.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className="statcounter"
                        src="https://c.statcounter.com/13169434/0/b0a8a275/1/"
                        alt="Web Analytics Made Easy - Statcounter"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </a>
            </div>
        </noscript>
    );
}
