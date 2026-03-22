// src/data/projects.js
import imgProyecto1 from "@/assets/projects/proyecto1.jpg";
import imgProyecto2 from "@/assets/projects/proyecto2.jpg";
import imgProyecto3 from "@/assets/projects/proyecto3.jpg";
import imgProyecto4 from "@/assets/projects/proyecto4.jpg";
import imgProyecto5 from "@/assets/projects/proyecto5.jpg";
import imgProyecto6 from "@/assets/projects/proyecto6.png";
import imgTruco from "@/assets/projects/game/truco.png";
import imgGenerala from "@/assets/projects/game/generala.png";
import imgNeutro from "@/assets/projects/game/neutro.jpeg";

export const projects = [
  {
    title: "YaMiPC",
    category: "E-commerce",
    description:
      "Tienda online especializada en hardware y servicios técnicos personalizados.",
    tags: ["JavaScript", "Node.js", "React", "MySQL"],
    image: imgProyecto1,
    link: "https://yamipc.com",
  },
  {
    title: "Provemix",
    category: "Web",
    description:
      "Plataforma institucional y catálogo completo para servicios de veterinaria.",
    tags: ["React", "JavaScript", "CSS Modules"],
    image: imgProyecto2,
    link: "https://provemix.com.ar",
  },
  {
    title: "Estudio Contable RDB",
    category: "Web",
    description:
      "Sitio institucional profesional para estudio contable y asesoría integral.",
    tags: ["Astro", "Tailwind"],
    image: imgProyecto3,
    link: "https://estudiordb.com.ar",
  },
  {
    title: "Padel Mach",
    category: "E-commerce",
    description:
      "Tienda online especializada en hardware y servicios técnicos personalizados.",
    tags: ["JavaScript", "Node.js", "React", "MySQL"],
    image: imgProyecto4,
    link: "https://padelmach.com.ar",
  },
  {
    title: "Costa Pigmento",
    category: "E-commerce",
    description:
      "Tienda online especializada en hardware y servicios técnicos personalizados.",
    tags: ["JavaScript", "Node.js", "React", "MySQL"],
    image: imgProyecto5,
    link: "https://costapigmento.com.ar",
  },
  {
    title: "Generador QR",
    category: "App",
    description: "Generador de códigos QR para eventos.",
    tags: ["JavaScript", "React"],
    image: imgProyecto6,
    link: "/proyectos/qr",
  },
  {
    title: "Anotador Truco",
    category: "App",
    description:
      "Cantá truco, retruco o vale cuatro… que de los puntos nos encargamos nosotros. Llevá la partida sin discusiones y concentrate en ganar.",
    tags: ["JavaScript", "React"],
    image: imgTruco,
    link: "https://mark-scores.vercel.app/truco",
  },
  {
    title: "Anotador Generala",
    category: "App",
    description:
      "Tirá los dados y dejá que la app haga el resto. Anotá cada jugada de Generala fácil, rápido y sin errores.",
    tags: ["JavaScript", "React"],
    image: imgGenerala,
    link: "https://mark-scores.vercel.app/generala",
  },
  {
    title: "Anotador Neutro",
    category: "App",
    description:
      "Un anotador simple y flexible para cualquier juego. Sumá puntos, organizá partidas y evitá discusiones innecesarias.",
    tags: ["JavaScript", "React"],
    image: imgNeutro,
    link: "https://mark-scores.vercel.app/neutro",
  },
];
