import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'student-course-registration',
    title: 'Student Course Registration System',
    category: 'Full-Stack',
    shortDescription:
      'A university course registration platform managing the course enrollment process for students, lecturers, and administrators with role-based access control.',
    fullDescription:
      'A comprehensive university course registration platform built with React, TypeScript, Tailwind CSS, NestJS, and MongoDB. The system supports three distinct user roles students, lecturers, and administrators  each with a tailored dashboard and set of capabilities. The application streamlines how students discover, select, and register for courses each semester.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'NestJS', 'MongoDB'],
    screenshot: '/images/SCRS.png',
    gallery: [
      {
        src: '/images/SCRS.png',
        caption: 'Student Course Registration System',
        alt: 'Student Course Registration System  main application screenshot',
      },
      {
        src: '/images/projects/course-reg/screenshot-2.jpg',
        caption: 'Course Catalog',
        alt: 'Course catalog with search and filter functionality',
      },
      {
        src: '/images/projects/course-reg/screenshot-3.jpg',
        caption: 'Admin Panel',
        alt: 'Admin panel for managing courses and semesters',
      },
    ],
    problem:
      'Universities using manual or spreadsheet-based course registration face frequent errors, scheduling conflicts, and an inefficient process for both students and academic staff. There was no centralized system to manage course availability, registration rules, and semester management in one place.',
    solution:
      'A role-based web platform where students can browse and register for courses, lecturers can manage their assigned courses and view enrolled students, and administrators can control course listings, semester setup, and registration windows.',
    targetUsers: ['University students', 'Lecturers and instructors', 'Academic administrators'],
    features: [
      {
        title: 'Role-Based Access Control',
        description: 'Separate dashboards and permissions for students, lecturers, and administrators.',
      },
      {
        title: 'Student Dashboard',
        description: 'Students can view available courses, track registration status, and manage their enrolled courses.',
      },
      {
        title: 'Course Management',
        description: 'Administrators can create, edit, and manage courses and assign lecturers.',
      },
      {
        title: 'Registration Workflow',
        description: 'Students go through a guided registration process with system-level validation of prerequisites and capacity.',
      },
      {
        title: 'Semester Management',
        description: 'Administrators can define and manage academic semesters and registration periods.',
      },
      {
        title: 'Lecturer Dashboard',
        description: 'Lecturers can view their assigned courses and see enrolled student lists.',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'User Authentication',
        description: 'Users log in with their credentials. The system identifies their role (student, lecturer, or admin) and redirects them to the appropriate dashboard.',
      },
      {
        step: 2,
        title: 'Browse Available Courses',
        description: 'Students view the course catalog for the current semester, with details on course credits, schedule, and available seats.',
      },
      {
        step: 3,
        title: 'Select a Course',
        description: 'Students select desired courses from the catalog and add them to their registration list.',
      },
      {
        step: 4,
        title: 'System Validation',
        description: 'The system validates registration rules — checking seat availability and any applicable constraints before proceeding.',
      },
      {
        step: 5,
        title: 'Submit Registration',
        description: 'Student confirms and submits their course selections for the semester.',
      },
      {
        step: 6,
        title: 'Registration Confirmation',
        description: 'The system processes the registration and displays a confirmation of the enrolled courses with the updated status.',
      },
    ],
    architecture:
      'The frontend is a React + TypeScript SPA using Tailwind CSS for styling. The backend is built with NestJS, using module-based architecture with Guards for role-based access control. Data is stored in MongoDB using Mongoose schemas. JWT authentication is used for securing API endpoints.',
    challenges: [
      {
        challenge: 'Implementing role-based access control across both frontend and backend',
        solution: 'Used NestJS Guards and JWT-embedded role claims on the backend; implemented protected route components and conditional rendering on the frontend based on user role.',
      },
      {
        challenge: 'Preventing registration conflicts and maintaining data consistency',
        solution: 'Applied atomic MongoDB operations and server-side validation to ensure registration integrity.',
      },
    ],
    results:
      'The system successfully implements the core course registration workflow with functional student, lecturer, and admin dashboards. Role-based access control is working correctly across all user types.',
    githubUrl: 'https://github.com/mulee721/SCRS.git',
    status: 'completed',
    featured: true,
  },
  {
    id: '2',
    slug: 'food-ordering-delivery',
    title: 'Food Ordering & Delivery System',
    category: 'Full-Stack',
    shortDescription:
      'A full-stack food ordering application connecting customers with restaurants, supporting menu browsing, online ordering, and order management.',
    fullDescription:
      'A complete food ordering and management platform built with React, Node.js, Express.js, and MongoDB. The application provides customers with a clean interface to browse restaurant menus, place orders, and track order status, while giving restaurant management tools to handle incoming orders.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    screenshot: '/images/ayo.png',
    gallery: [
      {
        src: '/images/ayo.png',
        caption: 'AYO Food Ordering Platform',
        alt: 'AYO Food Ordering Platform — main application screenshot',
      },
      {
        src: '/images/projects/food-ordering/screenshot-2.jpg',
        caption: 'Order Cart',
        alt: 'Shopping cart with selected food items',
      },
    ],
    problem:
      'Small restaurants and food businesses lack affordable digital platforms to accept online orders and manage their offerings, forcing reliance on phone-in orders and manual processes.',
    solution:
      'A web application allowing customers to browse menus and place orders online, while providing restaurant owners with a dashboard to manage menu items and incoming orders.',
    targetUsers: ['Restaurant customers', 'Restaurant management and staff'],
    features: [
      {
        title: 'Menu Browsing',
        description: 'Customers can browse categorized food menus with item descriptions and pricing.',
      },
      {
        title: 'Online Ordering',
        description: 'Add items to cart and place orders through a streamlined checkout process.',
      },
      {
        title: 'Order Management',
        description: 'Restaurant staff can view, update, and manage incoming orders.',
      },
      {
        title: 'REST API Backend',
        description: 'Clean RESTful API built with Express.js for all CRUD operations on menus and orders.',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Browse Menu',
        description: 'Customer browses available food items organized by category.',
      },
      {
        step: 2,
        title: 'Add to Cart',
        description: 'Customer selects items and adjusts quantities in the shopping cart.',
      },
      {
        step: 3,
        title: 'Place Order',
        description: 'Customer reviews cart and submits the order.',
      },
      {
        step: 4,
        title: 'Order Processing',
        description: 'Restaurant receives and processes the order through the management dashboard.',
      },
    ],
    architecture:
      'React frontend with React Router for navigation. Express.js REST API backend connected to MongoDB using Mongoose. Separation of concerns with route handlers and model schemas.',
    challenges: [
      {
        challenge: 'Real-time order status updates',
        solution: 'Implemented polling-based status refresh on the client side to show updated order status.',
      },
    ],
    results:
      'Core ordering workflow is functional with menu browsing, cart management, and order placement. The restaurant management dashboard enables order tracking.',
    githubUrl: 'https://github.com/mulee721/AYO-Food-Ordering-Platform',
    status: 'completed',
    featured: true,
  },
  {
    id: '3',
    slug: 'budget-flow-control',
    title: 'Budget Flow Control',
    category: 'PHP/MySQL',
    shortDescription:
      'A web-based financial management tool for tracking income, expenses, and personal financial records.',
    fullDescription:
      'A PHP and MySQL-based financial management application that helps users record and categorize income and expenses, view balance summaries, and maintain a clear picture of their financial situation.',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    screenshot: '/images/BF.png',
    gallery: [
      {
        src: '/images/BF.png',
        caption: 'BudgetFlow Dashboard',
        alt: 'BudgetFlow application — main dashboard screenshot',
      },
      {
        src: '/images/projects/budget-flow/screenshot-2.jpg',
        caption: 'Transaction List',
        alt: 'List of financial transactions with categories',
      },
    ],
    problem:
      'Individuals often struggle to keep track of where their money goes without a simple, dedicated tool for recording and categorizing transactions.',
    solution:
      'A straightforward web application for recording income and expenses, categorizing transactions, and viewing account balance — accessible through any browser.',
    targetUsers: ['Individuals managing personal finances', 'Small household budgets'],
    features: [
      {
        title: 'Income & Expense Tracking',
        description: 'Record income and expenses with amounts, categories, and dates.',
      },
      {
        title: 'Balance Summary',
        description: 'View current balance calculated from all recorded transactions.',
      },
      {
        title: 'Transaction Categories',
        description: 'Organize transactions by customizable categories.',
      },
      {
        title: 'Transaction History',
        description: 'View and filter historical records of all financial entries.',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Record Transaction',
        description: 'User enters income or expense details including amount, category, and date.',
      },
      {
        step: 2,
        title: 'Categorization',
        description: 'Transaction is assigned to a category for organized tracking.',
      },
      {
        step: 3,
        title: 'View Summary',
        description: 'Dashboard displays updated balance and a summary of income vs. expenses.',
      },
    ],
    architecture:
      'Server-side rendered PHP application with MySQL database for data persistence. Standard MVC-like structure with PHP handling both routing and template rendering.',
    challenges: [
      {
        challenge: 'Keeping the interface simple and functional without a JavaScript framework',
        solution: 'Used vanilla JavaScript for interactive elements and PHP for all data operations.',
      },
    ],
    results:
      'Functional budget tracking application with CRUD operations for financial records and a clear dashboard summary.',
    githubUrl: 'https://github.com/mulee721/Budget-flow-control.git',
    status: 'completed',
    featured: true,
  },
  {
    id: '4',
    slug: 'digital-library-management',
    title: 'Digital Library Management System',
    category: 'Full-Stack',
    shortDescription:
      'A digital library platform for organizing books, managing library resources, and providing access to digital collections.',
    fullDescription:
      'A web-based library management system built with React, Node.js, Express.js, and MongoDB. The application provides tools for cataloging books, managing library members, and organizing access to digital resources.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    screenshot: '/images/DL.png',
    gallery: [
      {
        src: '/images/DL.png',
        caption: 'Digital Library Management System',
        alt: 'Digital Library Management System — main application screenshot',
      },
      {
        src: '/images/projects/digital-library/screenshot-2.jpg',
        caption: 'Book Details',
        alt: 'Detailed view of a book with information',
      },
    ],
    problem:
      'Libraries managing growing collections of books and digital resources need an efficient system to catalog, search, and manage their inventory and user access.',
    solution:
      'A centralized web platform for librarians to manage the book catalog and for users to search and browse the library\'s collection.',
    targetUsers: ['Library staff and administrators', 'Library members and readers'],
    features: [
      {
        title: 'Book Catalog Management',
        description: 'Add, edit, and organize books with title, author, genre, and availability information.',
      },
      {
        title: 'Search & Filter',
        description: 'Search and filter the catalog by title, author, or category.',
      },
      {
        title: 'Availability Tracking',
        description: 'Track which books are available or currently borrowed.',
      },
      {
        title: 'Admin Dashboard',
        description: 'Management interface for librarians to maintain the catalog.',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Search Catalog',
        description: 'User searches for books by title, author, or category.',
      },
      {
        step: 2,
        title: 'View Book Details',
        description: 'User views detailed information about a selected book and its availability.',
      },
      {
        step: 3,
        title: 'Admin Management',
        description: 'Librarian adds, edits, or removes books from the catalog through the admin panel.',
      },
    ],
    architecture:
      'React SPA frontend with a Node.js/Express.js REST API backend. MongoDB stores book catalog data and member information via Mongoose.',
    challenges: [
      {
        challenge: 'Efficient catalog search across large datasets',
        solution: 'Implemented MongoDB text indexes for fast full-text search across book titles and authors.',
      },
    ],
    results:
      'Working library management system with catalog browsing, search, and admin management capabilities.',
    githubUrl: 'https://github.com/mulee721',
    status: 'completed',
    featured: false,
  },
  {
    id: '5',
    slug: 'amharic-afaan-oromo-nmt',
    title: 'Amharic to Afaan Oromo Neural Machine Translation',
    category: 'AI/NLP Research',
    shortDescription:
      'A research project developing a neural machine translation system between Amharic and Afaan Oromo — two major Ethiopian languages with limited NLP resources.',
    fullDescription:
      'A neural machine translation research project completed during an internship at the Ethiopian Artificial Intelligence Institute (EAII). The project focuses on building a Transformer-based sequence-to-sequence model for translation between Amharic and Afaan Oromo — a challenging low-resource language pair. The work involved parallel corpus construction, data preprocessing, model training, and evaluation.',
    technologies: ['Python', 'PyTorch', 'Transformer', 'NLP', 'BPE', 'SentencePiece'],
    screenshot: '/images/AO.png',
    gallery: [
      {
        src: '/images/AO.png',
        caption: 'Amharic to Afaan Oromo NMT Model',
        alt: 'Amharic to Afaan Oromo Neural Machine Translation — main application screenshot',
      },
    ],
    problem:
      'Amharic and Afaan Oromo are among the most widely spoken languages in Ethiopia, yet there are very few machine translation tools that support translation between them. The lack of parallel training data and NLP resources makes this a challenging low-resource translation problem.',
    solution:
      'A Transformer-based neural machine translation system trained on a collected parallel corpus. The model uses subword tokenization to handle the morphological complexity of both languages.',
    targetUsers: [
      'NLP researchers working on African and Ethiopian languages',
      'Users needing translation between Amharic and Afaan Oromo',
      'Institutions working on multilingual communication in Ethiopia',
    ],
    features: [
      {
        title: 'Transformer NMT Architecture',
        description: 'Sequence-to-sequence model with multi-head attention for translation between language pairs.',
      },
      {
        title: 'Parallel Corpus Construction',
        description: 'Collection and processing of Amharic–Afaan Oromo sentence pairs for training.',
      },
      {
        title: 'Subword Tokenization',
        description: 'BPE/SentencePiece tokenization to handle the rich morphology of both languages.',
      },
      {
        title: 'BLEU Evaluation',
        description: 'Translation quality evaluation using BLEU score metrics.',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Data Collection',
        description: 'Collection and curation of parallel Amharic–Afaan Oromo text data.',
      },
      {
        step: 2,
        title: 'Preprocessing',
        description: 'Text cleaning, normalization, and subword tokenization using BPE.',
      },
      {
        step: 3,
        title: 'Model Training',
        description: 'Training the Transformer model on the prepared parallel corpus using PyTorch.',
      },
      {
        step: 4,
        title: 'Evaluation',
        description: 'Evaluating translation quality using BLEU scores on a held-out test set.',
      },
    ],
    architecture:
      'Transformer encoder-decoder architecture implemented in PyTorch. Subword tokenization with SentencePiece/BPE. Training pipeline with batching, learning rate scheduling, and checkpoint saving.',
    challenges: [
      {
        challenge: 'Limited parallel corpus size for this low-resource language pair',
        solution: 'Applied data augmentation techniques and BPE tokenization to maximize the utility of available data.',
      },
      {
        challenge: 'Handling the rich morphology of Amharic and Afaan Oromo',
        solution: 'Used subword tokenization (BPE) to break words into smaller units, improving the model\'s ability to generalize across word forms.',
      },
    ],
    results:
      'Research project completed as part of the EAII internship. A working NMT model was trained and evaluated. This is an academic research project and the model has not been deployed as a production service.',
    githubUrl: 'https://github.com/mulee721/Amharic2Afaan-Oromo-NMT.git',
    status: 'research',
    featured: true,
  },
];

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
