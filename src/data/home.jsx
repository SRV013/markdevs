import React from 'react';
import { FrontendIcon, BackendIcon, FullStackIcon } from '@/components';

export const homeData = {
    services: [
        {
            title: 'Desarrollo Frontend',
            description: 'Diseño y desarrollo de sitios web, aplicaciones y sistemas escalables, con enfoque en rendimiento, usabilidad y soluciones digitales adaptadas a cada necesidad.',
            icon: <FrontendIcon />
        },
        {
            title: 'Arquitectura Backend',
            description: 'Diseño y desarrollo de APIs y estructuras de datos escalables, orientadas a la estabilidad, seguridad y rendimiento de aplicaciones y sistemas complejos.',
            icon: <BackendIcon />
        },
        {
            title: 'Soluciones Full Stack',
            description: 'Desarrollo integral de aplicaciones y sistemas web, desde la planificación hasta la implementación y puesta en producción, garantizando coherencia y eficiencia en cada etapa.',
            icon: <FullStackIcon />
        }
    ]
};
