import type { SkillsMatrixData } from "@/lib/content-schemas";

/**
 * Matriz real y verificada de habilidades técnicas (CV 2026), agrupada en 5 categorías.
 */
export const skillsMatrix: SkillsMatrixData = [
  {
    id: "languages",
    label: {
      es: "Lenguajes",
      en: "Languages",
    },
    description: {
      es: "Lenguajes utilizados en producción para desarrollo full-stack, sistemas empresariales, automatización y consultas de datos.",
      en: "Production languages for full-stack engineering, enterprise systems, automation, and data querying.",
    },
    items: [
      { name: "TypeScript", primary: true },
      { name: "JavaScript (ES6+)", primary: true },
      { name: "Python", primary: true },
      { name: "PHP" },
      { name: "C#" },
      { name: "SQL", primary: true },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    id: "frontend",
    label: {
      es: "Frontend",
      en: "Frontend",
    },
    description: {
      es: "Interfaces web modernas, responsivas y mantenibles orientadas a rendimiento y experiencia de usuario.",
      en: "Modern, responsive, and maintainable web interfaces focused on performance and user experience.",
    },
    items: [
      { name: "React", primary: true },
      { name: "Next.js", primary: true },
      { name: "Tailwind CSS", primary: true },
      { name: "Styled Components" },
    ],
  },
  {
    id: "backend",
    label: {
      es: "Backend",
      en: "Backend",
    },
    description: {
      es: "Arquitectura de APIs REST, autenticación segura, control de acceso por roles y documentación técnica.",
      en: "REST API architecture, secure authentication, role-based access control, and technical API documentation.",
    },
    items: [
      { name: "Node.js", primary: true },
      { name: "NestJS", primary: true },
      { name: "Django", primary: true },
      { name: "FastAPI" },
      { name: ".NET" },
      { name: "REST APIs", primary: true },
      { name: "JWT" },
      { name: "RBAC" },
      { name: "Swagger" },
    ],
  },
  {
    id: "databases",
    label: {
      es: "Bases de Datos",
      en: "Databases",
    },
    description: {
      es: "Modelado relacional, optimización de consultas SQL y persistencia de datos en entornos empresariales.",
      en: "Relational data modeling, SQL query optimization, and data persistence in business environments.",
    },
    items: [
      { name: "PostgreSQL", primary: true },
      { name: "SQL Server", primary: true },
      { name: "MariaDB" },
      { name: "MySQL" },
      { name: "Prisma ORM" },
    ],
  },
  {
    id: "devops-tools",
    label: {
      es: "DevOps y Herramientas",
      en: "DevOps & Tools",
    },
    description: {
      es: "Despliegue en la nube, control de versiones, pruebas de carga, automatización y flujos de trabajo asistidos por IA.",
      en: "Cloud deployment, version control, load testing, workflow automation, and AI-assisted engineering workflows.",
    },
    items: [
      { name: "Vercel", primary: true },
      { name: "Render" },
      { name: "Supabase" },
      { name: "Cloudflare" },
      { name: "Git", primary: true },
      { name: "GitHub", primary: true },
      { name: "JMeter" },
      { name: "n8n" },
      { name: "Linux" },
      { name: "Postman" },
      { name: "Ollama / AI-Assisted Workflows" },
    ],
  },
];
