// ============================================================
// IIT Ropar Counselling — Site Data
// Fill in the placeholder values with your actual content.
// ============================================================

const siteData = {

    // ─── ABOUT IIT ROPAR ────────────────────────────────────
    about: {
        description: "Founded in 2008, IIT Ropar is one of India's premier engineering institutions, located in Rupnagar, Punjab. Known for its cutting-edge research, innovative curriculum, and a vibrant campus culture, IIT Ropar is rapidly emerging as a top destination for JEE Advanced qualifiers.",
        officialWebsiteUrl: "https://www.iitrpr.ac.in/",
    },

    // ─── RANK TRENDS (already exists in script.js) ──────────
    // Kept in script.js for backward compatibility.

    // ─── BRANCH CHANGE POLICY ───────────────────────────────
    branchChange: {
        description: "IIT Ropar allows branch changes after the first year based on academic performance. Students must meet the CGPA cutoff for their desired branch, subject to seat availability. This policy gives students the flexibility to explore and switch to a discipline that better aligns with their interests.",
        cutoffs: [
            // TODO: Fill in actual CGPA cutoffs for branch change
            { branch: "Computer Science (CSE)", cgpa: "—" },
            { branch: "AI & Data Eng", cgpa: "—" },
            { branch: "Mathematics & Computing", cgpa: "—" },
            { branch: "Electrical Eng (EE)", cgpa: "—" },
            { branch: "IC Design & Technology", cgpa: "—" },
            { branch: "Mechanical Eng (ME)", cgpa: "—" },
            { branch: "Chemical Eng", cgpa: "—" },
            { branch: "Civil Eng", cgpa: "—" },
            { branch: "Metallurgical & Materials", cgpa: "—" },
            { branch: "Biomedical Eng", cgpa: "—" },
        ],
    },

    // ─── ACADEMICS — FIRST YEAR ─────────────────────────────
    academics: {
        orientation: {
            title: "Orientation Programme",
            description: "Before the semester begins, all freshmen participate in a comprehensive orientation programme designed to help students acclimatize to college life, build peer connections, and get familiar with the campus, faculty, and academic expectations.",
            linkUrl: "",   // TODO: Add link if available
            linkText: "Learn More",
        },
        firstSemCourses: [
            // TODO: Fill in actual first-semester courses
            "Mathematics I",
            "Physics I",
            "Introduction to Computing",
            "Engineering Graphics",
            "Communication Skills",
            "Workshop Practice",
            "Physical Education",
        ],
    },

    // ─── CAMPUS LIFE ────────────────────────────────────────
    campus: {
        hostels: {
            title: "Hostels",
            description: "Modern hostel facilities with well-furnished rooms, high-speed Wi-Fi, common rooms, and 24/7 security. The campus provides a comfortable and safe living environment for all students.",
        },
        mess: {
            title: "Mess & Dining",
            description: "The mess serves nutritious and hygienic meals with a rotating menu catering to diverse dietary preferences. Students can also enjoy food from multiple canteens and cafés on campus.",
            menuUrl: "", // TODO: Add mess menu link if available
        },
        clubs: {
            title: "Clubs & Sports",
            description: "A thriving ecosystem of technical, cultural, and sports clubs. From robotics to dramatics, hackathons to inter-IIT competitions, students have ample opportunities to explore their passions beyond academics.",
        },
    },

    // ─── FAQ ────────────────────────────────────────────────
    faq: {
        "Admissions": [
            // TODO: Fill in actual FAQ content
            {
                q: "What is the JoSAA counselling process?",
                a: "JoSAA (Joint Seat Allocation Authority) conducts centralised counselling for admission to IITs, NITs, IIITs, and GFTIs. Candidates fill choices based on their JEE Advanced rank, and seats are allotted through multiple rounds based on rank, category, and availability.",
            },
            {
                q: "What are the seat categories available?",
                a: "Seats are available under various categories including OPEN, OBC-NCL, SC, ST, EWS, and PwD. Each category has separate opening and closing ranks.",
            },
            {
                q: "Can I change my branch after joining?",
                a: "Yes, IIT Ropar allows branch changes after the first year based on CGPA and seat availability. Refer to the Branch Change Policy section for details.",
            },
            {
                q: "What documents are required during reporting?",
                a: "You will need your JEE Advanced admit card, scorecard, Class 10 & 12 marksheets, category certificates (if applicable), passport-size photographs, and a medical fitness certificate.",
            },
        ],
        "Academics": [
            {
                q: "What is the grading system at IIT Ropar?",
                a: "IIT Ropar follows a relative grading system on a 10-point CGPA scale. Grades range from AP (10) to F (0), and the CGPA is calculated as a weighted average across all courses.",
            },
            {
                q: "Are there minor/dual degree options?",
                a: "Yes, students can opt for minors in different departments or pursue interdisciplinary programmes, subject to eligibility and seat availability.",
            },
            {
                q: "How are courses structured in the first year?",
                a: "The first year is common for all branches and covers fundamental courses in mathematics, physics, computing, and engineering. Branch-specific courses begin from the second year.",
            },
        ],
        "Campus Life": [
            {
                q: "Are hostels air-conditioned?",
                a: "Hostel facilities vary. Please check with the administration for the latest information about air conditioning and other amenities in specific hostel blocks.",
            },
            {
                q: "What sports facilities are available?",
                a: "IIT Ropar offers facilities for cricket, football, basketball, tennis, badminton, volleyball, athletics, and a well-equipped gymnasium. The campus also hosts annual sports events and participates in Inter-IIT competitions.",
            },
            {
                q: "Is there a medical facility on campus?",
                a: "Yes, there is a health centre on campus providing primary medical care. For advanced treatment, tie-ups with nearby hospitals in Rupnagar and Chandigarh are available.",
            },
        ],
        "Placements": [
            {
                q: "What is the placement record of IIT Ropar?",
                a: "IIT Ropar has a strong placement record with top companies from IT, core engineering, consulting, and finance sectors visiting the campus. Specific statistics are updated annually.",
            },
            {
                q: "Which companies visit for placements?",
                a: "Major recruiters include companies like Google, Microsoft, Goldman Sachs, Samsung, Qualcomm, and many others from diverse sectors.",
            },
            {
                q: "Are internship opportunities available?",
                a: "Yes, the Training & Placement Cell facilitates summer internships after the second and third years. Many students also secure international research internships through programmes like MITACS and DAAD.",
            },
        ],
    },

    // ─── FOOTER ─────────────────────────────────────────────
    footer: {
        tagline: "A student initiative for JEE Advanced aspirants exploring IIT Ropar.",
        quickLinks: [
            { text: "Home", href: "#welcome-section" },
            { text: "Rank Trends", href: "#predictor-section" },
            { text: "Branch Change", href: "#branch-change" },
            { text: "FAQ", href: "#faq-section" },
        ],
        dataSources: [
            { text: "JoSAA Official", href: "https://josaa.nic.in" },
            { text: "IIT Ropar Official", href: "https://www.iitrpr.ac.in/" },
        ],
        credit: "© 2026 IIT Ropar Counselling. Data sourced from public JoSAA archives.",
    },
};
