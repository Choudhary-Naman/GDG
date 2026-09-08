// Current Date
import {
  ManageAccounts,
  Trophy,
  Campaign,
  ConnectWithoutContact,
  DesignServices,
  Palette,
  Language,
  Mobile2,
  SportsEsports,
  Analytics,
  Hub,
  Link,
  Cloud,
} from "@material-symbols-svg/react/outlined";

export const curDay = new Date().getDay();
export const curYear = new Date().getFullYear();
export const curDate = new Date().getDate();
export const curMonth = new Date().getMonth();
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Department metadata
export const DEPARTMENTS = [
  {
    id: "frontend-dev",
    name: "Frontend Development",
    description: "Building beautiful, responsive user interfaces with modern web technologies",
    color: "#3B82F6",
  },
  {
    id: "backend-dev",
    name: "Backend Development",
    description: "Server-side logic, APIs, databases, and system architecture",
    color: "#8B5CF6",
  },
  {
    id: "mobile-dev",
    name: "Mobile Development",
    description: "Cross-platform and native mobile applications",
    color: "#EC4899",
  },
  {
    id: "devops-cloud",
    name: "DevOps & Cloud",
    description: "CI/CD pipelines, containerization, and cloud infrastructure",
    color: "#EF4444",
  },
  {
    id: "data-science",
    name: "Data Science & AI",
    description: "Machine learning, statistical analysis, and intelligent systems",
    color: "#10B981",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description: "User research, prototyping, and design thinking",
    color: "#F59E0B",
  },
  {
    id: "blockchain",
    name: "Blockchain & Crypto",
    description: "Decentralized applications and web3 technologies",
    color: "#84CC16",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Application and network security best practices",
    color: "#EF4444",
  },
  {
    id: "product-mgmt",
    name: "Product Management",
    description: "Product strategy, roadmap planning, and stakeholder alignment",
    color: "#6B7280",
  },
  {
    id: "tech-writing",
    name: "Technical Writing",
    description: "Technical documentation and API guides",
    color: "#A3E635",
  },
  {
    id: "open-source",
    name: "Open Source & Community",
    description: "Contributing to OSS and building developer communities",
    color: "#F97316",
  },
  {
    id: "qa",
    name: "Quality Assurance",
    description: "Testing strategies, QA processes, and test automation",
    color: "#14B8A6",
  },
];

// Department list - used for navigation/cards
export const departments = [
  {
    id: "frontend-dev",
    name: "Frontend Development",
    description: "Building beautiful, responsive user interfaces with modern web technologies",
    color: "#3B82F6",
  },
  {
    id: "backend-dev",
    name: "Backend Development",
    description: "Server-side logic, APIs, databases, and system architecture",
    color: "#8B5CF6",
  },
  {
    id: "mobile-dev",
    name: "Mobile Development",
    description: "Cross-platform and native mobile applications",
    color: "#EC4899",
  },
  {
    id: "devops-cloud",
    name: "DevOps & Cloud",
    description: "CI/CD pipelines, containerization, and cloud infrastructure",
    color: "#EF4444",
  },
  {
    id: "data-science",
    name: "Data Science & AI",
    description: "Machine learning, statistical analysis, and intelligent systems",
    color: "#10B981",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description: "User research, prototyping, and design thinking",
    color: "#F59E0B",
  },
  {
    id: "blockchain",
    name: "Blockchain & Crypto",
    description: "Decentralized applications and web3 technologies",
    color: "#84CC16",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Application and network security best practices",
    color: "#EF4444",
  },
  {
    id: "product-mgmt",
    name: "Product Management",
    description: "Product strategy, roadmap planning, and stakeholder alignment",
    color: "#6B7280",
  },
  {
    id: "tech-writing",
    name: "Technical Writing",
    description: "Technical documentation and API guides",
    color: "#A3E635",
  },
  {
    id: "open-source",
    name: "Open Source & Community",
    description: "Contributing to OSS and building developer communities",
    color: "#F97316",
  },
  {
    id: "qa",
    name: "Quality Assurance",
    description: "Testing strategies, QA processes, and test automation",
    color: "#14B8A6",
  },
];

