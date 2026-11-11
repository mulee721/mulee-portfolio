import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'Jimma University',
    type: 'education',
    institution: 'Jimma University',
    role: 'Bachelor of Information Technology',
    period: '2023 – Expected 2027',
    location: 'Jimma, Ethiopia',
    description:
      'Pursuing a Bachelor\'s degree in Information Technology, building a strong foundation in software engineering, data structures, algorithms, database management, web development, and computer networks.',
    highlights: [
      'Core coursework in Data Structures & Algorithms',
      'Database Management Systems',
      'Object-Oriented Programming',
      'Web Application Development',
      'Software Engineering & Design Patterns',
      'Computer Networks and Security',
    ],
  },
  {
    id: 'eaii-internship',
    type: 'internship',
    institution: 'Ethiopian Artificial Intelligence Institute (EAII)',
    role: 'AI Research Intern',
    period: 'July 10, 2026 – September 15, 2026',
    location: 'Ethiopia',
    description:
      'Completed an internship at the Ethiopian Artificial Intelligence Institute, contributing to neural machine translation research focused on low-resource African languages.',
    highlights: [
      'Contributed to data collection and preprocessing for Amharic To Afaan Oromo parallel corpora',
      'Assisted in training and evaluating Transformer-based neural machine translation models',
      'Worked with the PyTorch framework and Hugging Face tooling',
      'Gained hands on experience in NLP research workflows and experimental design',
      'Collaborated with researchers on the Amharic to Afaan Oromo NMT project',
    ],
    technologies: ['Python', 'PyTorch', 'Transformer', 'NLP'],
  },
];
