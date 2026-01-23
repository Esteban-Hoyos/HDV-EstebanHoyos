function downloadPDF(){
    const element = document.querySelector('#pdf-content');
    const button = document.querySelector('.btn-primary');
    
    // Mostrar estado de descarga
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generando PDF...';
    button.disabled = true;

    const opt = {
        margin: [10, 5, 15, 5], //[arriba, izquierda, abajo, derecha] en mm
        filename: 'CV_Esteban_Hoyos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            backgroundColor: '#ffffff',
            logging: false
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
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
            console.error('Error al descargar PDF:', error);
            button.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Error en la descarga';
            button.disabled = false;
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 3000);
        });
}