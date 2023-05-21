function generatePDF(){
    const element = document.getElementById("invoice");

    //console.log(Invoicenumber);
    const opt = {
        margin:       0,
        filename:     `${Invoicenumber}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
      
}
