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
    doc.fontSize(14).text(`Source :  ${report.status}`);
    doc.fontSize(14).text(`Rapport ${report.category}`, {underline: true});
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(25).text(`Rapport de santé mentale de ${report.User.firstname} ${report.User.lastname}`); 
    doc.moveDown();
    doc.fontSize(12).text(`${report.description}`, {
        indent: 30
    });

    doc.moveDown();
    doc.moveDown();

    if (report.messages && report.messages.length > 0) {
        doc.fontSize(18).text('Messages:', { underline: true });
        doc.moveDown();
        report.messages.forEach(message => {
            const messageDate = new Date(message.timestamp);
            const messageDay = String(messageDate.getDate()).padStart(2, '0');
            const messageMonth = String(messageDate.getMonth() + 1).padStart(2, '0');
            const messageYear = messageDate.getFullYear();
            const formattedMessageDate = `${messageDay}-${messageMonth}-${messageYear}`;
            
            doc.fontSize(12).fillColor('black').text(`Message on ${formattedMessageDate}:`);
            doc.fontSize(12).fillColor('black').text(`${message.content}`, { indent: 20  });
            doc.moveDown();
        });
    } else {
        //doc.fontSize(25).text('pas de messages');
    }


    doc.end();
}