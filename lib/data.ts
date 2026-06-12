export interface Project {
  title: string;
  sub: string;
  year: string;
  ytId: string;
  phase: string;
  stack: string[];
  summary: string;
  desc: string;
  link: string;
}

export interface Experience {
  co: string;
  role: string;
  discipline: string;
  period: string;
  loc: string;
  phase: string;
  summary: string;
  desc: string;
}

export interface ContactField {
  label: string;
  value: string;
  href: string | null;
  accent?: boolean;
  external?: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: 'TEACHMAP',
    sub: 'AI Curriculum Platform · Cambridge EduX × Microsoft',
    year: '2026',
    ytId: '71IxVj20-i0',
    phase: 'Compare · Generate · Improve',
    stack: ['Next.js', 'FastAPI', 'Supabase', 'CurricuLLM', 'Gemini', 'Mapbox', 'Serper'],
    summary: 'Professors can describe a course, generate a baseline curriculum, compare it with live course material from universities around the world, and turn the final structure into lectures, quizzes, forums, and feedback-led follow-ups.',
    desc: 'Full-stack AI platform enabling professors to benchmark curricula live against peer institutions, auto-generate post-lecture quizzes, and close feedback loops between student confusion and next-lecture content. Built as a finalist at the Cambridge EduX Hackathon at Microsoft Sydney HQ — competing against teams from across APAC. Reduced curriculum build time by 97% (68 hrs → 2 hrs) and quiz generation by 120×. Architecture targets 242M students across 27,400 institutions, mirroring feedback-loop pilots at ASU and U of T that showed 19% → 8% dropout reduction.',
    link: 'https://github.com/sirasatinithyanand/TechMap--The-teachers-ai-guide',
  },
  {
    title: 'LEGION',
    sub: 'Lead Generation Platform',
    year: '2024',
    ytId: 'RyBxjDp6300',
    phase: 'Discover · Score · Engage',
    stack: ['OpenAI Agents SDK', 'Gemini 2.0 Flash', 'Serper', 'FastAPI', 'AsyncIO'],
    summary: 'A multi-agent workflow that creates market-specific searches, discovers potential companies, scores them across five business criteria, finds relevant contacts, and prepares tailored outreach strategies.',
    desc: 'Multi-agent AI pipeline that eliminates B2B prospecting overhead — from hours of manual research to under 3 minutes per run. Autonomously discovers, scores, and follows up with 10+ qualified leads per run, replacing manual LinkedIn search, email drafting, and CRM entry entirely.',
    link: 'https://github.com/parthathalye17/Lead-Generation-Platform',
  },
  {
    title: 'HISAAB-BOOK',
    sub: 'Multilingual Inventory App',
    year: '2024',
    ytId: '--o5lI6yiFs',
    phase: 'Speak · See · Manage',
    stack: ['React Native', 'Expo', 'FastAPI', 'Gemini Vision', 'Supabase', 'Bhashini'],
    summary: 'A mobile inventory system built around voice and camera input. Shopkeepers can manage stock in their preferred Indian language, identify products from photos, and monitor inventory through a simple dashboard.',
    desc: 'Inventory management app for local shopkeepers with voice commands across 5 Indian languages, image-based product detection via Gemini Vision, and real-time cloud sync — built to serve the 63M micro-retailers in India who lack English-language tooling. Reached the finals of Bhashini-Sprint by the Government of India ONDC, competing against funded startups in the multilingual commerce category.',
    link: 'https://github.com/parthathalye17/Hisab-book-app',
  },
];

