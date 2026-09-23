function downloadPDF() {
    const element = document.querySelector('#pdf-content');
    const button = document.querySelector('.btn-primary');

    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generando PDF...';
    button.disabled = true;

    const opt = {
        margin: 0,
        filename: 'CV_Esteban_Hoyos.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 3,
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
        pagebreak: { mode: 'avoid-all' }
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
}