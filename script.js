document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictor-form');
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');
    const resultsList = document.getElementById('results-list');
    const resultsMeta = document.getElementById('results-meta');

    // Mock Data for demonstration purposes
    const mockBranches = [
        { name: 'Computer Science and Engineering', code: 'CSE', closingRank: 1800 },
        { name: 'Mathematics and Computing', code: 'MnC', closingRank: 2500 },
        { name: 'Electrical Engineering', code: 'EE', closingRank: 3800 },
        { name: 'Mechanical Engineering', code: 'ME', closingRank: 6500 },
        { name: 'Chemical Engineering', code: 'CE', closingRank: 8500 },
        { name: 'Civil Engineering', code: 'CV', closingRank: 10500 },
        { name: 'Metallurgical and Materials Engineering', code: 'MME', closingRank: 12500 }
    ];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Form Values
        const rank = parseInt(document.getElementById('rank').value);
        const category = document.getElementById('category').value;
        const gender = document.getElementById('gender').value;

        if (!rank || !category || !gender) return;

        // Button Loading State
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>Analyzing...</span>`;
        submitBtn.style.opacity = '0.8';
        submitBtn.disabled = true;

        // Simulate API call / processing delay
        setTimeout(() => {
            generateResults(rank, category, gender);
            
            // Restore Button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        }, 1200);
    });

    function generateResults(rank, category, gender) {
        // Clear previous results
        resultsList.innerHTML = '';
        
        // Update Meta Header
        resultsMeta.textContent = `Rank: ${rank} | ${category} | ${gender}`;

        // Generate prediction logic (mocked)
        // In reality, this would filter based on actual category/gender specific cutoffs
        
        let hasChances = false;

        mockBranches.forEach(branch => {
            // Apply some dummy multipliers for category just for visual effect
            let adjustedClosingRank = branch.closingRank;
            if (category === 'OBC-NCL') adjustedClosingRank *= 1.3;
            if (category === 'SC') adjustedClosingRank *= 2.5;
            if (category === 'ST') adjustedClosingRank *= 3.5;
            if (gender === 'Female-Only') adjustedClosingRank *= 1.2;
            
            // Determine chance
            let chanceText = '';
            let chanceClass = '';
            
            if (rank <= adjustedClosingRank * 0.8) {
                chanceText = 'High Chance';
                chanceClass = 'chance-high';
                hasChances = true;
            } else if (rank <= adjustedClosingRank) {
                chanceText = 'Borderline';
                chanceClass = 'chance-medium';
                hasChances = true;
            } else if (rank <= adjustedClosingRank * 1.2) {
                chanceText = 'Tough / Spot Round';
                chanceClass = 'chance-low';
            } else {
                return; // Hide branches that are way out of reach
            }

            // Create Result Item
            const resultHTML = `
                <div class="result-item">
                    <div class="branch-info">
                        <h4>${branch.name} (${branch.code})</h4>
                        <p>Expected Cutoff Trend: ~${Math.round(adjustedClosingRank)}</p>
                    </div>
                    <div class="chance-badge ${chanceClass}">
                        ${chanceText}
                    </div>
                </div>
            `;
            
            resultsList.insertAdjacentHTML('beforeend', resultHTML);
        });

        if (resultsList.innerHTML === '') {
            resultsList.innerHTML = `
                <div class="result-item" style="justify-content: center; text-align: center;">
                    <div class="branch-info">
                        <h4 style="color: var(--text-muted);">No branches matched for this rank range at IIT Ropar.</h4>
                    </div>
                </div>
            `;
        }

        // Show results container smoothly
        resultsContainer.classList.remove('hidden');
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
