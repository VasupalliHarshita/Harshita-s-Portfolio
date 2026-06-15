import { Project, EducationItem, InternshipItem, SkillItem, CertificationItem, GithubRepo } from './types';

export const personalInfo = {
  name: 'Harshita Vasupalli',
  role: 'AI & ML Engineering Student',
  email: 'vasupalliharshitha3@gmail.com',
  phone: '+91 9392512642',
  location: 'Visakhapatnam, Andhra Pradesh, India',
  linkedin: 'https://www.linkedin.com/in/harshita-vasupalli',
  github: 'https://github.com/VasupalliHarshita',
  tagline: 'Transforming ideas into intelligent solutions through AI, Machine Learning, Cloud Computing, and Modern Web Technologies.',
  typingRoles: [
    'AI/ML Enthusiast',
    'Python Developer',
    'Data Analytics Learner',
    'AWS Cloud Learner',
    'Future Software Engineer'
  ],
  bio: 'Motivated B.Tech student specializing in Artificial Intelligence and Machine Learning with strong knowledge in Python, Java, SQL, HTML, CSS, JavaScript, AWS, Data Structures, DBMS, and OOPs. Passionate about solving real-world problems through technology and continuously learning emerging technologies. Experienced in AI/ML and AWS internships with hands-on exposure to software development and cloud computing.'
};

export const educationHistory: EducationItem[] = [
  {
    id: 'edu-1',
    institution: "Vignan's Institute of Engineering for Women (A)",
    degree: 'B.Tech - Artificial Intelligence and Machine Learning',
    percentageOrCgpa: 'CGPA: 8.31',
    period: '2023 - Present',
    location: 'Visakhapatnam, Andhra Pradesh'
  },
  {
    id: 'edu-2',
    institution: 'Narayana Junior College',
    degree: 'Intermediate Education (Board of Intermediate Education)',
    percentageOrCgpa: '83%',
    period: '2021 - 2023',
    location: 'Visakhapatnam, Andhra Pradesh'
  },
  {
    id: 'edu-3',
    institution: 'Sri Chaitanya Techno School',
    degree: 'SSC (Board of Secondary Education)',
    percentageOrCgpa: '99%',
    period: '2020 - 2021',
    location: 'Visakhapatnam, Andhra Pradesh'
  }
];

export const internshipsList: InternshipItem[] = [
  {
    id: 'intern-1',
    title: 'Foundations of AI & ML',
    role: 'AI & ML Virtual Intern',
    period: 'May 2025 - July 2025',
    highlights: [
      'Acquired core understandings of AI and ML concepts including supervised and unsupervised learning.',
      'Performed data preprocessing, trained classification and regression models, and evaluated performance using Python metrics.',
      'Designed and coded basic machine learning algorithms, validating the predictions against benchmarks.',
      'Engaged in practical sessions and workshops, improving coordination and analytical problem-solving skills.'
    ]
  },
  {
    id: 'intern-2',
    title: 'AWS (Amazon Web Services)',
    role: 'AWS Virtual Intern',
    period: 'August 2024 - October 2024',
    highlights: [
      'Completed an internship and certification program in Amazon Web Services (AWS) cloud operations.',
      'Gained practical experience with essential AWS services including EC2, S3, IAM, VPC, and Cloud fundamentals.',
      'Built a theoretical and practical foundation of cloud architecture patterns, security guidelines, and scalability concepts.',
      'Worked through simulated challenges focusing on building reliable and cost-effective AWS solutions.'
    ]
  }
];

export const skillsList: SkillItem[] = [
  // Programming
  { name: 'Python', level: 90, category: 'Programming Languages' },
  { name: 'Java', level: 82, category: 'Programming Languages' },
  // Web
  { name: 'HTML5', level: 92, category: 'Web Technologies' },
  { name: 'CSS3', level: 88, category: 'Web Technologies' },
  { name: 'JavaScript', level: 85, category: 'Web Technologies' },
  // Database
  { name: 'SQL / MySql', level: 84, category: 'Databases' },
  // Cloud
  { name: 'AWS Cloud Services', level: 80, category: 'Cloud Platform' },
  // Core Computer Science
  { name: 'OOPs Concepts', level: 88, category: 'Core Subjects' },
  { name: 'DBMS', level: 85, category: 'Core Subjects' },
  { name: 'Data Structures', level: 78, category: 'Core Subjects' },
  // Tools
  { name: 'GitHub', level: 75, category: 'Tools' },
  { name: 'VS Code', level: 90, category: 'Tools' },
];

export const certificationsList: CertificationItem[] = [
  { id: 'cert-1', title: 'NPTEL 2025 — Software Engineering', issuer: 'NPTEL / Swayam', year: '2025' },
  { id: 'cert-2', title: 'Google Developer Group on Campus — GenAI', issuer: 'Google Developer Groups', year: '2024' },
  { id: 'cert-3', title: 'Oracle — Java Skill Badge', issuer: 'Oracle', year: '2024' },
  { id: 'cert-4', title: 'Infosys Springboard — Full Stack Development', issuer: 'Infosys Springboard', year: '2024' },
  { id: 'cert-5', title: 'Deloitte — Data Analytics Job Simulation', issuer: 'Deloitte / Forage', year: '2024' },
  { id: 'cert-6', title: 'Deloitte — Cyber Job Simulation', issuer: 'Deloitte / Forage', year: '2024' },
  { id: 'cert-7', title: 'HP LIFE — Data Science and Analytics', issuer: 'HP LIFE Certification', year: '2024' },
  { id: 'cert-8', title: 'Be10x — AI Tools Workshop', issuer: 'Be10x Academic Panel', year: '2024' },
  { id: 'cert-9', title: 'Future Skills Prime — Digital Edge 101', issuer: 'NASSCOM FutureSkills', year: '2024' },
  { id: 'cert-10', title: 'NoviTech R&D Private Limited — Full Stack Development', issuer: 'NoviTech', year: '2024' },
  { id: 'cert-11', title: 'Ultimate Fashion and Fun (UFFF) — 7 Days WIX Learning', issuer: 'UFFF Project Board', year: '2023' },
  { id: 'cert-12', title: 'ICAT — Internship Common Aptitude Test', issuer: 'ICAT India', year: '2023' }
];

