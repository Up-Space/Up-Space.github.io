# UpSpace Website

Your Space to Learn, Create, and Lead. Empowering the next generation of scholars with resources, opportunities, and community.

This is the codebase for the **UpSpace** project, a dynamic website built with **Next.js** and a file-based **CMS** (Content Management System) that allows non-technical users to manage content easily.

## Getting Started

First, ensure all dependencies are installed.

```bash
npm install

Next, run the development server:
npm run dev

Open http://localhost:3000 with your browser to see the website. The site will automatically update as you edit files.

Content Management (CMS)
Content for the website is managed through the integrated Netlify CMS.

Local CMS Access
To access the CMS locally, you must be running the development server.
 * Start the development server: npm run dev
 * Navigate to the CMS admin page: http://localhost:3000/admin
 
Key Content Files
 * Categories: /cms/categories.json
 * Homepage Data: /cms/home-data.md
 * Stats: /cms/stats.json
 
Project Structure
The project follows a standard Next.js directory structure with a focus on clear separation of concerns:
 * app/: Main application components and pages.
 * content/: All Markdown files for your blog posts and resources.
 * cms/: Configuration and data files for the CMS.
 * public/: Static assets like images, icons, and fonts.
 * src/lib/: Utility functions and helper libraries.
 * src/components/: Reusable React components.
 
Deploying to Production
The easiest way to deploy this application is to use a platform like Vercel or Netlify. The project is pre-configured to work with either service.

Vercel
Simply connect your Git repository to Vercel, and it will automatically detect the Next.js project and deploy it.

Netlify
Connect your Git repository and set the following build settings:
 * Build command: npm run build
 * Publish directory: out
