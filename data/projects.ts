import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "weather-detection-ai-yolov12",
    title: "Weather Detection AI using YOLOv12",
    category: "machine-learning",
    status: "completed",
    featured: true,
    summary:
      "Computer vision project that applies a YOLOv12 object detection workflow to identify weather-related visual conditions from image data.",
    problem:
      "Visual weather assessment can be inconsistent when images are captured in varied lighting, backgrounds, and environmental conditions, especially when manual review is required.",
    solution:
      "Prepared image datasets, managed annotation workflows, trained a YOLOv12 model in Google Colab, and reviewed detection outputs to evaluate model behavior across weather categories.",
    recruiterTakeaway:
      "Shows hands-on computer vision capability across dataset preparation, annotation tooling, model training, and practical evaluation of detection results.",
    role: "Machine learning developer",
    techStack: ["Python", "YOLOv12", "Roboflow", "Google Colab", "Jupyter Notebook"],
    highlights: [
      "Prepared and organized image data for object detection training using Roboflow-style workflows.",
      "Configured YOLOv12 experimentation in Google Colab for reproducible model training and testing.",
      "Evaluated model predictions visually to understand category performance and failure cases.",
      "Positioned the model for real-world monitoring scenarios such as environmental observation or image-based reporting.",
    ],
    links: [
      {
        label: "View Case Study",
        href: "/projects/weather-detection-ai",
        type: "case-study",
      },
    ],
  },
  {
    slug: "upj-marketplace",
    title: "UPJ Marketplace",
    category: "fullstack-web",
    status: "completed",
    featured: true,
    image: "/projects/upj-marketplace/hero.jpg",
    summary:
      "UPJ Marketplace is a campus-focused marketplace platform developed for Universitas Pembangunan Jaya students and academic communities. The platform enables users to buy and sell academic materials, electronics, fashion items, and personal goods through a modern web-based interface. Key features include product management, category filtering, seller analytics dashboards, buyer activity tracking, and responsive user experiences designed for campus communities.",
    problem:
      "Student commerce often happens across scattered chat groups and informal posts, which makes product discovery inconsistent and gives administrators limited visibility into marketplace activity.",
    solution:
      "Built a Flask and SQLAlchemy application with product listing flows, category-based discovery, user-oriented pages, and relational data modeling for marketplace records.",
    recruiterTakeaway:
      "Demonstrates the ability to turn a real campus workflow problem into a practical web product with full-stack implementation, database design, and user-centered feature planning.",
    role: "Full-stack web developer",
    techStack: ["Python", "Flask", "SQLAlchemy", "SQLite", "Bootstrap", "JavaScript", "HTML", "CSS"],
    highlights: [
      "Designed a marketplace workflow that supports item discovery, listing management, and category-based browsing.",
      "Modeled core relational entities for users, products, categories, and transaction-oriented records.",
      "Implemented responsive server-rendered pages with Flask, Bootstrap, and SQLAlchemy.",
      "Focused on improving trust and accessibility compared with scattered informal selling channels.",
    ],
    links: [
      {
        label: "View Case Study",
        href: "/projects/upj-marketplace",
        type: "case-study",
      },
    ],
  },
  {
    slug: "employee-turnover-prediction-xgboost",
    title: "Employee Turnover Prediction using XGBoost",
    category: "data",
    status: "completed",
    featured: true,
    summary:
      "Predictive analytics project that uses XGBoost classification to estimate employee turnover risk from structured HR data.",
    problem:
      "HR teams need earlier signals of potential turnover so they can investigate retention risks before productivity, hiring cost, and team continuity are affected.",
    solution:
      "Cleaned and explored HR data, prepared model-ready features, trained an XGBoost classifier, and analyzed influential patterns that could inform retention-focused decision-making.",
    recruiterTakeaway:
      "Demonstrates business-oriented analytics: translating HR data into a predictive workflow with preprocessing, classification, evaluation, and decision-support interpretation.",
    role: "Data analyst and machine learning developer",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "XGBoost", "Jupyter Notebook"],
    highlights: [
      "Prepared structured HR data for supervised learning through cleaning, encoding, and feature readiness checks.",
      "Used XGBoost to model non-linear relationships often present in employee behavior and workplace data.",
      "Reviewed predictive signals to connect model behavior with practical retention questions.",
      "Framed the project around decision support rather than only model training.",
    ],
    links: [],
  },
  {
    slug: "sleep-stage-prediction-lstm",
    title: "Sleep Stage Prediction using LSTM",
    category: "machine-learning",
    status: "completed",
    featured: true,
    summary:
      "Sequence modeling project that uses an LSTM neural network to predict sleep stages from time-dependent health signal data.",
    problem:
      "Sleep stage analysis requires understanding patterns over time, which makes simple non-sequential models less suitable for the task.",
    solution:
      "Transformed sequential data into model-ready inputs, trained an LSTM-based neural network, and evaluated predictions across sleep-stage classes.",
    recruiterTakeaway:
      "Shows readiness to work with temporal data, neural network architectures, and evaluation challenges common in health or sensor-based machine learning.",
    role: "Machine learning developer",
    techStack: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "Jupyter Notebook"],
    highlights: [
      "Modeled temporal dependencies with an LSTM architecture instead of treating observations as independent rows.",
      "Structured preprocessing around sequence windows and class-based prediction targets.",
      "Practiced neural network experimentation with TensorFlow and Keras.",
      "Explored a health-data problem where model reliability and interpretability are important.",
    ],
    links: [],
  },
  {
    slug: "youtube-comment-topic-modeling-lda",
    title: "YouTube Comment Topic Modeling using LDA",
    category: "data",
    status: "completed",
    featured: false,
    summary:
      "NLP analytics project that uses Latent Dirichlet Allocation to identify recurring topics from YouTube comment text.",
    problem:
      "Large comment sections are difficult to review manually, especially when stakeholders need to understand recurring audience themes.",
    solution:
      "Cleaned noisy text data, prepared NLP features, trained an LDA topic model, and translated discovered topics into interpretable audience themes.",
    recruiterTakeaway:
      "Demonstrates practical NLP analytics: turning unstructured comments into organized themes that can support content review, audience research, or campaign feedback.",
    role: "Data analyst and NLP practitioner",
    techStack: ["Python", "Pandas", "NLP", "LDA", "Scikit-Learn", "Jupyter Notebook"],
    highlights: [
      "Processed noisy social media text into analysis-ready tokens and features.",
      "Applied unsupervised topic modeling to surface recurring discussion themes.",
      "Converted model output into clearer summaries for non-technical interpretation.",
      "Focused on reducing manual review effort for large comment datasets.",
    ],
    links: [],
  },
  {
    slug: "librarysm",
    title: "LibrarySM",
    category: "web",
    status: "completed",
    featured: false,
    summary:
      "Library management web application concept for organizing book records, member data, and borrowing workflows in one operational system.",
    problem:
      "Manual library administration can make book availability, borrowing records, and member management difficult to track accurately.",
    solution:
      "Created a database-backed system with structured entities for books, members, borrowing records, and administrative workflows.",
    recruiterTakeaway:
      "Shows strong fundamentals in CRUD application development, ERD-based relational design, and operational workflow thinking.",
    role: "Web developer and database designer",
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "HTML", "CSS"],
    highlights: [
      "Designed ERD-based relationships for books, members, borrowing activity, and administrative records.",
      "Implemented core CRUD flows to support day-to-day library data management.",
      "Built a practical admin-oriented interface with Laravel, MySQL, and Bootstrap.",
      "Focused on reducing manual tracking errors through structured database records.",
    ],
    links: [],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