// Alias kept for backward compatibility: several components/routes still
// import `reviews` (its old name) from this module.
export const reviews = departments;

// Questionnaire Data
// NOTE: `department` here must exactly match a `name` in the `departments`
// array above — that's how FormComp matches the picked department to its
// question set. Add more questions to any array below any time.
export const QuestionnaireData = [
  {
    department: "Frontend Development",
    questions: [
      {
        name: "Which frontend frameworks/libraries have you worked with (React, Vue, Next.js, etc.)?",
        type: "short-text",
        placeholder: "e.g. React, Next.js, Tailwind CSS",
      },
      {
        name: "Share a link to a website or UI you've built that you're proud of, and tell us what you built.",
        type: "long-text",
        placeholder: "Link + 2-3 sentences on your role and what it does",
      },
      {
        name: "How do you approach making a design responsive across mobile, tablet, and desktop?",
        type: "long-text",
        placeholder: "2-3 sentences on your process/tools (e.g. Flexbox, Grid, breakpoints)",
      },
      {
        name: "What's one frontend performance or accessibility issue you've fixed before?",
        type: "long-text",
        placeholder: "Describe the problem and how you solved it",
      },
      {
        name: "What excites you most about frontend development?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Backend Development",
    questions: [
      {
        name: "Which backend languages/frameworks are you comfortable with (Node.js, Django, Spring, etc.)?",
        type: "short-text",
        placeholder: "e.g. Node.js + Express, PostgreSQL",
      },
      {
        name: "Describe an API or backend system you've built. What did it do and how was it structured?",
        type: "long-text",
        placeholder: "2-4 sentences on the architecture and your role",
      },
      {
        name: "How do you handle authentication, authorization, or securing sensitive data in your projects?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "Which databases (SQL/NoSQL) have you used, and how do you decide between them?",
        type: "generic",
        placeholder: "e.g. PostgreSQL, MongoDB, Firebase",
      },
      {
        name: "What's a bug or outage you debugged that taught you something important?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Mobile Development",
    questions: [
      {
        name: "Which mobile stack(s) have you worked with (Flutter, React Native, Kotlin/Swift native, etc.)?",
        type: "short-text",
        placeholder: "e.g. Flutter, React Native",
      },
      {
        name: "Have you shipped an app (even a personal project)? Share a link or describe it.",
        type: "long-text",
        placeholder: "Link (Play Store/TestFlight/GitHub) + short description",
      },
      {
        name: "How do you approach handling different screen sizes and platform-specific UI guidelines?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "What's your experience with state management or offline data syncing in mobile apps?",
        type: "generic",
        placeholder: "e.g. Provider, Riverpod, Redux, local DB caching",
      },
      {
        name: "Why do you want to build for mobile specifically, over web?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "DevOps & Cloud",
    questions: [
      {
        name: "Which cloud platforms and CI/CD tools have you used (AWS, GCP, Azure, GitHub Actions, Jenkins, etc.)?",
        type: "short-text",
        placeholder: "e.g. AWS, GitHub Actions, Docker",
      },
      {
        name: "Describe a deployment pipeline or infrastructure setup you've configured, even a simple one.",
        type: "long-text",
        placeholder: "2-4 sentences",
      },
      {
        name: "What's your experience with containerization (Docker) or orchestration (Kubernetes)?",
        type: "long-text",
        placeholder: "2-3 sentences, or 'None yet, but eager to learn'",
      },
      {
        name: "How would you approach monitoring an application in production and reacting to downtime?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
      {
        name: "What draws you to infrastructure/automation work rather than feature development?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Data Science & AI",
    questions: [
      {
        name: "Which ML/data tools or libraries have you used (Python, pandas, scikit-learn, PyTorch, TensorFlow, etc.)?",
        type: "short-text",
        placeholder: "e.g. Python, pandas, scikit-learn",
      },
      {
        name: "Describe a data analysis or ML project you've worked on — the problem, your approach, and the outcome.",
        type: "long-text",
        placeholder: "2-4 sentences",
      },
      {
        name: "How do you evaluate whether a model or analysis is actually good, not just accurate on paper?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "What's an AI/ML topic you're currently curious about or teaching yourself?",
        type: "generic",
        placeholder: "e.g. LLMs, computer vision, recommender systems",
      },
      {
        name: "Have you competed in a hackathon, Kaggle competition, or similar? Tell us about it.",
        type: "long-text",
        placeholder: "2-3 sentences, or 'Not yet'",
      },
    ],
  },
  {
    department: "UI/UX Design",
    questions: [
      {
        name: "Share a link to your design portfolio, Figma, Behance, or Dribbble.",
        type: "short-text",
        placeholder: "https://...",
      },
      {
        name: "Walk us through your design process from a problem/brief to a final design.",
        type: "long-text",
        placeholder: "2-4 sentences (research, wireframes, prototyping, testing, etc.)",
      },
      {
        name: "Which design tools do you use regularly (Figma, Adobe XD, Sketch, etc.)?",
        type: "short-text",
        placeholder: "e.g. Figma, Illustrator",
      },
      {
        name: "Tell us about a time you had to redesign something based on user feedback or usability testing.",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "What's a product or app with UX you admire, and why?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Blockchain & Crypto",
    questions: [
      {
        name: "Which blockchain platforms/languages have you worked with (Solidity, Ethereum, Solana, etc.)?",
        type: "short-text",
        placeholder: "e.g. Solidity, Hardhat, Ethereum testnets",
      },
      {
        name: "Have you built or contributed to a smart contract or dApp? Describe it.",
        type: "long-text",
        placeholder: "2-4 sentences, or 'Not yet, but I've studied it'",
      },
      {
        name: "How would you explain the tradeoffs between decentralization and scalability to a non-technical person?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "What security pitfalls should a smart contract developer watch out for?",
        type: "generic",
        placeholder: "e.g. reentrancy, overflow, access control",
      },
      {
        name: "What about web3/blockchain interests you most right now?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Cybersecurity",
    questions: [
      {
        name: "Which areas of security have you explored (web app security, network security, CTFs, pentesting, etc.)?",
        type: "short-text",
        placeholder: "e.g. Web app security, CTFs, OSINT",
      },
      {
        name: "Describe a vulnerability you found or a CTF challenge you solved, and how you approached it.",
        type: "long-text",
        placeholder: "2-4 sentences",
      },
      {
        name: "How do you stay updated on new vulnerabilities and security research?",
        type: "generic",
        placeholder: "e.g. CVE feeds, security blogs, Twitter/X, communities",
      },
      {
        name: "What's a security best practice developers often skip that you think is important?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "Have you used tools like Burp Suite, Wireshark, Nmap, or Metasploit? Which ones?",
        type: "generic",
        placeholder: "List tools + rough comfort level",
      },
    ],
  },
  {
    department: "Product Management",
    questions: [
      {
        name: "Have you led or contributed to a product/project from idea to launch? Describe your role.",
        type: "long-text",
        placeholder: "2-4 sentences",
      },
      {
        name: "How do you prioritize features when time and resources are limited?",
        type: "long-text",
        placeholder: "2-3 sentences (frameworks like RICE/MoSCoW welcome, but not required)",
      },
      {
        name: "Describe a time you had to align people with different opinions toward one decision.",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "What tools do you use for roadmapping, specs, or tracking work (Notion, Jira, Linear, etc.)?",
        type: "short-text",
        placeholder: "e.g. Notion, Jira",
      },
      {
        name: "What's a product (app/website) you think is badly designed, and how would you fix it?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Technical Writing",
    questions: [
      {
        name: "Share a sample of your writing — documentation, a blog post, or a README you've written.",
        type: "short-text",
        placeholder: "Link to the sample",
      },
      {
        name: "How do you make a technical topic understandable for someone unfamiliar with it?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "Have you written API docs, tutorials, or guides before? Describe one.",
        type: "long-text",
        placeholder: "2-3 sentences, or 'Not yet, but I write regularly'",
      },
      {
        name: "Which tools/formats are you comfortable with (Markdown, Docusaurus, Notion, etc.)?",
        type: "short-text",
        placeholder: "e.g. Markdown, Notion, Docusaurus",
      },
      {
        name: "Why does clear technical documentation matter to you?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Open Source & Community",
    questions: [
      {
        name: "Link a GitHub profile or PR you're proud of, open source or otherwise.",
        type: "short-text",
        placeholder: "https://github.com/...",
      },
      {
        name: "Have you contributed to an open source project? What did you work on?",
        type: "long-text",
        placeholder: "2-4 sentences, or 'Not yet, but I'd love to start'",
      },
      {
        name: "Have you organized or helped run an event, workshop, or meetup? Describe it.",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
      {
        name: "How would you encourage more first-time contributors to get involved in a project?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
      {
        name: "What does 'community' mean to you in the context of tech/open source?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
    ],
  },
  {
    department: "Quality Assurance",
    questions: [
      {
        name: "What testing approaches or tools have you used (manual testing, Selenium, Jest, Cypress, Postman, etc.)?",
        type: "short-text",
        placeholder: "e.g. Cypress, Postman, Jest",
      },
      {
        name: "Describe how you would test a login form, listing the cases you'd check for.",
        type: "long-text",
        placeholder: "2-4 sentences / bullet-style cases",
      },
      {
        name: "Have you written automated test cases before? Describe one you're proud of.",
        type: "long-text",
        placeholder: "2-3 sentences, or 'Not yet, mostly manual testing so far'",
      },
      {
        name: "How do you decide what to prioritize testing when a release deadline is tight?",
        type: "generic",
        placeholder: "2-3 sentences",
      },
      {
        name: "What's a bug you found that others missed, and how did you catch it?",
        type: "long-text",
        placeholder: "2-3 sentences",
      },
    ],
  },
];

// Sample Admin Data
export const sampleAdminHeader = [
  {
    Header: "SrNo",
    accessor: "srno",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Department",
    accessor: "department",
  },
];

// Headers for CSV exports
export const CSV_Header = [
  {
    label: "Name",
    key: "Name",
  },
  {
    label: "Email",
    key: "Email",
  },
  {
    label: "Registration Number",
    key: "RegistrationNumber",
  },
  {
    label: "Phone",
    key: "Phone",
  },
  {
    label: "Department",
    key: "Department",
  },

  {
    label: "Preference",
    key: "Pref",
  },
  {
    label: "Shortlisted",
    key: "shortlisted",
  },
  {
    label: "Questions",
    key: "Questions",
  },
];

// Mailing Templates
export const mailingTemplate = {
  Interview:
    "<p>Edit content</p><br><p>Thank you for applying to Organization Name. We are excited to let you know that you have been shortlisted for joining the #dept Department!</p><p>We look forward to your active participation!</p>",
};

export const technicalCards = [
  {
    title: "Blockchain",
    description:
      "Explores decentralized apps, smart contracts, and Web3 development, giving members hands-on experience with blockchain protocols and tools.",
    color: "#FF7A6B",
    image: "/assets/images/icons/blockchain.svg",
    formLink: "/6a89c4e2-7b19-4f32-821e-9821a41b5201",
  },
  {
    title: "Cloud &\nDevOps",
    description:
      "Explores cloud computing, infrastructure, and automation by building scalable applications, hosting hands-on workshops, and educating members about cloud platforms, containerization, CI/CD pipelines, and DevOps practices.",
    color: "#FBBC04",
    image: "/assets/images/icons/cloud.svg",
    formLink: "/a1d920df-9eb9-49eb-b3a4-e4a3d1245ede", // Cloud & DevOps ID
  },
  {
    title: "Game Dev",
    description:
      "Combines creativity and technical skills to design engaging, entertaining games, giving members hands-on experience with real-world game development tools, engines, and production workflows.",
    color: "#4285F4",
    image: "/assets/images/icons/game-dev.svg",
    formLink: "/9055864f-c7dc-44cd-91d5-8759d32a496a", // App Development ID (placeholder)
  },
  {
    title: "App Dev",
    description:
      "Builds intuitive, impactful mobile applications, improving accessibility, interaction, and convenience for members and event participants through functional, user-focused design.",
    color: "#EA4335",
    image: "/assets/images/icons/app-dev.svg",
    formLink: "/339f0f8a-72f2-44b9-92ab-2b0d4dcfa0f6",
  },
  {
    title: "UI/UX",
    description:
      "Designs visually appealing, user-friendly digital interfaces with a focus on accessibility, usability, and aesthetics, ensuring products provide enjoyable, intuitive, and meaningful user experiences.",
    color: "#0F9D58",
    image: "/assets/images/icons/ui-ux.svg",
    formLink: "/e2ed9c2c-c36c-457f-a8bb-cf2e8bc7c2e1",
  },
  {
    title: "Data\nScience",
    description:
      "Applies AI, machine learning, and analytics to transform data into actionable insights, helping solve problems, build predictive models, and inspire innovation across projects.",
    color: "#EA4335",
    image: "/assets/images/icons/data-science.svg",
    formLink: "/c0f3b1d1-ce05-45f6-9e34-ac9443fc5fcb", // App Development ID (placeholder)
  },
  {
    title: "Competitive Programming",
    description:
      "Promotes problem-solving skills through coding contests, hackathons, and peer learning, helping members sharpen algorithms, logic, and efficiency while preparing for real-world tech challenges.",
    color: "#0F9D58",
    image: "/assets/images/icons/cp.svg",
    formLink: "/3e9ac635-01d4-495e-aa87-a7335a2403c2", // App Development ID (placeholder)
  },
  {
    title: "Web Dev",
    description:
      "Designs, develops, and maintains responsive, high-performance websites for projects and events, using modern web technologies to enhance accessibility, user experience, and community engagement online.",
    color: "#FBBC04",
    image: "/assets/images/icons/web-dev.svg",
    formLink: "/8143de1d-db17-42fa-958d-13b10804f894",
  },
  {
    title: "Open\nSource",
    description:
      "Encourages members to contribute to open-source projects, building collaboration skills, real-world coding experience, and a culture of transparency, learning, and global tech impact.",
    color: "#4285F4",
    image: "/assets/images/icons/open-source.svg",
    formLink: "/ae7db51a-c6db-4f8d-9159-40767c5354cb", // App Development ID (placeholder)
  },
];

export const nonTechnicalCards = [
  {
    title: "Design",
    description:
      "Creates stunning visuals, event posters, and branding materials that capture the organization's identity, ensuring every design communicates creativity, professionalism, and excitement to engage the community.",
    color: "#329A4E",
    image: "/assets/images/icons/design.svg",
    formLink: "/d3beefc1-f8b0-4202-b26c-36e9804b6636",
  },
  {
    title: "Outreach",
    description:
      "Builds partnerships and expands outreach by connecting with communities, sponsors, and collaborators, ensuring diverse opportunities and impactful collaborations both within and beyond campus.",
    color: "#4285F4",
    image: "/assets/images/icons/outreach.svg",
    formLink: "/3936d5a2-acd9-4a98-ac97-42c2c92f5c02", // App Development ID (placeholder)
  },
  {
    title: "Publicity",
    description:
      "Drives online presence with creative campaigns, video editing, and storytelling, boosting engagement, promoting events, and showcasing the club to inspire participation and community growth.",
    color: "#EA4335",
    image: "/assets/images/icons/social-media.svg",
    formLink: "/4499a966-2740-4c36-88dd-8916a909fc77", // App Development ID (placeholder)
  },
  {
    title: "Management",
    description:
      "The backbone of the organization, turning vision into reality by planning, executing, and improvising. Oversees events, operations, and growth, ensuring smooth functioning, success, and impactful experiences.",
    color: "#FBBC04",
    image: "/assets/images/icons/management.svg",
    formLink: "/c21ca066-ab4d-40a3-943c-f170d6312bdc", // App Development ID (placeholder)
  },
];
