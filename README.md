# shreshtadev/website

This repository hosts a full-stack web project built using modern JavaScript technologies, primarily featuring a Next.js frontend and a Strapi backend (Headless CMS).

## Project Structure

- **skym-web/**: The frontend application, powered by [Next.js](https://nextjs.org), offers a performant, SEO-friendly website with modern tooling and best practices.
- **skym-cms/**: The backend, built with [Strapi](https://strapi.io), serves as a flexible content management system to manage dynamic content and APIs for the frontend.

---

## Features

### Frontend (`skym-web`)
- Built using Next.js, offering features such as server-side rendering and static site generation.
- Easy local development and deployment, including support for Vercel.
- Font optimization and support for modern web standards.
- Customizable and extensible via TypeScript.

### Backend (`skym-cms`)
- Powered by Strapi Headless CMS.
- Robust API generation for content types like "About Us" and "Reviews".
- Configurable authentication, roles, and permissions.
- Supports multiple databases (default: SQLite; configurable for MySQL/PostgreSQL).
- Easily extensible with plugins and custom business logic.

---

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- bun (for package management)
- (Optional) PostgreSQL/MySQL for production CMS

### Setup

#### 1. For Linux
```bash
chmod +x run_dev.sh
./run_dev.sh
```

#### 1. For Windows (with Powershell)
```powershell
.\run_dev.ps1
```

## Deployment

- **Frontend:** Deploy easily to [Vercel](https://vercel.com/) or your preferred platform. See Next.js [deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
- **Backend:** Strapi can be deployed to services like Heroku, DigitalOcean, or Strapi Cloud. See Strapi [deployment docs](https://docs.strapi.io/dev-docs/deployment).

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Resource Center](https://strapi.io/resource-center)
- [Strapi Community Forum](https://forum.strapi.io/)

---

## License

This project is currently unlicensed. Please add a license if you intend to distribute or use this project publicly.

---

## Contributing

Feedback and contributions are welcome! Please open issues or pull requests as needed.
