import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    titleKey: 'skills_frontend',
    skills: [
      { name: 'HTML5', level: 'proficient' },
      { name: 'CSS3', level: 'proficient' },
      { name: 'JavaScript', level: 'proficient' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'React', level: 'proficient' },
      { name: 'Tailwind CSS', level: 'proficient' },
      { name: 'Bootstrap', level: 'proficient' },
    ],
  },
  {
    id: 'backend',
    titleKey: 'skills_backend',
    skills: [
      { name: 'Node.js', level: 'proficient' },
      { name: 'Express.js', level: 'proficient' },
      { name: 'NestJS', level: 'proficient' },
      { name: 'PHP', level: 'proficient' },
      { name: 'REST APIs', level: 'proficient' },
    ],
  },
  {
    id: 'database',
    titleKey: 'skills_database',
    skills: [
      { name: 'MongoDB', level: 'proficient' },
      { name: 'MySQL', level: 'proficient' },
      { name: 'PostgreSQL', level: 'learning' },
    ],
  },
  {
    id: 'tools',
    titleKey: 'skills_tools',
    skills: [
      { name: 'Git', level: 'proficient' },
      { name: 'GitHub', level: 'proficient' },
      { name: 'Postman', level: 'proficient' },
      { name: 'VS Code', level: 'proficient' },
      { name: 'npm', level: 'proficient' },
    ],
  },
];
