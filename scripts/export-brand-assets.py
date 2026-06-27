#!/usr/bin/env python3
"""Export final ZPD brand assets for Stripe and web."""

from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
STRIPE = BRAND / "stripe"

COLORS = {
    "brand": {
        "name": "ZPD Indigo",
        "hex": "#4F46E5",
        "usage": "Primary brand colour — matches site gradient and CTAs",
    },
    "accent": {
        "name": "ZPD Violet",
        "hex": "#7C3AED",
        "usage": "Accent colour — gradient end-point and highlights",
    },
    "logo": {
        "light": {
            "mark": "#0F172A",
            "ring": "#D1D5DB",
            "background": "#FFFFFF",
        },
        "dark": {
            "mark": "#F8FAFC",
            "ring": "#64748B",
            "background": "#0F172A",
        },
    },
}


def export_png(svg: Path, png: Path, size: int, background: str) -> None:
    subprocess.run(
        [
            "rsvg-convert",
            "-w",
            str(size),
            "-h",
            str(size),
            "-b",
            background,
            str(svg),
            "-o",
            str(png),
        ],
        check=True,
    )
    kb = png.stat().st_size / 1024
    print(f"Wrote {png} ({size}x{size}, {kb:.1f} KB)")


def main() -> None:
    if BRAND.exists():
        for child in BRAND.iterdir():
            if child.name in {".DS_Store"}:
                child.unlink()
            elif child.is_dir():
                shutil.rmtree(child)
            else:
                child.unlink()

    BRAND.mkdir(parents=True, exist_ok=True)
    STRIPE.mkdir(parents=True, exist_ok=True)

    light_svg = BRAND / "logo-light.svg"
    dark_svg = BRAND / "logo-dark.svg"

    light_svg.write_text(
        """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" role="img" aria-label="ZPD Learning logo">
  <circle cx="512" cy="512" r="330" stroke="#D1D5DB" stroke-width="2.5" fill="none"/>
  <text x="512" y="561" text-anchor="middle" font-family="Inter, Helvetica Neue, Helvetica, Arial, sans-serif" font-size="140" font-weight="700" letter-spacing="0.04em" fill="#0F172A">ZPD</text>
</svg>
""",
        encoding="utf-8",
    )

    dark_svg.write_text(
        """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" role="img" aria-label="ZPD Learning logo">
  <circle cx="512" cy="512" r="330" stroke="#64748B" stroke-width="2.5" fill="none"/>
  <text x="512" y="561" text-anchor="middle" font-family="Inter, Helvetica Neue, Helvetica, Arial, sans-serif" font-size="140" font-weight="700" letter-spacing="0.04em" fill="#F8FAFC">ZPD</text>
</svg>
""",
        encoding="utf-8",
    )

    (BRAND / "colors.json").write_text(
        json.dumps(COLORS, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {BRAND / 'colors.json'}")

    export_png(light_svg, STRIPE / "icon-light.png", 128, COLORS["logo"]["light"]["background"])
    export_png(dark_svg, STRIPE / "icon-dark.png", 128, COLORS["logo"]["dark"]["background"])
    export_png(light_svg, STRIPE / "logo-light.png", 512, COLORS["logo"]["light"]["background"])
    export_png(dark_svg, STRIPE / "logo-dark.png", 512, COLORS["logo"]["dark"]["background"])

    print(f"Wrote {light_svg}")
    print(f"Wrote {dark_svg}")


if __name__ == "__main__":
    main()