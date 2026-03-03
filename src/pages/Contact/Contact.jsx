import React from 'react';
import styles from './Contact.module.css';
import { Button, Card, SectionHeader, Page } from '@/components';
import { contactData } from '@/data';

const Contact = () => {
    const { header, infoItems } = contactData;

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
                        <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" placeholder="Tu nombre" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="tu@email.com" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message">Mensaje</label>
                                <textarea id="message" rows="5" placeholder="¿En qué puedo ayudarte?" required></textarea>
                            </div>
                            <Button
                                variant="primary"
                                type="submit"
                                className={styles.submitBtn}
                            >
                                Enviar mensaje
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </Page>
    );
};

export default Contact;
