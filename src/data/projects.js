// src/data/projects.js
import imgYamipc from "@/assets/web/yamipc.jpg";
import imgProvemix from "@/assets/web/provemix.jpg";
import imgEstudioRdb from "@/assets/web/estudio-rdb.jpg";
import imgCostaPigmento from "@/assets/web/costa-pigmento.jpg";
import imgGeneradorQr from "@/assets/app/generador-qr.png";
import imgMisGastos from "@/assets/app/mis-gastos.png";
import imgTruco from "@/assets/game/truco.png";
import imgCaptura from "@/assets/game/captura.jpg";
import imgGenerala from "@/assets/game/generala.png";
import imgNeutro from "@/assets/game/neutro.jpeg";
import imgMundiales from "@/assets/web/mundiales.webp";

export const projects = [
  {
    title: "YaMiPC",
    category: "E-commerce",
    description:
      "Tienda online especializada en hardware y servicios técnicos personalizados.",
    tags: ["JavaScript", "Node.js", "React", "MySQL"],
    image: imgYamipc,
    link: "https://yamipc.com",
  },
  {
    title: "Provemix",
    category: "Web",
    description:
      "Plataforma institucional y catálogo completo para servicios de veterinaria.",
    tags: ["React", "JavaScript", "CSS Modules"],
    image: imgProvemix,
    link: "https://provemix.com.ar",
  },
  {
    title: "Estudio Contable RDB",
    category: "Web",
    description:
      "Sitio institucional profesional para estudio contable y asesoría integral.",
    tags: ["Astro", "Tailwind"],
    image: imgEstudioRdb,
    link: "https://estudiordb.com.ar",
  },
  {
    title: "Costa Pigmento",
    category: "Web",
    description:
      "Tienda online especializada en hardware y servicios técnicos personalizados.",
    tags: ["JavaScript", "Node.js", "React", "MySQL"],
    image: imgCostaPigmento,
    link: "https://costapigmento.com.ar",
  },
  {
    title: "Historia Mundiales",
    category: "Web",
    description:
      "Explorá estadísticas, historias y resultados de todos los Mundiales en un solo lugar.Reviví momentos históricos y analizá el rendimiento de selecciones y jugadores a lo largo del tiempo.",
    tags: ["JavaScript", "React", "Firebase"],
    image: imgMundiales,
    link: "https://markworlds.vercel.app/",
  },
  {
    title: "Generador QR",
    category: "App",
    description: "Generador de códigos QR para eventos.",
    tags: ["JavaScript", "React"],
    image: imgGeneradorQr,
    link: "/proyectos/qr",
  },
  {
    title: "Mis Gastos",
    category: "App",
    description: "Generador de códigos QR para eventos.",
    tags: ["JavaScript", "React"],
    image: imgMisGastos,
    link: "/proyectos/misgastos",
  },
  {
    title: "Puzzle Captura",
    category: "Game",
    description: "Juego de captura.",
    tags: ["JavaScript", "React"],
    image: imgCaptura,
    link: "https://mark-scores.vercel.app/captura",
  },
  {
    title: "Anotador Truco",
    category: "Game",
    description:
      "Cantá truco, retruco o vale cuatro… que de los puntos nos encargamos nosotros. Llevá la partida sin discusiones y concentrate en ganar.",
    tags: ["JavaScript", "React"],
    image: imgTruco,
    link: "https://mark-scores.vercel.app/truco",
  },
  {
    title: "Anotador Generala",
    category: "Game",
    description:
      "Tirá los dados y dejá que la app haga el resto. Anotá cada jugada de Generala fácil, rápido y sin errores.",
    tags: ["JavaScript", "React"],
    image: imgGenerala,
    link: "https://mark-scores.vercel.app/generala",
  },
  {
    title: "Anotador Neutro",
    category: "Game",
    description:
      "Un anotador simple y flexible para cualquier juego. Sumá puntos, organizá partidas y evitá discusiones innecesarias.",
    tags: ["JavaScript", "React"],
    image: imgNeutro,
    link: "https://mark-scores.vercel.app/neutro",
  },
];
