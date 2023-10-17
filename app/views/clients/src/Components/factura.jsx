const { PDFDocument, rgb } = require('pdf-lib');

async function generatePDF(invoiceData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const { width, height } = page.getSize();
  const fontSize = 30;

  page.drawText('Factura', {
    x: 50,
    y: height - 50,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Agrega los detalles de la factura a la página

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
