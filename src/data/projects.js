// src/data/projects.js
import imgProyecto1 from '../assets/projects/proyecto1.jpg';
import imgProyecto2 from '../assets/projects/proyecto2.jpg';
import imgProyecto3 from '../assets/projects/proyecto3.jpg';

export const projects = [
    {
        title: 'YaMiPC',
        category: 'E-commerce',
        description: 'Tienda online especializada en hardware y servicios técnicos personalizados.',
        tags: ['JavaScript', 'Node.js', 'React', 'MySQL'],
        image: imgProyecto1,
        link: 'https://yamipc.com'
    },
    {
        title: 'Provemix',
        category: 'Catálogo & Institucional',
        description: 'Plataforma institucional y catálogo completo para servicios de veterinaria.',
        tags: ['React', 'JavaScript', 'CSS Modules'],
        image: imgProyecto2,
        link: 'https://provemix.com.ar'
    },
    {
        title: 'Estudio Contable RDB',
        category: 'Institucional',
        description: 'Sitio institucional profesional para estudio contable y asesoría integral.',
        tags: ['Astro', 'Tailwind'],
        image: imgProyecto3,
        link: 'https://estudiordb.com.ar'
    }
];
