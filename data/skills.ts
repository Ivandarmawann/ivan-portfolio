import type { SkillGroup } from "@/types/portfolio";

export const skills: SkillGroup[] = [
  {
    category: "Programming Languages",
    description:
      "Languages used to build web applications, query databases, and develop data or machine learning workflows.",
    skills: ["Python", "PHP", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Web Development",
    description:
      "Frameworks and styling tools used to create responsive, database-backed web applications.",
    skills: ["Laravel", "Bootstrap"],
  },
  {
    category: "Database",
    description:
      "Database fundamentals for designing, querying, and documenting relational application data.",
    skills: ["MySQL", "Database Design", "ERD"],
  },
  {
    category: "Data & AI",
    description:
      "Applied analytics and machine learning tools for preprocessing data, training models, and extracting insights.",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "TensorFlow",
      "Keras",
      "XGBoost",
      "YOLOv12",
      "NLP",
      "LDA",
    ],
  },
  {
    category: "Tools",
    description:
      "Development and experimentation tools used for version control, notebooks, deployment prototypes, and computer vision datasets.",
    skills: [
      "Git",
      "GitHub",
      "Google Colab",
      "Streamlit",
      "VS Code",
      "Roboflow",
      "Jupyter Notebook",
    ],
  },
];
