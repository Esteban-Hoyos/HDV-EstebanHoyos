function downloadPDF() {
    const element = document.querySelector('#pdf-content');
    const button = document.querySelector('.btn-primary');

    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generando PDF...';
    button.disabled = true;

    // FIX: forzar la vista al inicio de la página antes de capturar.
    // Como el botón está al final del CV, el usuario siempre hace scroll
    // hacia abajo para hacer clic, y html2canvas captura mal el contenido
    // si la página no está desplazada hasta arriba (bug conocido de la librería).
    window.scrollTo(0, 0);

    // Pequeña pausa para asegurar que el navegador termine de repintar
    // después del scroll, antes de que html2canvas tome la "foto".
    setTimeout(() => {
        const opt = {
            margin: 0,
            filename: 'CV_Esteban_Hoyos.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                scrollY: 0,
                scrollX: 0,
                backgroundColor: '#ffffff',
                logging: false,
                windowWidth: 1200
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { mode: ['css', 'legacy'] }
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            })
            .catch((error) => {
                console.error('Error:', error);
                button.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Error en la descarga';
                button.disabled = false;
                setTimeout(() => { button.innerHTML = originalText; }, 3000);
            });
    }, 200);
}