export const projectsList: Project[] = [
  {
    id: 'proj-1',
    title: 'Credit Card Fraud Detection',
    category: 'Machine Learning',
    description: 'Built a highly accurate machine learning model to detect fraudulent credit card transactions, scaling predictive accuracy with data analytics and classification algorithms.',
    githubUrl: 'https://github.com/VasupalliHarshita/credit-card-fraud-detection',
    techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-Learn'],
    features: ['Fraud Detection Engine', 'Data Visualization Dashboard', 'Multiple Classification Algorithms', 'Business Metrics Optimization'],
    isFeatured: true
  },
  {
    id: 'proj-2',
    title: 'Customer Segmentation Using K-Means',
    category: 'Data Analytics',
    description: 'Segmented business customers into target clusters based on purchasing behaviors using K-Means Clustering and generated strategic business recommendations.',
    githubUrl: 'https://github.com/VasupalliHarshita/Customer-Segmentation-Using-KMeans',
    techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
    features: ['Optimal K selection (Elbow Method)', 'Customer Behavioral Profiling', 'Interactive Cluster Scatter Plots', 'Data-driven Business Recommendations'],
    isFeatured: true
  },
  {
    id: 'proj-3',
    title: 'CARECROP – Smart Plantation Assistant',
    category: 'Web Development',
    description: 'An agricultural care platform providing structured plant information, soil type evaluation, pH index analysis, optimal fertilizer matching, and customized care schedule reminders.',
    techStack: ['HTML', 'CSS3', 'JavaScript', 'Node.js'],
    features: ['Soil & pH Level Analysis', 'Plant Care & Water Reminders', 'Fertilizer Advisor', 'Disease Recognition Assistant']
  },
  {
    id: 'proj-4',
    title: 'CARE CAPSULE',
    category: 'Web Development',
    description: 'A responsive medication tracker and ordering interface, supporting patients with medication schedule reminders, custom alert configurations, and visual order tracking flow.',
    techStack: ['HTML', 'CSS3', 'JavaScript'],
    features: ['Medication Schedule Alert Scheduler', 'Interactive Medicine Order Workflow', 'Healthcare Contact Shortcuts', 'Patient Record Safekeeping']
  },
  {
    id: 'proj-5',
    title: 'MINOR AND MAJOR OF AWS',
    category: 'Python Application', // Or Cloud infrastructure
    description: 'Designed, configured, and managed cloud-native workloads utilizing core AWS services. Validated scalable load structures, custom VPC subnets, and robust S3 security configurations.',
    techStack: ['Amazon AWS', 'EC2', 'S3 Bucket', 'VPC Routing', 'IAM Access Control', 'Cloud Security Protocols'],
    features: ['Multi-AZ Scaling Configuration', 'Access Control Policies (IAM)', 'Subnets & Security Settings (VPC)', 'Automated Elastic Deployments']
  },
  {
    id: 'proj-6',
    title: 'Image to PDF Converter',
    category: 'Python Application',
    description: 'Developed an automation tool designed to assemble multiple image formats into a single, fully-formatted PDF document with automated file handling and margin alignment.',
    githubUrl: 'https://github.com/VasupalliHarshita/Image-to-PDF-Converter',
    techStack: ['Python', 'Pillow (PIL)', 'OS Module', 'Tkinter UI (Optional)'],
    features: ['Multi-image compilation', 'Aspect-ratio scaling', 'File Compression Optimization', 'Clean Automation Script']
  },
  {
    id: 'proj-7',
    title: 'ToyLand website',
    category: 'Web Development',
    githubUrl: 'https://github.com/VasupalliHarshita/Toyland',
    description: 'A responsive e-commerce web mockup for active toy shops, detailing dynamic product navigation grids, cart operations, and refined visual aesthetics.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    features: ['Dynamic Products List Grid', 'Session Cart Interaction', 'Responsive Order Invoices', 'Fluid UX Transitions']
  }
];

export const mockGithubRepos: GithubRepo[] = [
  {
    name: 'credit-card-fraud-detection',
    description: 'Built a machine learning system to detect fraudulent credit card transactions using classification models.',
    stars: 12,
    forks: 4,
    language: 'Python',
    url: 'https://github.com/VasupalliHarshita/credit-card-fraud-detection'
  },
  {
    name: 'Customer-Segmentation-Using-KMeans',
    description: 'Clustered and mapped consumer base parameters using unsupervised algorithm models for higher monetization plans.',
    stars: 8,
    forks: 2,
    language: 'Python',
    url: 'https://github.com/VasupalliHarshita/Customer-Segmentation-Using-KMeans'
  },
  {
    name: 'Toyland',
    description: 'Interactive and responsive e-commerce portal mockup showcasing smooth frontend grids.',
    stars: 5,
    forks: 1,
    language: 'HTML',
    url: 'https://github.com/VasupalliHarshita/Toyland'
  },
  {
    name: 'Image-to-PDF-Converter',
    description: 'A Python script integrating PIL to automate multiple image compilation into high-fidelity PDF documents.',
    stars: 6,
    forks: 2,
    language: 'Python',
    url: 'https://github.com/VasupalliHarshita/Image-to-PDF-Converter'
  }
];
