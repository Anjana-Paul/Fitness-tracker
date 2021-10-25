import { Injectable } from "@angular/core";

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


@Injectable()
export class PdfService{
  head= [
    ['Date',
    'Name',
    'Duration',
    'Calories',
    'State']
  ];
  data = [
    ['Oct 10,2021', 'kroos', 10, 120, 'completed']
  ];

  constructor(
  ){}

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My Past Exercises', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: this.head,
      body: this.data,
      theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })
    doc.output('dataurlnewwindow');  // to Open PDF document in new tab
    doc.save('my_exercises.pdf'); //Download PDF document
  }
}
