# SkillSprint MVP

https://preview--skill-quest-sprint.lovable.app/

An app that helps beginners quickly learn a skill and launch their first mini-income stream in just 30 days — simple,
guided, and action-focused.

Built with [Lovable](https://lovable.dev) (AI-powered development platform), Vite, React, TypeScript, and Tailwind CSS, featuring a beautiful UI powered by shadcn/ui components. This project is hosted on GitLab and serves as a reference implementation for future development.

## Quick Start 🚀

1. **Clone & Install**
```bash
git clone https://gitlab.com/your-organization/skill-quest-sprint.git
cd skill-quest-sprint
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. **Start Development**
```bash
npm run dev
```
Access the application at [http://localhost:5173](http://localhost:5173)

## Development with Lovable 🛠

This project is primarily developed using [Lovable](https://lovable.dev), an AI-powered development platform that helps:
- Generate and modify code through natural language prompts
- Maintain consistent code style and best practices
- Speed up development with AI-assisted coding
- Automatically handle common development tasks

To contribute using Lovable:
1. Visit the [Lovable Project](https://lovable.dev/projects/d35c4ebb-140b-419e-975e-f37c73bdc7fd)
2. Start prompting to make changes
3. Changes will be automatically committed to the GitHub repository

## Documentation 📚

All project documentation is stored in the `docs/` directory:

- `docs/Development_Plan/` - Development plan for 2025T1 Phase 2
- `docs/How_It_Works/` - Application logic
- `docs/Proposal/` - Project proposal
- `docs/Team_GitHub_Workflow/` - Standard workflow for team collaboration


## Key Features ✨

- AI-powered 30-Days Challenge Creator (auto-suggests daily tasks)
- Daily Action Checklist (check off tasks)
- Progress Tracker (visual streaks or progress bar)
- Resources Linker (connect to simple articles/videos if needed)

## Project Structure 📁

```
skill-quest-sprint/
├── src/                    # Source code
│   ├── components/        # UI components
│   │   ├── ui/           # shadcn/ui components
│   │   └── shared/       # Shared components
│   ├── features/         # Feature modules
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # External services
│   └── utils/            # Helper functions
├── docs/                  # Documentation
├── public/               # Static assets
└── supabase/            # Database config
```

## Development Guidelines 🛠

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use Tailwind CSS for styling
- Create reusable components

### GitLab Workflow
1. Create feature branch from `main`
2. Follow conventional commits
3. Create merge request
4. Ensure CI/CD passes

## Available Scripts 📜

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Technology Stack 💻

### Frontend
- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Query + Context API
- React Router
- Framer Motion

### Backend
- Supabase
  - PostgreSQL
  - Authentication
  - Real-time features
  - Storage

## Contributing 🤝

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a merge request

## Support 💬

- 📚 Check the documentation
- 🐛 Create an issue in GitLab

## Pending Improvements 📋

### High Priority
- [ ] Implement real AI generation for sprint challenge
- [ ] Add pre-designed sprint program with resources and working templates






