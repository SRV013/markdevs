// src/data/projects.js
import imgProyecto1 from '@/assets/projects/proyecto1.jpg';
import imgProyecto2 from '@/assets/projects/proyecto2.jpg';
import imgProyecto3 from '@/assets/projects/proyecto3.jpg';
import imgProyecto4 from '@/assets/projects/proyecto4.jpg';
import imgProyecto5 from '@/assets/projects/proyecto5.jpg';
import imgProyecto6 from '@/assets/projects/proyecto6.png';
import imgProyecto7 from '@/assets/projects/proyecto7.png';

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
        category: 'Web',
        description: 'Plataforma institucional y catálogo completo para servicios de veterinaria.',
        tags: ['React', 'JavaScript', 'CSS Modules'],
        image: imgProyecto2,
        link: 'https://provemix.com.ar'
    },
    {
        title: 'Estudio Contable RDB',
        category: 'Web',
        description: 'Sitio institucional profesional para estudio contable y asesoría integral.',
        tags: ['Astro', 'Tailwind'],
        image: imgProyecto3,
        link: 'https://estudiordb.com.ar'
    },
    {
        title: 'Padel Mach',
        category: 'E-commerce',
        description: 'Tienda online especializada en hardware y servicios técnicos personalizados.',
        tags: ['JavaScript', 'Node.js', 'React', 'MySQL'],
        image: imgProyecto4,
        link: 'https://padelmach.com.ar'
    },
    {
        title: 'Costa Pigmento',
        category: 'E-commerce',
        description: 'Tienda online especializada en hardware y servicios técnicos personalizados.',
        tags: ['JavaScript', 'Node.js', 'React', 'MySQL'],
        image: imgProyecto5,
        link: 'https://costapigmento.com.ar'
    },
    {
        title: 'Generador QR',
        category: 'App',
        description: 'Generador de códigos QR para eventos.',
        tags: ['JavaScript', 'React'],
        image: imgProyecto6,
        link: '/proyectos/qr'
    },
    {
        title: 'Anotador Juegos',
        category: 'App',
        description: 'Aplicación para llevar la cuenta de Juegos como la Generala, Truco, etc.',
        tags: ['JavaScript', 'React'],
        image: imgProyecto7,
        link: 'https://mark-scores.vercel.app'
    }
];
