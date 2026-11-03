"use client";

import { useState } from "react";
import { mapCopy, mapFacts, renderMap, type MapHost, type MapLocale, type MapMode } from "@/lib/server-map";

const segment =
  "min-h-9 cursor-pointer rounded-[9px] px-3 text-[13.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring";
const pressed = "bg-fd-foreground text-fd-background";
const idle = "border border-fd-border text-fd-muted-foreground hover:text-fd-foreground";

/** Self-hosted topologies: Litepod plus remote servers, or everything on one machine. */
export function ServerMap({ locale = "en" }: { locale?: MapLocale }) {
  const [host, setHost] = useState<MapHost>("remote");
  const [mode, setMode] = useState<MapMode>("public");
  const text = mapCopy(locale);

  return (
    <figure className="not-prose my-8">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <div className="grid gap-1.5">
          <span className="text-xs font-medium text-fd-muted-foreground">{text.hostLabel}</span>
          <div className="flex flex-wrap gap-1" role="group" aria-label={text.hostLabel}>
            {(["remote", "single"] as const).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === host}
                onClick={() => setHost(id)}
                className={`${segment} ${id === host ? pressed : idle}`}
              >
                {text.hosts[id]}
              </button>
            ))}
          </div>
        </div>
        {host === "remote" && (
          <div className="grid gap-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">{text.modeLabel}</span>
            <div className="flex flex-wrap gap-1" role="group" aria-label={text.modeLabel}>
              {(["public", "relay", "private"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={id === mode}
                  onClick={() => setMode(id)}
                  className={`${segment} ${id === mode ? pressed : idle}`}
                >
                  {text.modes[id]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="lp-map-field mt-4" dangerouslySetInnerHTML={{ __html: renderMap(locale, host, mode) }} />
      <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-fd-border pt-3 sm:grid-cols-2">
        {mapFacts(locale, host, mode).map(([term, value]) => (
          <div key={term}>
            <dt className="text-[13px] text-fd-muted-foreground">{term}</dt>
            <dd className="mt-0.5 text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
