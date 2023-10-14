const PDFDOCUMENT = require('pdfkit');
const fs = require('fs');

function generatePDF(data, templatePath, outputPath) {
    const doc = new PDFDOCUMENT();
    doc.pipe(fs.createWriteStream(outputPath));

    //Embed the template of pdf as layout
    doc.image(templatePath, 0, 0, {width: 100, height: 100});

    //Add data to pdf, like table content
    doc.font('Helvetica').fontSize(12);
    //Loop through your data and add it to table pdf

    //Add date to footer
    doc.fontSize(8);
    doc.text('Date: ' + new Date().toLocaleDateString(), 50, 800);

    doc.end();
}

export default generatePDF();