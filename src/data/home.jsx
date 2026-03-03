import React from 'react';
import { FrontendIcon, BackendIcon, FullStackIcon } from '@/components';

export const homeData = {
    services: [
        {
            title: 'Desarrollo Frontend',
            description: 'Creación de interfaces de usuario responsivas, interactivas y de alto rendimiento usando React y CSS moderno.',
            icon: <FrontendIcon />
        },
        {
            title: 'Arquitectura Backend',
            description: 'Construcción de APIs robustas y esquemas de base de datos escalables para potenciar aplicaciones complejas.',
            icon: <BackendIcon />
        },
        {
            title: 'Soluciones Full Stack',
            description: 'Desarrollo integral desde el concepto hasta el despliegue, asegurando una integración perfecta.',
            icon: <FullStackIcon />
        }
    ]
};