export const EXPERIENCE: Experience[] = [
  {
    co: 'Machine Vision AI',
    role: 'Software Developer Intern',
    discipline: 'Full-Stack · Computer Vision · ML (YOLO)',
    period: 'Feb 2026 – Present',
    loc: 'Sydney, AU',
    phase: 'Observe · Validate · Operationalise',
    summary: 'I build the data, model, and application layers behind production computer-vision workflows, turning raw CCTV evidence into validated operational and revenue records.',
    desc: 'Converted high-volume dual-camera CCTV archives into model-ready data by isolating meaningful vehicle and personnel activity, retaining ±60 seconds of context, and removing near-duplicate frames to maximise dataset diversity. Fine-tuned an 8-class YOLO11m-seg model on AWS SageMaker to 90.7% precision and 0.81 mask mAP@50, then productionised it with cross-camera validation and fail-safe controls; related safety-zone optimisation reduced alerts by 94% while running at 9.7 FPS. Replaced a fragmented SharePoint and spreadsheet process with a role-based Next.js and FastAPI platform, eliminating approximately four hours of manual work per day and reducing classification risk by 60%. Automated the evidence-to-revenue lifecycle for 100+ daily truck events through licence-plate recognition, tiered weighbridge reconciliation, reviewer-preserved records, and per-ton pricing on AWS EC2, RDS, and S3.',
  },
  {
    co: 'Deloitte',
    role: 'ML Engineer Intern',
    discipline: 'Vector Search · Semantic Retrieval · RAG · Azure AI',
    period: 'Jan – May 2025',
    loc: 'Thane, IN',
    phase: 'Index · Retrieve · Secure',
    summary: 'I helped build an enterprise search product that could ingest changing document collections and retrieve information by meaning rather than exact wording.',
    desc: 'Built a semantic search platform on Azure OpenAI and Azure AI Search with a real-time document ingestion pipeline via Azure Functions, improving retrieval accuracy by 30% over keyword baseline across an enterprise document corpus. Hardened the platform end-to-end with OIDC, MSAL, JWT/JWKS, and RBAC — delivering production-grade security for a multi-tenant internal tool at a Big 4 firm.',
  },
  {
    co: 'Edgelytics Solutions',
    role: 'R&D Intern',
    discipline: 'ML Research · Signal Processing · Predictive Maintenance',
    period: 'Oct – Dec 2025',
    loc: 'Pune, IN',
    phase: 'Measure · Transform · Predict',
    summary: 'I explored how vibration signals from industrial machines could reveal early faults, then turned those patterns into data a learning system could use.',
    desc: 'Analysed multi-axis vibration data from rotating industrial machines using FFT to extract key spectral features, enabling early-stage fault identification without additional sensor hardware. Built fault-mapped training datasets and deployed an ensemble learning model for predictive maintenance, achieving 93.1% fault detection accuracy across multiple machine failure modes.',
  },
];

export const CONTACT_FIELDS: ContactField[] = [
  { label: 'Email', value: 'athalyeparth@gmail.com', href: 'mailto:athalyeparth@gmail.com' },
  { label: 'GitHub', value: '/parthathalye17', href: 'https://github.com/parthathalye17', external: true },
  { label: 'Phone', value: '+61 433 254 007', href: 'tel:+61433254007' },
  { label: 'LinkedIn', value: 'linkedin.com/in/parthathalye', href: 'https://linkedin.com/in/parthathalye', external: true },
  { label: 'Location', value: 'Sydney, AU · Open to relocation', href: null },
  { label: 'Résumé', value: 'View PDF ↗', href: 'https://drive.google.com/file/d/11xVc1-Osl5mpGyrs58zQl8Y_-3LaA3Fb/view?usp=sharing', accent: true, external: true },
];

export const DOCS_LINK = 'https://drive.google.com/drive/folders/1TIyfu-pg3jKvdJFOf3jzWI-89nfHBy6N?usp=drive_link';

export const SKILLS = [
  'Python', 'FastAPI', 'Next.JS', 'React', 'LangGraph',
  'TensorFlow', 'Azure AI', 'Docker', 'GCP', 'Supabase',
  'YOLO', 'RAG', 'CrewAI', 'SQL', 'React-Native', 'MongoDB',
];

export const EDUCATION = [
  { school: 'UNSW Sydney', deg: 'MIT (Artificial Intelligence)', year: '2026 –' },
  { school: 'RAIT Mumbai', deg: 'B.Tech Electronics & Communication · 8.92 CGPA', year: '2021 – 25' },
];
