# IV/Play - A High-Performance MAME™ Frontend

<img width="1504" height="639" alt="1" src="https://github.com/user-attachments/assets/e35e7365-6dd6-4e75-ae01-a7d9c1e10fa9" />



## Overview
https://john-iv.github.io/iv-play/

IV/Play (pronounced ‘Four Play’) is a desktop/keyboard-oriented GUI front-end for MAME™ designed for high-end Windows 11 systems. It was conceived in 2006 and originally commissioned in 2011 by John IV, a member of the original MAMEUI team.

The project’s goal is to provide a classic, MAMEUI-like experience decoupled from the MAME core, focusing on near-instant launch times, immediate GameList population, and zero-latency art asset display. In 2025, the codebase was modernized from its .NET 4.5 origins to a pure WinForms application on **.NET 10**, rebuilt to achieve its performance goals.

## Features

IV/Play is architected for speed and a smooth user experience, trading initial asset processing time for a highly responsive and fluid interface during use.

### Performance & Architecture

* **GPU Render Pipeline**: The entire UI is rendered using a DirectX 11 / Direct2D pipeline, offloading all drawing to the GPU. This completely eliminates the “scrolling judder” and freezes that could affect GDI-based applications.
* **Optimized Startup**: The application features a “Warm Start” path that renders an interactive UI in under 200ms by loading the database into memory via an optimized summary table. Heavier assets like the icon atlas are loaded on a background thread after the UI is already interactive.
* **SQLite Backend**: The data layer uses a robust SQLite database with Entity Framework Core, ensuring long-term reliability and query speed.
* **Multi-Layered Caching**: To minimize disk I/O and maximize speed, IV/Play uses several caching strategies:
    * **Icon Atlas Cache**: All game icons are combined into a single PNG “atlas” that is loaded into GPU memory.
    * **DAT File Cache**: `history.xml` and `mameinfo.dat` are parsed once and stored in an optimized binary cache.
    * **In-Memory Art Cache**: An LRU (Least Recently Used) cache keeps frequently viewed artwork like snapshots and flyers in RAM.
    * **Archive Support**: Supports reading artwork and icons directly from `.zip` and `.7z` archives (non-solid archives only) to reduce file system clutter.

### UI & Display

* **High DPI Support**: The application is fully DPI-aware and scales its UI elements correctly on high-resolution monitors like 1440p and 4K without compatibility hacks.
* **Dynamic Color Themes**: Beyond static themes, IV/Play includes dynamic engines (Brightness Ladder, Saturation Gradient, Miami Pastels, etc.) that automatically calculate UI text, border, and scrollbar colors based on the dominant color and brightness of your background image.
* **Multiple Views**: Cycle through multiple view modes, including a classic list, large icon list, and a modern grid, using **`Alt+P`** or **`Tab`**. Cycle through various icon sizing presets with **`Alt+I`**.
* **Aspect Ratio Sizing**: Hold **`CTRL`** while resizing the window to maintain the classic 2.35:1 “TohoScope” aspect ratio.
* **Customizable Artwork**: The art area supports unlimited user-defined art types, configurable borders, transparency, nearest-neighbor scaling, and a simulated scanline effect.

### Filtering & Game Lists

* **Unified Software Lists**: Search across MAME's entire software library (consoles, computers) alongside arcade machines. Queries like `name:zaxxon` will return the arcade version and all console ports.
* **Advanced Text Filter**: The filter dialog (**`Ctrl+F`**) supports natural language queries (`capcom late 90s no clones`), hybrid queries (`Year >= "1995" noclones`), and specific hardware filters (`special_filter:screens_2` for multi-screen games).
* **Curated Arcade List**: A built-in "Arcade Only" custom list excludes mechanical, gambling, and redemption games for a purist experience. Cycle lists with **`Alt+Insert`** / **`Alt+Delete`**.
* **Custom Game Lists**: Create your own game lists in the `IV-Play.Custom.ini` file and select them from the configuration screen.
* **Favorites**: Add/remove games to a `favorites.ini` file with **`Ctrl+D`**. This supports both machines and specific software list items (e.g., `a2600/combat`).

### Diagnostics & Tools

* **Multi-Instance Tiling**: Hold **`Shift`** + **`1-9`** while launching a game to spawn multiple windowed instances of MAME simultaneously, automatically tiled on your screen (useful for linked cabinet games).
* **Diagnostic Overlays**:
    * **`F2`**: View the application log file in a real-time overlay.
    * **`F3`**: View the `IV-Play.cfg` file in an overlay.
    * **`F7`**: Display a performance dashboard with FPS, CPU/GPU memory usage, and garbage collection stats.
    * **`~`** (Tilde): Open a “DAT Peek” overlay to view `history.xml` or `mameinfo.dat` content for the selected game.
