document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
  const numPages = pdfDoc.getPageCount();

  const container = document.getElementById('checkboxContainer');
  container.innerHTML = '';
  for (let i = 0; i < numPages; i++) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `pageCheckbox_${i}`;
    container.appendChild(checkbox);

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = ` Flip page ${i + 1}`;
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  }

  // Store for use in flip function
  file.originalArrayBuffer = arrayBuffer;
  file.pdfDoc = pdfDoc;
});

async function rotateAndDownloadPDF() {
  const file = document.getElementById('fileInput').files[0];
  if (!file?.pdfDoc) return;

  const pdfDoc = await PDFLib.PDFDocument.load(file.originalArrayBuffer);
  const numPages = pdfDoc.getPageCount();

  for (let i = 0; i < numPages; i++) {
    const checkbox = document.getElementById(`pageCheckbox_${i}`);
    if (checkbox?.checked) {
      const page = pdfDoc.getPage(i);
      const currentRotation = page.getRotation().angle;
      page.setRotation(PDFLib.degrees((currentRotation + 180) % 360));
    }
  }

  const modifiedPdfBytes = await pdfDoc.save();
  const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

  const baseName = file.name.replace(/\.pdf$/i, '');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "FLIPPED - " + baseName + ".pdf"
  link.click();
  URL.revokeObjectURL(link.href);
}
function createCheckboxes(numPages) {
  const container = document.getElementById('checkboxContainer');
  container.innerHTML = '';
  for (let i = 1; i <= numPages; i++) {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" id="pageCheckbox_${i}"> Flip Page ${i}`;
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  }
}