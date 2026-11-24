import type { SocialsData } from "@/lib/content-schemas";

/**
 * Datos verificados de perfil, contacto público y CVs por idioma (CV 2026).
 * El número telefónico personal se omite deliberadamente por privacidad web.
 */
export const socials: SocialsData = {
  brandName: "devfolio-core",
  fullName: "Cruzmar Ramón Sosa Rubí",
  role: {
    es: "Ingeniero de Software Full Stack",
    en: "Full Stack Software Engineer",
  },
  bio: {
    es: "Ingeniero de Software enfocado en diseñar, escalar y llevar productos web full-stack desde los requerimientos de negocio hasta producción (React/Next.js, Node.js/NestJS, Python, APIs REST, bases de datos relacionales, optimización de rendimiento y flujos asistidos por IA).",
    en: "Software Engineer focused on designing, scaling, and shipping full-stack web products from business requirements to production (React/Next.js, Node.js/NestJS, Python, REST APIs, relational databases, performance optimization, and AI-assisted workflows).",
  },
  location: {
    es: "León, Nicaragua · Remoto",
    en: "León, Nicaragua · Remote",
  },
  availability: {
    es: "Disponible para roles remotos Full Stack",
    en: "Available for remote Full Stack roles",
  },
  spokenLanguages: [
    {
      name: {
        es: "Español",
        en: "Spanish",
      },
      level: {
        es: "Nativo",
        en: "Native",
      },
    },
    {
      name: {
        es: "Inglés",
        en: "English",
      },
      level: {
        es: "B2 Intermedio Alto",
        en: "B2 Upper-Intermediate",
      },
    },
  ],
  email: "cruzmarsosa18@gmail.com",
  github: "https://github.com/Cruzmar-Sosa",
  linkedin: "https://www.linkedin.com/in/cruzmar-ramon-sosa-rubi-012147293/",
  cv: {
    es: "/cv/CV-Cruzmar-Sosa-ES.pdf",
    en: "/cv/CV-Cruzmar-Sosa-EN.pdf",
  },
  isPlaceholder: false,
};
