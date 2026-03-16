import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import { Button, Card, SectionHeader, Page } from '@/components';
import { contactData } from '@/data';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
    const { header, infoItems } = contactData;
    const formRef = useRef(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
                publicKey: EMAILJS_PUBLIC_KEY,
            })
            .then(() => {
                setStatus('success');
                formRef.current.reset();
            })
            .catch(() => {
                setStatus('error');
            });
    };

    return (
        <Page>
            <div className={styles.twoColumnLayout}>
                <div className={styles.leftCol}>
                    <div className={styles.contactContainer}>
                        <SectionHeader
                            title={header.title}
                            subtitle={header.subtitle}
                        />
                    </div>

                    <div className={styles.infoList}>
                        {infoItems.map((item) => (
                            <Card key={item.id} padding="small" hoverEffect="right" className={styles.infoItem}>
                                <div className={styles.iconWrapper}>
                                    {item.icon}
                                </div>
                                <div className={styles.infoText}>
                                    <h3>{item.title}</h3>
                                    <p>{item.value}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <Card padding="medium" hover={false} className={styles.formSide}>
                        <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" name="from_name" placeholder="Tu nombre" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="reply_to" placeholder="tu@email.com" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message">Mensaje</label>
                                <textarea id="message" name="message" rows="5" placeholder="¿En qué puedo ayudarte?" required></textarea>
                            </div>

                            {status === 'success' && (
                                <p className={styles.successMsg}>Mensaje enviado correctamente.</p>
                            )}
                            {status === 'error' && (
                                <p className={styles.errorMsg}>Hubo un error al enviar. Intentá de nuevo.</p>
                            )}

                            <Button
                                variant="primary"
                                type="submit"
                                className={styles.submitBtn}
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </Page>
    );
};

export { Contact };
