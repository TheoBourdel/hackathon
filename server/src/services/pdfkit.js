import PDFDocument from 'pdfkit'; 

export function buildPdf(report, dataCallback, endCallback) {
    const doc = new PDFDocument();
    
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const date = new Date(report.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    doc.fontSize(25).fillColor('#FB4F14').text('Calmedica');
    doc.moveDown();
    doc.fontSize(14).fillColor('black').text(`${formattedDate}`);
    doc.fontSize(14).text(`Rapport ${report.category}`, {underline: true});
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(25).text(`${report.title}`);
    doc.moveDown();
    doc.fontSize(12).text(`${report.description}`, {
        indent: 30
    });

    doc.end();
}