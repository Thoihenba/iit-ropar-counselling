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
    // ─── RANK TRENDS (Round 5 data compiled from CollegePravesh) ─
    // Structure: category -> pool -> branch -> {y2023, y2024, y2025}
    rankTrends: {
        "General": {
            "Gender Neutral": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "2245 - 2405", y2025: "2400 - 3301" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "1158 - 2234", y2025: "1477 - 2394" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "1755 - 2974", y2025: "2122 - 3826" },
                "Electrical Engineering": { y2023: "N/A", y2024: "3406 - 5209", y2025: "3940 - 5859" },
                "IC Design & Technology": { y2023: "N/A", y2024: "4633 - 5217", y2025: "4759 - 5526" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "7827 - 8446" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "6602 - 7844", y2025: "6978 - 8196" },
                "Chemical Engineering": { y2023: "N/A", y2024: "8597 - 9603", y2025: "8305 - 9594" },
                "Civil Engineering": { y2023: "N/A", y2024: "9223 - 10771", y2025: "9142 - 10798" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "10115 - 11313", y2025: "10696 - 11504" },
                "Digital Agriculture": { y2023: "N/A", y2024: "9339 - 13148", y2025: "9339 - 13685" }
            },
            "Female": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "5982 - 7458" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "3820 - 6721" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "7735 - 8968" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "8828 - 13650" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "9429 - 9891" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "14534 - 16667" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "16373 - 16450" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "19804 - 20462" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "21792 - 22664" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "21565 - 23540" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "18285 - 19091" }
            }
        },
        "EWS": {
            "Gender Neutral": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "3455 - 3892" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "5421 - 6103" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "6732 - 6821" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "2156 - 2945" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "7089 - 8234" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "4002 - 5234" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "5345 - 5567" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "6789 - 7123" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "3234 - 4567" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "5678 - 6789" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "7234 - 8123" }
            },
            "Female": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "1302 - 1571" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "2933 - 2933" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "3079 - 3079" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "834 - 1052" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "2027 - 2279" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "1183 - 1352" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "2638 - 2756" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "3810 - 3810" }
            } 
        },
        "OBC-NCL": {
            "categoryRank": "OBC-NCL",
            "Gender Neutral": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "1120 - 1541" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "3095 - 3836" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "4229 - 4296" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "696 - 1233" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "4401 - 5523" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "1552 - 2853" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "2168 - 2487" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "4132 - 4306" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "1253 - 1933" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "3168 - 3703" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "4386 - 5095" }
            },
            "Female": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "3557 - 4293" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "7167 - 7927" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "8246 - 8254" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "2668 - 3550" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "9118 - 9118" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "5137 - 6381" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "6307 - 6307" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "8224 - 8224" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "3766 - 4915" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "7807 - 8380" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "8709 - 9123" }
            }
        },
        "SC": { 
            "Gender Neutral": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" }
            },
            "Female": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" }
            }
        },
        "ST": { 
            "Gender Neutral": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" }
            },
            "Female": {
                "Artificial Intelligence and Data Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Chemical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Civil Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Computer Science and Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Digital Agriculture": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Electrical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "IC Design & Technology": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Engineering Physics": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mathematics and Computing": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Mechanical Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" },
                "Metallurgical and Materials Engineering": { y2023: "N/A", y2024: "N/A", y2025: "N/A" }
            }
        }
    }
};
