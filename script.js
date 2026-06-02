document.addEventListener('DOMContentLoaded', () => {

    // ─── HAMBURGER MENU ─────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // ─── NAVBAR SCROLL BEHAVIOR ─────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            document.body.classList.add('scrolled');
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.65)';
            document.body.classList.remove('scrolled');
        }
    });

    // ─── SCROLL ANIMATIONS ──────────────────────────────────
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const floatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => floatObserver.observe(el));

    // ─── TYPEWRITER ─────────────────────────────────────────
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        typewriterElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // ═══════════════════════════════════════════════════════════
    // POPULATE SECTIONS FROM site-data.js
    // ═══════════════════════════════════════════════════════════

    if (typeof siteData === 'undefined') {
        console.warn('site-data.js not loaded');
        return;
    }

    // ─── ABOUT ──────────────────────────────────────────────
    const aboutDesc = document.getElementById('about-description');
    const aboutLink = document.getElementById('about-link');
    if (aboutDesc) aboutDesc.textContent = siteData.about.description;
    if (aboutLink) aboutLink.href = siteData.about.officialWebsiteUrl;

    // ─── RANK TRENDS ────────────────────────────────────────
    const trendsGrid = document.getElementById('trends-grid');

    const branchTrends = [
        { branch: 'Computer Science Eng', y2023: '1763 - 1859', y2024: '1158 - 2379', y2025: '1500 - 2512' },
        { branch: 'AI & Data Eng', y2023: 'N/A', y2024: '1800 - 2656', y2025: '1900 - 2800' },
        { branch: 'Math & Computing', y2023: 'N/A', y2024: '2800 - 3518', y2025: '3100 - 3954' },
        { branch: 'Electrical Eng', y2023: '5045 - 5832', y2024: '3406 - 5528', y2025: '4200 - 6311' },
        { branch: 'IC Design & Tech', y2023: 'N/A', y2024: '3815 - 4349', y2025: '4120 - 4652' },
        { branch: 'Mechanical Eng', y2023: '8344 - 8926', y2024: '6602 - 8636', y2025: '7500 - 9115' },
        { branch: 'Chemical Eng', y2023: '10032 - 11041', y2024: '8597 - 10097', y2025: '9100 - 10655' },
        { branch: 'Civil Eng', y2023: '10849 - 13078', y2024: '9223 - 11365', y2025: '9800 - 12488' },
        { branch: 'Materials Eng', y2023: '11813 - 14524', y2024: '10115 - 13009', y2025: '11500 - 13777' },
        { branch: 'Digital Agriculture', y2023: 'N/A', y2024: 'N/A', y2025: '12000 - 14480' }
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
            trendsGrid.insertAdjacentHTML('beforeend', `
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
            `);
        });
    }

    // ─── BRANCH CHANGE ──────────────────────────────────────
    const bcDesc = document.getElementById('branch-change-description');
    const bcTable = document.querySelector('#branch-change-table tbody');

    if (bcDesc) bcDesc.textContent = siteData.branchChange.description;
    if (bcTable) {
        siteData.branchChange.cutoffs.forEach(row => {
            bcTable.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${row.branch}</td>
                    <td>${row.cgpa}</td>
                </tr>
            `);
        });
    }

    // ─── ACADEMICS ──────────────────────────────────────────
    const oriTitle = document.getElementById('orientation-title');
    const oriDesc = document.getElementById('orientation-description');
    const oriLink = document.getElementById('orientation-link');
    const coursesList = document.getElementById('courses-list');

    if (oriTitle) oriTitle.textContent = siteData.academics.orientation.title;
    if (oriDesc) oriDesc.textContent = siteData.academics.orientation.description;
    if (oriLink) {
        if (siteData.academics.orientation.linkUrl) {
            oriLink.href = siteData.academics.orientation.linkUrl;
            oriLink.innerHTML = siteData.academics.orientation.linkText + " <i class='bx bx-right-arrow-alt'></i>";
        } else {
            oriLink.style.display = 'none';
        }
    }

    if (coursesList) {
        siteData.academics.firstSemCourses.forEach(course => {
            coursesList.insertAdjacentHTML('beforeend', `<li>${course}</li>`);
        });
    }

    // ─── CAMPUS LIFE ────────────────────────────────────────
    const campusGrid = document.getElementById('campus-grid');
    if (campusGrid) {
        const campusItems = [
            siteData.campus.hostels,
            siteData.campus.mess,
            siteData.campus.clubs,
        ];

        campusItems.forEach((item, idx) => {
            let linkHtml = '';
            if (item.menuUrl) {
                linkHtml = `<a href="${item.menuUrl}" target="_blank" rel="noopener" class="btn-minimal">View Menu <i class='bx bx-right-arrow-alt'></i></a>`;
            }
            campusGrid.insertAdjacentHTML('beforeend', `
                <div class="info-card animate-on-scroll delay-${idx + 1}">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    ${linkHtml}
                </div>
            `);
        });

        // Re-observe newly added elements
        campusGrid.querySelectorAll('.animate-on-scroll').forEach(el => floatObserver.observe(el));
    }

    // ─── FAQ ────────────────────────────────────────────────
    const faqTabs = document.getElementById('faq-tabs');
    const faqAccordion = document.getElementById('faq-accordion');

    if (faqTabs && faqAccordion) {
        const categories = Object.keys(siteData.faq);
        let activeCategory = categories[0];

        // Render tabs
        categories.forEach((cat, idx) => {
            const btn = document.createElement('button');
            btn.className = 'faq-tab' + (idx === 0 ? ' active' : '');
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                activeCategory = cat;
                document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                renderFAQ(cat);
            });
            faqTabs.appendChild(btn);
        });

        function renderFAQ(category) {
            faqAccordion.innerHTML = '';
            const items = siteData.faq[category] || [];

            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'faq-item';
                div.innerHTML = `
                    <button class="faq-question">
                        <span>${item.q}</span>
                        <i class='bx bx-plus faq-icon'></i>
                    </button>
                    <div class="faq-answer-wrap">
                        <div class="faq-answer">${item.a}</div>
                    </div>
                `;

                const question = div.querySelector('.faq-question');
                const answerWrap = div.querySelector('.faq-answer-wrap');

                question.addEventListener('click', () => {
                    const isOpen = div.classList.contains('open');

                    // Close all others in this accordion
                    faqAccordion.querySelectorAll('.faq-item.open').forEach(openItem => {
                        openItem.classList.remove('open');
                        openItem.querySelector('.faq-answer-wrap').style.maxHeight = '0';
                    });

                    // Toggle this one
                    if (!isOpen) {
                        div.classList.add('open');
                        answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px';
                    }
                });

                faqAccordion.appendChild(div);
            });
        }

        renderFAQ(activeCategory);
    }

    // ─── FOOTER ─────────────────────────────────────────────
    const footer = document.getElementById('site-footer');
    if (footer && siteData.footer) {
        const f = siteData.footer;
        
        const quickLinksHtml = f.quickLinks.map(l => 
            `<li><a href="${l.href}">${l.text}</a></li>`
        ).join('');

        const dataSourcesHtml = f.dataSources.map(l => 
            `<li><a href="${l.href}" target="_blank" rel="noopener">${l.text}</a></li>`
        ).join('');

        footer.innerHTML = `
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-brand-text">IIT Ropar Counselling</div>
                    <p class="footer-tagline">${f.tagline}</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>${quickLinksHtml}</ul>
                </div>
                <div class="footer-col">
                    <h4>Data Sources</h4>
                    <ul>${dataSourcesHtml}</ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${f.credit}</p>
            </div>
        `;
    }
});
