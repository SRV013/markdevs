import React from 'react';
import { EmailIcon, PhoneIcon, LocationIcon } from '@/components';

export const contactData = {
    header: {
        title: "Trabajemos Juntos",
        subtitle: "¿Tienes un proyecto en mente? Me encantaría escuchar sobre él. Envíame un mensaje y te responderé lo antes posible."
    },
    infoItems: [
        {
            id: 'email',
            title: 'Email',
            value: 'srv013@gmail.com',
            icon: <EmailIcon />
        },
        {
            id: 'phone',
            title: 'Teléfono',
            value: '2235910296',
            icon: <PhoneIcon />
        },
        {
            id: 'location',
            title: 'Ubicación',
            value: 'Mar del Plata, Argentina',
            icon: <LocationIcon />
        }
    ]
};
