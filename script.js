document.addEventListener('DOMContentLoaded', () => {
    
    // --- Initialize Dynamic Particles ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
                color: { value: "#d4af37" },
                links: { color: "#d4af37", distance: 150, enable: true, opacity: 0.15, width: 1 },
                move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: { default: "bounce" } },
                number: { density: { enable: true, area: 800 }, value: 60 },
                opacity: { value: 0.4 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 2.5 } }
            },
            detectRetina: true
        });
    }

    // --- Intersection Observer for Dynamic Background Glow ---
    const predictorSection = document.getElementById('predictor-section');
    const navbar = document.querySelector('.navbar');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of predictor section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add scrolled class to trigger background glow
                document.body.classList.add('scrolled');
                // Optional: make navbar transparent when at top, solid when scrolled
                navbar.style.background = "rgba(0, 0, 0, 0.9)";
            } else {
                // Remove scrolled class
                document.body.classList.remove('scrolled');
                navbar.style.background = "var(--bg-dark)";
            }
        });
    }, observerOptions);

    if (predictorSection) {
        sectionObserver.observe(predictorSection);
    }


    // --- Trends Grid Generation ---
    const trendsGrid = document.getElementById('trends-grid');

    // Data for 3-Year Rank Trends (Real JoSAA Data: General, Gender-Neutral, Round 6)
    const branchTrends = [
        { branch: 'Computer Science Eng', y2023: '1763 - 1859', y2024: '1158 - 2379', y2025: '1500 - 2512' },
        { branch: 'AI & Data Eng', y2023: 'N/A', y2024: '1800 - 2656', y2025: '1900 - 2800' },
        { branch: 'Electrical Eng', y2023: '5045 - 5832', y2024: '3406 - 5528', y2025: '4200 - 6311' },
        { branch: 'Engineering Physics', y2023: 'N/A', y2024: '7500 - 9142', y2025: 'N/A' },
        { branch: 'Mechanical Eng', y2023: '8344 - 8926', y2024: '6602 - 8636', y2025: '7500 - 9115' },
        { branch: 'Chemical Eng', y2023: '10032 - 11041', y2024: '8597 - 10097', y2025: '9100 - 10655' },
        { branch: 'Civil Eng', y2023: '10849 - 13078', y2024: '9223 - 11365', y2025: '9800 - 12488' },
        { branch: 'Materials Eng', y2023: '11813 - 14524', y2024: '10115 - 13009', y2025: '11500 - 13777' }
    ];

    if (trendsGrid) {
        const formatRank = (rankStr) => {
            if (rankStr === 'N/A') return `<span class="trend-rank-na">N/A</span>`;
            const parts = rankStr.split(' - ');
            if (parts.length === 2) {
                return `
                    <div class="trend-rank-stack">
                        <span class="rank-open" title="Opening Rank">${parts[0]}</span>
                        <div class="rank-divider"></div>
                        <span class="rank-close" title="Closing Rank">${parts[1]}</span>
                    </div>
                `;
            }
            return `<span class="trend-rank">${rankStr}</span>`;
        };

        branchTrends.forEach(trend => {
            const cardHTML = `
                <div class="trend-card">
                    <div class="trend-card-title">${trend.branch}</div>
                    <div class="trend-data-row">
                        <div class="trend-col">
                            <span class="trend-year">2023</span>
                            ${formatRank(trend.y2023)}
                        </div>
                        <i class='bx bx-right-arrow-alt trend-arrow'></i>
                        <div class="trend-col">
                            <span class="trend-year">2024</span>
                            ${formatRank(trend.y2024)}
                        </div>
                        <i class='bx bx-right-arrow-alt trend-arrow'></i>
                        <div class="trend-col">
                            <span class="trend-year">2025</span>
                            ${formatRank(trend.y2025)}
                        </div>
                    </div>
                </div>
            `;
            trendsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
});
