export interface SeoPageData {
  slug: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const seoPages: Record<string, SeoPageData> = {
  // Existing ones...
  "ai-resume-builder": {
    slug: "ai-resume-builder",
    title: "AI Resume Builder | Fast, Professional, ATS-Friendly",
    description: "Build an outstanding professional resume with our advanced AI Resume Builder. Generates bullet points, checks ATS score, and formats instantly.",
    heroHeadline: "The Ultimate AI Resume Builder",
    heroSubheadline: "Leverage artificial intelligence to write your resume in minutes. Get hired faster with ATS-optimized templates.",
    features: [
      { title: "Smart Content Generation", description: "Our AI analyzes your job title and automatically generates tailored achievements." },
      { title: "Real-Time ATS Scoring", description: "Get instant feedback on your resume's compatibility with Applicant Tracking Systems." },
      { title: "One-Click Formatting", description: "Never struggle with margins again. Our AI templates format everything perfectly." },
    ],
    faqs: [
      { question: "How does the AI resume builder work?", answer: "You simply enter your job title and basic details, and our AI generates professional bullet points and summaries tailored to your career." },
      { question: "Is it really free?", answer: "Yes, you can create, edit, and download your resume completely free of charge." },
    ],
  },
  "free-resume-builder": {
    slug: "free-resume-builder",
    title: "100% Free Resume Builder | No Hidden Fees",
    description: "Use our entirely free resume builder to create a professional CV. No paywalls, no credit cards required, just a beautiful resume.",
    heroHeadline: "The Best Free Resume Builder Online",
    heroSubheadline: "Why pay when you can build a premium, world-class resume for free? Start building now with zero hidden costs.",
    features: [
      { title: "Truly Free Forever", description: "We believe everyone deserves a great resume without paying a premium." },
      { title: "Export to PDF", description: "Download your pixel-perfect resume in PDF format instantly." },
      { title: "Unlimited Edits", description: "Tweak, update, and manage multiple versions of your resume without limits." },
    ],
    faqs: [
      { question: "Are there really no hidden fees?", answer: "Absolutely. Our free resume builder is 100% free with no surprise paywalls at the end." },
      { question: "Can I download my resume as a PDF?", answer: "Yes! You can instantly download your finished resume as a high-quality PDF." },
    ],
  },
  "cover-letter-generator": {
    slug: "cover-letter-generator",
    title: "AI Cover Letter Generator | Tailored Instantly",
    description: "Generate a perfectly tailored cover letter in seconds. Our AI analyzes the job description and your resume to write a compelling letter.",
    heroHeadline: "Instant AI Cover Letter Generator",
    heroSubheadline: "Stop agonizing over cover letters. Our AI reads your resume and the job posting to write a perfect, customized letter instantly.",
    features: [
      { title: "Hyper-Personalized", description: "Matches your unique skills exactly to what the employer is asking for." },
      { title: "Professional Tone", description: "Maintains a confident, professional voice that impresses hiring managers." },
      { title: "Saves Hours", description: "What used to take an hour now takes 10 seconds." },
    ],
    faqs: [
      { question: "How does the cover letter generator work?", answer: "You paste in the job description, and our AI cross-references it with your saved resume to draft a highly relevant letter." },
    ],
  },
  "resume-checker": {
    slug: "resume-checker",
    title: "Free ATS Resume Checker & Score",
    description: "Upload your resume to get an instant ATS score. Our resume checker identifies errors, missing keywords, and formatting issues.",
    heroHeadline: "Free Instant Resume Checker",
    heroSubheadline: "Find out if your resume is holding you back. Get a comprehensive score and actionable feedback in seconds.",
    features: [
      { title: "Instant Scoring", description: "Get a score out of 100 based on ATS best practices." },
      { title: "Keyword Gap Analysis", description: "See exactly which important industry keywords you are missing." },
      { title: "Actionable Feedback", description: "Clear instructions on how to fix every issue we find." },
    ],
    faqs: [
      { question: "Is the resume checker really free?", answer: "Yes, you can score your resume instantly at no cost." },
    ],
  },
  "cv-builder": {
    slug: "cv-builder",
    title: "Professional CV Builder | Curriculum Vitae Maker",
    description: "Create a comprehensive Curriculum Vitae with our advanced CV Builder. Perfect for academia, medicine, and international jobs.",
    heroHeadline: "The Premium CV Builder",
    heroSubheadline: "Build a detailed, multi-page Curriculum Vitae that perfectly highlights your extensive background and publications.",
    features: [
      { title: "Extended Sections", description: "Dedicated sections for publications, grants, presentations, and more." },
      { title: "Academic Formats", description: "Templates specifically designed for the rigorous standards of academia." },
      { title: "Easy Reordering", description: "Drag and drop sections to highlight what matters most for your specific field." },
    ],
    faqs: [
      { question: "What is the difference between a CV and a Resume?", answer: "A CV (Curriculum Vitae) is a comprehensive document detailing your entire academic and professional history, often used in academia or medicine. A resume is a concise summary tailored for a specific job." },
    ],
  },

  // New Pages explicitly requested by user
  "ats-scanner": {
    slug: "ats-scanner",
    title: "ATS Resume Scanner | Beat the Bots",
    description: "Our ATS Scanner analyzes your resume just like enterprise tracking systems. Check your formatting, keywords, and readability score.",
    heroHeadline: "Beat the Applicant Tracking Systems",
    heroSubheadline: "Test your resume against our proprietary ATS engine. Discover exactly why you're getting rejected and fix it in seconds.",
    features: [
      { title: "Keyword Matching", description: "Compare your resume directly against a job description to find missing keywords." },
      { title: "Formatting Checks", description: "Identify invisible formatting errors that confuse ATS parsers." },
      { title: "Actionable Advice", description: "Get step-by-step instructions on how to improve your score." },
    ],
    faqs: [
      { question: "What does ATS stand for?", answer: "Applicant Tracking System. It's the software companies use to filter candidates." },
    ],
  },
  "ai-writer": {
    slug: "ai-writer",
    title: "AI Resume Writer | Automated Achievements",
    description: "Struggling to write bullet points? Our AI Writer generates compelling, data-driven achievements tailored to your job.",
    heroHeadline: "Your Personal AI Resume Writer",
    heroSubheadline: "Say goodbye to writer's block. Let our advanced AI generate powerful, metric-driven bullet points for your experience.",
    features: [
      { title: "Metric Generation", description: "AI suggests realistic numbers and percentages to quantify your impact." },
      { title: "Tone Matching", description: "Select from professional, creative, or executive writing styles." },
      { title: "Context Aware", description: "Generates bullet points perfectly tailored to the job you are applying for." },
    ],
    faqs: [
      { question: "Can I edit what the AI writes?", answer: "Absolutely. The AI provides a starting point that you can tweak and refine." },
    ],
  },
  "resume-tips": {
    slug: "resume-tips",
    title: "50+ Resume Tips from Top Recruiters",
    description: "Learn the secrets to writing a winning resume. 50+ actionable tips from hiring managers at top tech companies.",
    heroHeadline: "Expert Resume Tips & Tricks",
    heroSubheadline: "We interviewed recruiters from Fortune 500 companies to compile the ultimate list of resume best practices.",
    features: [
      { title: "Action Verbs", description: "Discover the 100 best action verbs to start your bullet points." },
      { title: "Formatting Rules", description: "Learn the golden rules of margins, fonts, and spacing." },
      { title: "Common Mistakes", description: "Avoid the top 10 mistakes that get resumes instantly rejected." },
    ],
    faqs: [
      { question: "How long should my resume be?", answer: "Generally, one page for every 10 years of experience. Keep it concise." },
    ],
  },
  "career-advice": {
    slug: "career-advice",
    title: "Career Advice & Growth Strategies",
    description: "Navigate your career path with confidence. Read our expert guides on salary negotiation, promotions, and career transitions.",
    heroHeadline: "Accelerate Your Career",
    heroSubheadline: "Getting the interview is just step one. Learn how to negotiate offers, secure promotions, and navigate office politics.",
    features: [
      { title: "Salary Negotiation", description: "Scripts and strategies to confidently ask for what you're worth." },
      { title: "Career Transitions", description: "How to pivot to a new industry without starting from scratch." },
      { title: "Leadership Skills", description: "Developing the soft skills necessary to move into management." },
    ],
    faqs: [
      { question: "How do I negotiate my salary?", answer: "Do your research, anchor high, and focus on the value you bring to the company." },
    ],
  },
  "interview-prep": {
    slug: "interview-prep",
    title: "Interview Preparation Guide & Mock Questions",
    description: "Ace your next interview with our comprehensive preparation guides. Common questions, STAR method frameworks, and behavioral tips.",
    heroHeadline: "Ace Your Next Interview",
    heroSubheadline: "Preparation is the key to confidence. Master behavioral questions and technical rounds with our expert frameworks.",
    features: [
      { title: "STAR Method", description: "Learn how to structure your answers using Situation, Task, Action, Result." },
      { title: "Question Bank", description: "Access hundreds of common interview questions by industry." },
      { title: "Mock Interviews", description: "Tips on how to practice effectively before the big day." },
    ],
    faqs: [
      { question: "What is the STAR method?", answer: "A structured manner of responding to behavioral interview questions by discussing the specific Situation, Task, Action, and Result." },
    ],
  },

  // Legal & Info Pages
  "privacy": {
    slug: "privacy",
    title: "Privacy Policy | ResumeAI",
    description: "Read our privacy policy to understand how we protect your data and respect your privacy.",
    heroHeadline: "Privacy Policy",
    heroSubheadline: "We take your privacy seriously. Here is how we collect, use, and protect your data.",
    features: [
      { title: "Data Encryption", description: "Your data is encrypted at rest and in transit." },
      { title: "No Selling Data", description: "We never sell your personal information to third parties." },
      { title: "Full Control", description: "You can delete your account and all associated data at any time." },
    ],
    faqs: [
      { question: "Who has access to my resume?", answer: "Only you. We do not share your resumes with anyone unless you explicitly publish a public link." },
    ],
  },
  "terms": {
    slug: "terms",
    title: "Terms of Service | ResumeAI",
    description: "Our Terms of Service govern your use of the ResumeAI platform and services.",
    heroHeadline: "Terms of Service",
    heroSubheadline: "The rules and guidelines for using the ResumeAI platform.",
    features: [
      { title: "Acceptable Use", description: "Guidelines on how to use our platform responsibly." },
      { title: "Account Security", description: "Your responsibilities regarding keeping your account secure." },
      { title: "Service Availability", description: "Our commitment to keeping the platform online and accessible." },
    ],
    faqs: [
      { question: "Can I use the service for commercial purposes?", answer: "You may use our platform to apply for jobs. Reselling our services is strictly prohibited." },
    ],
  },
  "cookies": {
    slug: "cookies",
    title: "Cookie Policy | ResumeAI",
    description: "Learn about the cookies we use to improve your experience on our platform.",
    heroHeadline: "Cookie Policy",
    heroSubheadline: "How we use cookies to provide a better, faster, and safer experience.",
    features: [
      { title: "Essential Cookies", description: "Cookies required for the basic functionality of the site, like authentication." },
      { title: "Analytics", description: "Cookies used to understand how visitors interact with the website." },
      { title: "Preferences", description: "Cookies used to remember your settings and preferences." },
    ],
    faqs: [
      { question: "Can I opt out of cookies?", answer: "Yes, you can manage your cookie preferences through your browser settings." },
    ],
  },
  "security": {
    slug: "security",
    title: "Security at ResumeAI",
    description: "Learn about our enterprise-grade security practices and infrastructure.",
    heroHeadline: "Enterprise-Grade Security",
    heroSubheadline: "Your career data is sensitive. We protect it with industry-leading security practices.",
    features: [
      { title: "SOC2 Compliance", description: "We are currently undergoing SOC2 Type II certification." },
      { title: "Penetration Testing", description: "Regular third-party security audits and penetration testing." },
      { title: "Bug Bounty", description: "We reward researchers for responsibly disclosing vulnerabilities." },
    ],
    faqs: [
      { question: "How is my data stored?", answer: "Data is stored in secure, SOC2 compliant AWS data centers with AES-256 encryption at rest." },
    ],
  },
  "accessibility": {
    slug: "accessibility",
    title: "Accessibility Statement | ResumeAI",
    description: "Our commitment to making our platform accessible to everyone.",
    heroHeadline: "Accessibility Statement",
    heroSubheadline: "We believe everyone deserves the tools to build a great career, regardless of ability.",
    features: [
      { title: "WCAG 2.1 AA", description: "We strive to meet WCAG 2.1 AA accessibility standards." },
      { title: "Screen Readers", description: "Our builder is optimized for popular screen reading software." },
      { title: "Keyboard Navigation", description: "Full keyboard support for all core functionality." },
    ],
    faqs: [
      { question: "Found an accessibility issue?", answer: "Please contact our support team, and we will prioritize fixing it immediately." },
    ],
  },
  "status": {
    slug: "status",
    title: "System Status | ResumeAI",
    description: "Check the current operational status of the ResumeAI platform.",
    heroHeadline: "System Status",
    heroSubheadline: "Real-time updates on our system performance and ongoing incidents.",
    features: [
      { title: "99.9% Uptime", description: "We guarantee 99.9% uptime for our Pro and Enterprise customers." },
      { title: "Incident History", description: "Transparent logs of all past outages and post-mortems." },
      { title: "Live Metrics", description: "Real-time API response times and system load." },
    ],
    faqs: [
      { question: "Are all systems operational?", answer: "Yes! Currently, all systems are functioning normally." },
    ],
  },
  "changelog": {
    slug: "changelog",
    title: "Changelog | ResumeAI Updates",
    description: "See the latest features, improvements, and bug fixes added to ResumeAI.",
    heroHeadline: "Product Changelog",
    heroSubheadline: "We ship fast. Here is a log of everything we've recently added to the platform.",
    features: [
      { title: "New Templates", description: "Regularly added ATS-optimized templates." },
      { title: "AI Improvements", description: "Constant tweaks to our AI models for better generation." },
      { title: "Performance Fixes", description: "Squashing bugs and making the app lightning fast." },
    ],
    faqs: [
      { question: "How often do you update?", answer: "We deploy new code to production several times a day!" },
    ],
  },
  "api": {
    slug: "api",
    title: "API Reference | ResumeAI",
    description: "Integrate ResumeAI into your own applications with our powerful REST API.",
    heroHeadline: "ResumeAI Developer API",
    heroSubheadline: "Build the future of recruitment with our headless resume generation API.",
    features: [
      { title: "RESTful Endpoints", description: "Clean, intuitive REST API with JSON responses." },
      { title: "Webhooks", description: "Real-time notifications for asynchronous resume generation." },
      { title: "SDKs Available", description: "Official client libraries for Node.js, Python, and Go." },
    ],
    faqs: [
      { question: "How do I get an API key?", answer: "API access is currently limited to Enterprise customers. Contact sales to learn more." },
    ],
  },
  "docs": {
    slug: "docs",
    title: "Documentation | ResumeAI",
    description: "Learn how to get the most out of ResumeAI with our comprehensive documentation.",
    heroHeadline: "ResumeAI Documentation",
    heroSubheadline: "Everything you need to know about building, exporting, and managing your resumes.",
    features: [
      { title: "Getting Started", description: "Quickstart guides to get you building in minutes." },
      { title: "Advanced Features", description: "Deep dives into custom styling and ATS optimization." },
      { title: "Troubleshooting", description: "Solutions for common issues and errors." },
    ],
    faqs: [
      { question: "Is there video training?", answer: "Yes, we have a full library of video tutorials available in our Help Center." },
    ],
  },
};
