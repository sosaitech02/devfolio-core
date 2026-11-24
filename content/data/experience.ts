import type { ExperienceData } from "@/lib/content-schemas";

/**
 * Trayectoria laboral y educación bilingüe verificada (CV 2026).
 */
export const experience: ExperienceData = [
  {
    id: "tihouse-fullstack",
    type: "work",
    role: {
      es: "Ingeniero de Software Full Stack",
      en: "Full Stack Software Engineer",
    },
    organization: "TiHouse",
    location: {
      es: "León, Nicaragua",
      en: "León, Nicaragua",
    },
    startDate: "2024-08",
    endDate: null,
    summary: {
      es: "Desarrollo y mantenimiento evolutivo de soluciones ERP empresariales para operaciones de agro, ganadería, avicultura, logística, control de acceso y minería.",
      en: "Development and ongoing maintenance of enterprise ERP solutions supporting agriculture, livestock, poultry, logistics, access control, and mining operations.",
    },
    highlights: {
      es: [
        "Implementación y soporte de módulos ERP críticos adaptados a procesos operativos de múltiples industrias (agro, ganadería, avicultura, logística, control de acceso y minería).",
        "Optimización de endpoints de API y consultas complejas en SQL Server para mejorar tiempos de respuesta y estabilidad en producción.",
        "Ejecución de pruebas de carga, diagnóstico de cuellos de botella y debugging sistemático con Apache JMeter.",
        "Automatización de integraciones y flujos operativos mediante n8n, Python, C#/.NET y control de versiones colaborativo en GitHub.",
      ],
      en: [
        "Built and maintained mission-critical ERP modules tailored to operational workflows across agriculture, livestock, poultry, logistics, access control, and mining.",
        "Optimized API endpoints and complex SQL Server queries to improve response times and production reliability.",
        "Executed load testing, bottleneck analysis, and systematic debugging using Apache JMeter.",
        "Automated operational workflows and integrations with n8n, Python, C#/.NET, and collaborative version control on GitHub.",
      ],
    },
    stack: [
      "PHP",
      "SQL Server",
      "JavaScript",
      "Python",
      "C# / .NET",
      "GitHub",
      "n8n",
      "JMeter",
    ],
    isPlaceholder: false,
  },
  {
    id: "freelance-fullstack",
    type: "work",
    role: {
      es: "Desarrollador Full Stack (Freelance)",
      en: "Full Stack Developer (Freelance)",
    },
    organization: "Freelance",
    location: {
      es: "León, Nicaragua · Remoto",
      en: "León, Nicaragua · Remote",
    },
    startDate: "2024-03",
    endDate: null,
    summary: {
      es: "Diseño y entrega de aplicaciones web end-to-end para clientes de negocio, desde el levantamiento de requerimientos hasta el despliegue de MVPs escalables.",
      en: "End-to-end design and delivery of business web applications, spanning requirements gathering through scalable MVP deployment.",
    },
    highlights: {
      es: [
        "Construcción de interfaces web responsivas y modulares con React, TypeScript y Tailwind CSS.",
        "Diseño e implementación de APIs REST con Django y Node.js respaldadas por documentación interactiva en Swagger.",
        "Modelado relacional y optimización de consultas en PostgreSQL para respaldar flujos de negocio en crecimiento.",
        "Desarrollo de MVPs escalables con autenticación segura y control de acceso basado en roles (RBAC).",
      ],
      en: [
        "Built responsive, modular web interfaces with React, TypeScript, and Tailwind CSS.",
        "Designed and implemented REST APIs using Django and Node.js backed by interactive Swagger documentation.",
        "Modeled relational schemas and tuned PostgreSQL queries to support growing business workloads.",
        "Delivered scalable MVPs featuring secure authentication and role-based access control (RBAC).",
      ],
    },
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Django",
      "PostgreSQL",
      "Swagger",
      "RBAC",
    ],
    isPlaceholder: false,
  },
  {
    id: "nixi-telegram-bot",
    type: "work",
    role: {
      es: "Desarrollador Full Stack Freelance",
      en: "Full Stack Developer Freelance",
    },
    organization: 'Nixi "Your Adventure Companion"',
    location: {
      es: "Remoto",
      en: "Remote",
    },
    startDate: "2023-05",
    endDate: "2023-08",
    summary: {
      es: "Desarrollo de un chatbot de Telegram impulsado por IA para asistencia turística en tiempo real.",
      en: "Development of an AI-powered Telegram chatbot delivering real-time tourism assistance.",
    },
    highlights: {
      es: [
        "Integración de flujos conversacionales asistidos por IA directamente sobre Telegram Bot API.",
        "Persistencia de consultas y datos turísticos en MySQL para ofrecer respuestas ágiles y contextuales en tiempo real.",
      ],
      en: [
        "Integrated AI-assisted conversational workflows directly over the Telegram Bot API.",
        "Structured query and tourism data persistence in MySQL to deliver fast, contextual real-time responses.",
      ],
    },
    stack: ["Python", "Telegram Bot API", "MySQL", "AI Chatbot"],
    isPlaceholder: false,
  },
  {
    id: "ulsa-electronic-cybernetic-engineering",
    type: "education",
    role: {
      es: "Ingeniería Electrónica y Cibernética",
      en: "Electronic and Cybernetic Engineering",
    },
    organization: "Universidad Tecnológica La Salle (ULSA)",
    location: {
      es: "León, Nicaragua",
      en: "León, Nicaragua",
    },
    startDate: "2020-01",
    endDate: "2024-05",
    summary: {
      es: "Formación en ingeniería orientada a sistemas cibernéticos, desarrollo de software, arquitectura de datos y electrónica aplicada.",
      en: "Engineering degree focused on cybernetic systems, software development, data architecture, and applied electronics.",
    },
    highlights: {
      es: [
        "Base sólida en programación, arquitectura de sistemas, bases de datos y resolución estructurada de problemas de ingeniería.",
      ],
      en: [
        "Strong foundation in software programming, systems architecture, databases, and structured engineering problem solving.",
      ],
    },
    stack: ["Software Engineering", "Cybernetics", "Databases", "Systems Design"],
    isPlaceholder: false,
  },
];
