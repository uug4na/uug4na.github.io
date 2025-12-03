<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# uug4na's Comic Blog

A comic-themed blog built with React, TypeScript, Vite, and Tailwind CSS.

## Run Locally

**Prerequisites:** Node.js 20+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

3. The site will automatically deploy on every push to the `main` branch
   - Access your site at: `https://uug4na.github.io/web/`

### Manual Deployment:

If you prefer manual deployment, you can also run:
```bash
npm run build
# Then deploy the `dist` folder to your hosting service
```

## Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation
- **React Markdown** - Markdown Rendering
