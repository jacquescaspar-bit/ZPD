#!/usr/bin/env python3
"""Export ZPD brand SVG logos to PNG (does not overwrite SVG source files)."""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
SIZE = 1024


def export_png(svg_path: Path, png_path: Path, background: str | None = None) -> None:
    cmd = ["rsvg-convert", "-w", str(SIZE), "-h", str(SIZE), str(svg_path), "-o", str(png_path)]
    if background:
        cmd = [
            "rsvg-convert",
            "-w",
            str(SIZE),
            "-h",
            str(SIZE),
            "-b",
            background,
            str(svg_path),
            "-o",
            str(png_path),
        ]
    subprocess.run(cmd, check=True)
    print(f"Wrote {png_path}")


def main() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)
    light_svg = BRAND / "logo-light.svg"
    dark_svg = BRAND / "logo-dark.svg"

    export_png(light_svg, BRAND / "logo-light.png")
    export_png(dark_svg, BRAND / "logo-dark.png")
    export_png(light_svg, BRAND / "logo-light-on-white.png", "#ffffff")
    export_png(dark_svg, BRAND / "logo-dark-on-black.png", "#0b0b0b")

    for name, bg in (("logo-light", "#ffffff"), ("logo-dark", "#0b0b0b")):
        subprocess.run(
            [
                "rsvg-convert",
                "-w",
                "512",
                "-h",
                "512",
                "-b",
                bg,
                str(BRAND / f"{name}.svg"),
                "-o",
                str(BRAND / f"{name}-512.png"),
            ],
            check=True,
        )
        print(f"Wrote {BRAND / f'{name}-512.png'}")


if __name__ == "__main__":
    main()