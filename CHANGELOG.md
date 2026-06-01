# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- Pivoted primary feature from a dynamic Rank Predictor form to a static 3-Year Rank Trends Dashboard grid.
- Redesigned UI/UX from Glassmorphism (Blue/Slate) to a Monolithic Power aesthetic (Black & Gold).
- Restructured layout into two distinct full-screen sections (Welcome Hero and Rank Predictor) to improve pacing and impact.
- Expanded branch abbreviations to their full names (e.g., 'ME' -> 'Mechanical Eng').
- Replaced mock trend data with official real-world JoSAA opening/closing ranks (General Category, Round 6) for 2023, 2024, and 2025.
- Fixed UI overlap issues by implementing a vertical rank-stack layout (Opening rank on top, Closing rank on bottom) and increasing card widths.
- Made Welcome Hero section transparent to reveal the majestic dynamic particles beneath it.
- Implemented an `IntersectionObserver` in JavaScript to dynamically toggle background glows based on scroll position.
- Removed translucent backgrounds, replacing them with stark, solid off-black cards for an authoritative feel.

### Added
- Added `tsParticles` library for a majestic, slow-moving golden particle network in the background.
- Changed Navbar logo text to 'IIT Ropar 2026 Counselling'
- Initial project structure (`index.html`, `style.css`, `script.js`).
- Rank Trends grid displaying mock 2023-2025 cutoff data for IIT Ropar branches.
