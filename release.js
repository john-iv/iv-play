/* ════════════════════════════════════════════════════════════════════════
   release.js — THE ONLY FILE YOU EDIT PER RELEASE.

   Both the website (index.html) and IV/Play's "Check for Updates" read this
   exact file. Bump the values below, upload this file, done — index.html never
   needs to change again.

   Edit, per release:
     version  – the IV/Play version string, e.g. "2.8.9"  (used for the update
                comparison — keep it a plain dotted number)
     date     – human-readable release date (shown on the page as-is)
     artMameVer / artDate – the bundled art set's MAME version and date
     notes    – the bullet highlights for this release (tooltip on the site;
                also available to the app if it ever wants to show them)

   'url' rarely changes — it's where the app sends users to download.
   ════════════════════════════════════════════════════════════════════════ */
var IVPLAY = {
    version:    "2.8.8",
    date:       "10:01 PM 6/15/2026",
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
        "Tweaks and bugfixes 2.8.8",
        "See User Guide for Full ChangeLog"
    ]
};
