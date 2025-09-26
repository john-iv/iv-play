# IV/Play - A High-Performance MAME™ Frontend

## Overview

IV/Play (pronounced ‘Four Play’) is a desktop/keyboard-oriented GUI front-end for MAME™ designed for high-end Windows 11 systems. It was conceived in 2006 and originally commissioned in 2011 by John IV, a member of the original MAMEUI team.

The project’s goal is to provide a classic, MAMEUI-like experience decoupled from the MAME core, focusing on near-instant launch times, immediate GameList population, and zero-latency art asset display. In 2025, the codebase was modernized from its .NET 4.5 origins to a pure WinForms application on **.NET 9**, leveraging AI pair-programming to achieve its performance goals.

## Features

IV/Play is architected for speed and a smooth user experience, trading initial asset processing time for a highly responsive and fluid interface during use.

### Performance & Architecture

* **GPU Render Pipeline**: The entire UI is rendered using a DirectX 11 / Direct2D pipeline, offloading all drawing to the GPU. This completely eliminates the “scrolling judder” and freezes that affected the previous GDI+ version.
* **Optimized Startup**: The application features a “Warm Start” path that loads the UI in under 500ms by loading the database into memory and using a binary gamelist cache. Heavier assets like the icon atlas are loaded on a background thread after the UI is already interactive.
* **SQLite Backend**: The data layer was migrated from LiteDB to a robust SQLite database using Entity Framework Core, resolving persistent stability issues and ensuring long-term reliability.
* **Multi-Layered Caching**: To minimize disk I/O and maximize speed, IV/Play uses several caching strategies:
    * **Icon Atlas Cache**: All game icons are combined into a single PNG “atlas” that is loaded into GPU memory for extremely fast rendering.
    * **Binary GameList Cache**: The fully sorted game list is saved to a binary cache for near-instant loading on subsequent runs.
    * **DAT File Cache**: `history.xml` and `mameinfo.dat` are parsed once and stored in a JSON cache, dramatically reducing load times.
    * **In-Memory Art Cache**: An LRU (Least Recently Used) cache keeps frequently viewed artwork like snapshots and flyers in RAM to reduce disk reads.

### UI & Display

* **High DPI Support**: The application is fully DPI-aware and scales its UI elements correctly on high-resolution monitors like 1440p and 4K without compatibility hacks.
* **Grid View & Multiple Icon Sizes**: Cycle through multiple view modes, including a classic list and a modern grid, using **`Alt+P`** or **`Tab`**. Cycle through various icon sizing presets (e.g., "Standard," "Showcase") with **`Alt+I`**.
* **Aspect Ratio Sizing**: Hold **`CTRL`** while resizing the window to maintain the classic 2.35:1 “TohoScope” aspect ratio.
* **Background Brightness Detection**: IV/Play can automatically detect if a background image is bright and switch the font color to black for better readability.
* **Customizable Artwork**: The art area supports unlimited user-defined art types, configurable borders, transparency, nearest-neighbor scaling, and a simulated scanline effect.

### Filtering & Game Lists

* **Advanced Text Filter**: The filter dialog (**`Ctrl+F`**) supports everything from simple text to powerful natural language queries (`capcom late 90s no clones`) and a full SQL-like advanced syntax (`year > 1990 AND manufacturer = "Sega"`).
* **Software List Support**: Enter a computer or console system (e.g., Atari 2600) to view its software list as a navigable game list.
* **Custom Game Lists**: Create your own game lists in the `IV-Play.Custom.ini` file and select them from the configuration screen to override the main list.
* **Favorites**: Add/remove games to a `favorites.ini` file with **`Ctrl+D`**. Toggle the display mode to show favorites, the main list, or both (**`Alt+D`**).

### Diagnostics & Tools

* **Diagnostic Overlays**:
    * **`F2`**: View the application log file in a real-time overlay.
    * **`F3`**: View the `IV-Play.cfg` file in an overlay.
    * **`F7`**: Display a performance dashboard with FPS, CPU/GPU memory usage, and garbage collection stats.
    * **`~`** (Tilde): Open a “DAT Peek” overlay to view `history.xml` or `mameinfo.dat` content for the selected game.
* **Record/Playback**: IV/Play automatically records an input file (`.inp`) for every game launched. To play it back, launch the same game while holding the **`CTRL`** key.
* **Factory Reset (`F8`)**: A safe factory reset option clears all caches, the database, and the config file but preserves your `favorites.ini` and `IV-Play.Custom.ini` files.
* **BVT (`F10`)**: Runs a Built-in Verification Test for developer diagnostics.

## Requirements

* **OS**: Windows 11
* **Runtime**: .NET 9 (will prompt for download if not present)
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
| **`Alt`**+**`Left`** / **`Esc`** | Exits a software list view or clears an active filter.                       |
| **`Arrows`** | Navigate the game list. Left/Right jump by letter.                                 |
| **`Ctrl`**+**`D`** | Adds or removes the selected game from `favorites.ini`.                              |
| **`Ctrl`**+**`Enter`** | Launches playback of a previously recorded game session (`.inp` file).                 |
| **`Ctrl`**+**`F`** / **`E`** | Opens the Text Filter dialog.                                                      |
| **`Ctrl`**+**`R`** | Selects a random game.                                                             |
| **`Ctrl`**+**`Shift`**+**`C`** | Copies the currently filtered list to the clipboard.                           |
| **`Shift`**+**`Enter`** | Launches a softlist machine (e.g., a console) directly, bypassing its software list. |
| **`F1`** | Opens the Configuration screen.                                                    |
| **`F2`** | Toggles the Log file overlay.                                                      |
| **`F3`** | Toggles the Config file (`.cfg`) overlay.                                          |
| **`F4`** | Re-links the MAME executable.                                                      |
| **`F5`** | Refreshes all data from MAME and rebuilds all caches.                              |
| **`F7`** | Toggles the performance dashboard overlay.                                         |
| **`F8`** | Initiates a factory reset.                                                         |
| **`F10`** | Runs the Built-in Verification Test (BVT) for developer diagnostics.               |
| **`Home`** / **`End`** | Navigates to the start/end of the current section (Favorites or Main List).        |
| **`Page Up`** / **`Down`** | Navigates the list by one page.                                                  |

## Credits

* Creator & Designer (2006-Present): John Hardy IV
* Initial Development (2011-2016): Matan Bareket
* Modernization & AI Pair-Programming (2025): Gemini / CoPilot / ChatGPT / Grok