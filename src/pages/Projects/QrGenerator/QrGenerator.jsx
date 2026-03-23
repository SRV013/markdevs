import React, { useState } from 'react';
import styles from './QrGenerator.module.css';
import { QRCodeCanvas } from 'qrcode.react';
import { ProjectPage, PageHeader, PageTabs } from '@/components';

const WaIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
);

const MODES = [
    { id: 'url', label: 'URL / Texto' },
    { id: 'whatsapp', label: 'WhatsApp', icon: <WaIcon /> },
];

const QrGenerator = () => {
    const [mode, setMode] = useState('url');

    // URL / Text mode
    const [textValue, setTextValue] = useState('https://mark-devs.vercel.app');

    // WhatsApp mode
    const [waPhone, setWaPhone] = useState('');
    const [waMessage, setWaMessage] = useState('');

    // Shared
    const [size, setSize] = useState(256);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fgColor, setFgColor] = useState('#000000');

    const computedValue = () => {
        if (mode === 'whatsapp') {
            const phone = waPhone.replace(/\D/g, '');
            const msg = encodeURIComponent(waMessage);
            return phone ? `https://wa.me/${phone}${msg ? `?text=${msg}` : ''}` : ' ';
        }
        return textValue || ' ';
    };

    const downloadQr = () => {
        const canvas = document.getElementById('qr-canvas');
        if (!canvas) return;
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr-code.png';
        a.click();
    };

    return (
        <ProjectPage>
                <PageHeader
                    preText="Generador de"
                    accent="Códigos QR"
                    subtitle="Crea códigos QR personalizados al instante. URL, texto o mensajes de WhatsApp."
                />

                <PageTabs
                    tabs={MODES}
                    active={mode}
                    onChange={setMode}
                />

                <div className={styles.grid}>
                    {/* Controls */}
                    <div className={styles.controls}>

                        {mode === 'url' && (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Contenido / URL</label>
                                <textarea
                                    className={styles.textarea}
                                    value={textValue}
                                    onChange={(e) => setTextValue(e.target.value)}
                                    placeholder="Ingresá una URL o texto..."
                                    rows={4}
                                />
                            </div>
                        )}

                        {mode === 'whatsapp' && (
                            <>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Número de WhatsApp</label>
                                    <div className={styles.phoneInput}>
                                        <span className={styles.phonePrefix}>+</span>
                                        <input
                                            className={styles.input}
                                            type="tel"
                                            value={waPhone}
                                            onChange={(e) => setWaPhone(e.target.value)}
                                            placeholder="54 9 223 0000000"
                                        />
                                    </div>
                                    <p className={styles.hint}>Incluí el código de país sin el + (ej: 5492230000000)</p>
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Mensaje predefinido (opcional)</label>
                                    <textarea
                                        className={styles.textarea}
                                        value={waMessage}
                                        onChange={(e) => setWaMessage(e.target.value)}
                                        placeholder="Hola! Me contacto por..."
                                        rows={4}
                                    />
                                </div>
                                {waPhone && (
                                    <a
                                        className={styles.previewLink}
                                        href={computedValue()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                        Probar enlace
                                    </a>
                                )}
                            </>
                        )}

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Tamaño: {size}px</label>
                            <input
                                className={styles.range}
                                type="range"
                                min={128}
                                max={512}
                                step={32}
                                value={size}
                                onChange={(e) => setSize(Number(e.target.value))}
                            />
                        </div>

                        <div className={styles.colorRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Color QR</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
                                    <span>{fgColor}</span>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Fondo</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                                    <span>{bgColor}</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.downloadBtn} onClick={downloadQr}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Descargar PNG
                        </button>
                    </div>

                    {/* Preview */}
                    <div className={styles.preview}>
                        <div className={styles.qrWrapper}>
                            <QRCodeCanvas
                                id="qr-canvas"
                                value={computedValue()}
                                size={size}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                        <p className={styles.previewLabel}>Vista previa en tiempo real</p>
                    </div>
                </div>
        </ProjectPage>
    );
};

export { QrGenerator };
