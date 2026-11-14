# 🎨 Mulee Portfolio

A modern, responsive portfolio website showcasing my projects, skills, and professional experience in full-stack web development and AI/NLP research.

**Live Demo**: [mulee-portfolio.vercel.app](https://mulee-portfolio.vercel.app)

---

## ✨ Key Features

- 🎨 **Modern UI** - Responsive design with smooth animations
- 📱 **Mobile-First** - Works seamlessly on all devices
- 🌍 **Multi-Language** - English, Amharic, Afaan Oromo
- 🎯 **Project Showcase** - 5 featured projects with detailed descriptions
- 💼 **Professional Sections** - About, Skills, Experience, Services
- ✉️ **Contact Form** - EmailJS integration for messages
- 🌙 **Dark Mode** - Beautiful dark theme support

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── sections/        # Main page sections (Projects, Skills, etc.)
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── data/            # Projects and content data
│   ├── types/           # TypeScript type definitions
│   └── App.tsx          # Main app component
├── public/
│   └── images/          # Project screenshots and images
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

### Build Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Email**: EmailJS
- **Linting**: Oxlint

---

## 📋 Featured Projects

1. **Student Course Registration System** - Full-stack university platform (React, NestJS, MongoDB)
2. **Food Ordering & Delivery** - Online food ordering app (React, Node.js, MongoDB)
3. **Digital Library Management** - Library resource system (React, Node.js, MongoDB)
4. **Budget Flow Control** - Personal finance tracker (PHP, MySQL)
5. **Amharic-Afaan Oromo NMT** - AI translation research (Python, PyTorch, Transformers)

---

## 📱 Sections

- **About** - Introduction and background
- **Projects** - Portfolio projects with filters
- **Skills** - Technical expertise categorized
- **Experience** - Professional work history
- **Services** - Services offered
- **Contact** - Get in touch with EmailJS form

---

## 🎨 Customization

Edit content in `src/data/`:
- `projects.ts` - Add/edit projects
- Update profile info in components
- Modify colors in `tailwind.config.js`

---

## 📝 Environment Variables

Create `.env.local` in the frontend folder:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [EmailJS](https://www.emailjs.com)

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag dist folder to Netlify
```

---

## 📞 Contact

- 📧 Email: [mulee@example.com]
- 🔗 GitHub: [@mulee721](https://github.com/mulee721)
- 💼 LinkedIn: [mulee-profile]

---

## 📄 License

MIT License - Feel free to use and modify

---

**Last Updated**: November 2026 | **Version**: 1.0.0
