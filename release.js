/* ════════════════════════════════════════════════════════════════════════
   release.js — THE ONLY FILE YOU EDIT PER RELEASE.

   Both the website (index.html) and IV/Play's "Check for Updates" read this
   exact file. Bump the values below, upload this file, done — index.html never
   needs to change again.

   Edit, per release (including slipstreams — same version number, new build):
     version  – the IV/Play version string, e.g. "2.8.9". Display-only now —
                shown on the site and in the "Update Available" label, but no
                longer compared by the app. Bump it or don't; slipstreams can
                leave it untouched.
     buildId  – THE FIELD THAT ACTUALLY DRIVES THE UPDATE CHECK. This is the
                packaged .exe's Module Version ID (a GUID baked in at compile
                time). After building, open F1 in that build, select the GUID
                on the "GUID:" row (same panel as the version/build-date info),
                copy it, paste it here exactly. IV/Play compares this string
                against its own compiled-in GUID: match = Up to Date, anything
                else = Update Available. No ordering, no date math — identity
                only, so it works whether or not the version string changed.
     date     – human-readable release date (shown on the page as-is). Purely
                decorative now — the app never reads this for comparison.
     artMameVer / artDate – the bundled art set's MAME version and date.
     notes    – the bullet highlights for this release (tooltip on the site;
                also available to the app if it ever wants to show them).

   'url' rarely changes — it's where the app sends users to download.
   ════════════════════════════════════════════════════════════════════════ */
var IVPLAY = {
    version:    "2.8.10",
    buildId:    "d96d55e7-d3dd-40df-aab7-35b881b733dc",
    date:       "8:58 PM 7/15/2026",
    url:        "https://github.com/john-iv/iv-play/releases",
    artMameVer: "0.288",
    artDate:    "9:23 PM 5/28/2026",
    notes: [
        "DPI & Layout Modernization",
        "Internal HiScore.ini",
        "MAME Source .cpp Peek",
        "TohoScope Int/Ext Toggle",
        "Live Available ROM Monitoring",
        "Favorite.ini External Monitoring",
        "Persistent DAT View via Tilde",
        "Check for Update button on F1",
        "Tweaks and bugfixes 2.8.10",
        "See User Guide for Full ChangeLog"
    ]
};