* **Benchmarking**: 
    * **`F9`**: Runs "BigBench," a suite of 36 games to stress-test system performance.
    * **`Ctrl+B`**: Benchmarks the currently selected game for 90 emulated seconds.
* **Asset Audit (`F6`)**: Scans your configured art directories against the database to identify missing snapshots or icons and report "False Parents" (broken parents with working clones).

## Requirements

* **OS**: Windows 11 (Preferred)
* **Runtime**: .NET 10 (will prompt for download if not present)
* **Hardware**: A modern system with a multi-core CPU, an SSD/NVMe for fast asset loading, and a DirectX 11 compatible GPU is strongly recommended to meet the application’s performance goals.

## Installation

IV/Play is a portable application and does not require a formal installer.

1.  Place the IV/Play executable and its files into your main MAME directory alongside `mame.exe`.
2.  Ensure the `e_sqlite3.dll` file is in the same directory as `IV-Play.exe`.
3.  On first launch, IV/Play will automatically detect `mame.exe`. If it can’t find it, a dialog will appear prompting you to locate it.
4.  The application will then build its database and caches in a sub-folder named `IV-Play`. Your `IV-Play.cfg`, `favorites.ini`, and `IV-Play.Custom.ini` files will be kept at the same level as the executable to survive cache clears and resets.

## Keyboard Shortcuts

| Key                 | Function                                                                           |
| ------------------- | ---------------------------------------------------------------------------------- |
| **`~`** (Tilde)     | Toggles the DAT “peek” overlay. Use Left/Right arrows to resize and Tab to cycle.      |
| **`Alt`**+**`1-0`** | Switches directly to the corresponding art type.                                   |
| **`Alt`**+**`D`** | Cycles through favorite display modes (Off, Favorites + Games, Favorites Only).    |
| **`Alt`**+**`Enter`** | Displays the properties dialog for the selected game.                              |
| **`Alt`**+**`I`** | Cycles through the icon display sizing presets.                                    |
| **`Alt`**+**`P`** / **`Tab`** | Cycles through all Game List view modes (e.g., List, Large Icon, Grid).        |
| **`Alt`**+**`Ins`**/**`Del`** | Cycles through Custom Game Lists (e.g. Full, Arcade Only, User Lists). |
| **`Alt`**+**`Left`** | Exits a software list view or clears an active filter.                       |
| **`Arrows`** | Navigate the game list. Left/Right jump by letter (List View) or cell (Grid View). |
| **`Ctrl`**+**`B`** | Benchmarks the currently selected game (90s duration). |
| **`Ctrl`**+**`D`** | Adds or removes the selected game from `favorites.ini`.                              |
| **`Ctrl`**+**`Enter`** | Launches playback of a previously recorded game session (`.inp` file).                 |
| **`Ctrl`**+**`F`** / **`E`** | Opens the Text Filter dialog.                                                      |
| **`Ctrl`**+**`R`** | Selects a random game.                                                             |
| **`Ctrl`**+**`Shift`**+**`C`** | Copies the currently filtered list to the clipboard.                           |
| **`Ctrl`**+**`Shift`**+**`L`** | Cycles through the MAME command line history. |
| **`Shift`**+**`Enter`** | Launches a softlist machine (e.g., a console) directly, bypassing its software list. |
| **`Shift`**+**`1-9`** | Launches the selected game in *N* concurrent windowed instances (Tiling). |
| **`Ins`** / **`Del`** | Cycles through the available Themes (Static and Dynamic). |
| **`F1`** | Opens the Configuration screen.                                                    |
| **`F2`** | Toggles the Log file overlay.                                                      |
| **`F3`** | Toggles the Config file (`.cfg`) overlay.                                          |
| **`F4`** | Re-links the MAME executable.                                                      |
| **`F5`** | Refreshes all data from MAME and rebuilds all caches (Smart Refresh).              |
| **`F6`** | Runs the Asset Auditor to find missing art. |
| **`F7`** | Toggles the performance dashboard overlay.                                         |
| **`F8`** | Initiates a factory reset.                                                         |
| **`F9`** | Runs the "BigBench" MAME benchmark suite.               |
| **`F10`** | Runs the Built-in Verification Test (BVT) for developer diagnostics.               |
| **`F11`** | Toggles full screen mode.                                                          |
| **`Home`** / **`End`** | Navigates to the start/end of the current section (Favorites or Main List).        |
| **`Page Up`** / **`Down`** | Navigates the list by one page.                                                  |

## Credits

* Creator & Designer (2006-Present): John L. Hardy IV

* Initial Development (2011-2016): Matan Bareket

