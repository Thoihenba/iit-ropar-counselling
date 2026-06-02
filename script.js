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

    // ─── RANK TRENDS (tabbed by category + seat pool) ─────────
    const trendsGrid = document.getElementById('trends-grid');

    function renderRankTrends() {
        if (!trendsGrid) return;
        const data = siteData.rankTrends || {};

        // Clear
        trendsGrid.innerHTML = '';

        const categories = ['General','EWS','OBC-NCL','SC','ST'].filter(c => data[c]);

        // Build category tabs
        const catWrap = document.createElement('div');
        catWrap.className = 'rank-cat-tabs';

        let activeCat = categories[0] || null;
        categories.forEach((cat, i) => {
            const b = document.createElement('button');
            b.className = 'rank-cat' + (i===0 ? ' active' : '');
            b.textContent = cat;
            b.addEventListener('click', () => {
                catWrap.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
                b.classList.add('active');
                activeCat = cat;
                renderPoolTabs(activeCat);
            });
            catWrap.appendChild(b);
        });

        trendsGrid.appendChild(catWrap);

        // Category rank note element (updated on category change)
        const catNote = document.createElement('div');
        catNote.className = 'category-rank-note';
        catNote.style.margin = '8px 0 10px';
        catNote.style.color = 'var(--text-muted)';
        catNote.style.display = 'none';
        trendsGrid.appendChild(catNote);

        const poolContainer = document.createElement('div');
        poolContainer.className = 'rank-pool-wrap';
        trendsGrid.appendChild(poolContainer);

        function renderPoolTabs(category) {
            poolContainer.innerHTML = '';
            // Update shared category rank note if present
            const catMeta = siteData.rankTrends[category] || {};
            if (catMeta.categoryRank) {
                catNote.textContent = `${catMeta.categoryRank} (category rank)`;
                catNote.style.display = 'block';
            } else {
                catNote.style.display = 'none';
            }
            const pools = ['Gender Neutral','Female'];
            let activePool = pools[0];

            const poolTabs = document.createElement('div');
            poolTabs.className = 'rank-pool-tabs';
            pools.forEach((p, idx) => {
                const btn = document.createElement('button');
                btn.className = 'rank-pool' + (idx===0 ? ' active' : '');
                btn.textContent = p;
                btn.addEventListener('click', () => {
                    poolTabs.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
                    btn.classList.add('active');
                    activePool = p;
                    renderTable(category, activePool);
                });
                poolTabs.appendChild(btn);
            });

            poolContainer.appendChild(poolTabs);

            const tableWrap = document.createElement('div');
            tableWrap.className = 'rank-table-wrap';
            poolContainer.appendChild(tableWrap);

            renderTable(category, activePool);

            function renderTable(catKey, poolKey) {
                const tableData = (siteData.rankTrends[catKey] && siteData.rankTrends[catKey][poolKey]) || {};
                const branches = Object.keys(tableData);
                tableWrap.innerHTML = '';

                const table = document.createElement('table');
                table.className = 'data-table rank-trends-table';
                table.innerHTML = `
                    <thead><tr><th>Branch</th><th>2023</th><th>2024</th><th>2025</th></tr></thead>
                    <tbody></tbody>
                `;

                const tbody = table.querySelector('tbody');
                if (branches.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" style="color:var(--text-muted);">No data available for ${catKey} / ${poolKey} (Round 5)</td></tr>`;
                } else {
                    branches.forEach(branch => {
                        const v = tableData[branch] || {};
                        const r2023 = v.y2023 || 'N/A';
                        const r2024 = v.y2024 || 'N/A';
                        const r2025 = v.y2025 || 'N/A';
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${branch}</td><td>${r2023}</td><td>${r2024}</td><td>${r2025}</td>`;
                        tbody.appendChild(tr);
                    });
                }

                tableWrap.appendChild(table);
            }
        }

        // init
        if (activeCat) renderPoolTabs(activeCat);
    }

    renderRankTrends();

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
