import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import { ExcelService } from '../excel.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  newarray=[]
  dataSource = new MatTableDataSource<Exercise>();
  head = [this.displayedColumns];
  datas = [['ghg','ghjghj'],['ghgh','hvdv']]
  newdata = []
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
    private excelService : ExcelService,
  ) {}

  ngOnInit() {
    const timestamp=1587143959831;
    console.log(new Date(timestamp).toLocaleDateString("en-us"));
    this.store.select(fromTraining.getFinishedExercises).subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
       // console.log(this.dataSource.data);
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filteredValue: string) {
    this.dataSource.filter = filteredValue.trim().toLowerCase();

  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.dataSource.data, 'training_data');
    const fire_date= this.dataSource.data[0].date.toLocaleDateString;
    console.log(fire_date)
  }

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My Past Exercises', 11, 8);
    doc.setFontSize(20);
    doc.setTextColor('black');

    const len = (this.dataSource.data).length;

    for (let i =0 ; i<len ; i++){
      this.newdata.push ([
        this.dataSource.data[i]['date'],
        this.dataSource.data[i]['name'],
        this.dataSource.data[i]['duration'],
        this.dataSource.data[i]['calories'],
        this.dataSource.data[i]['state']
    ]);
    }

    (doc as any).autoTable({
      head: this.head,
      body: this.newdata ,
      theme:"plain"
    })
    doc.output('dataurlnewwindow');  // to Open PDF document in new tab
    doc.save('my_exercises.pdf'); //Download PDF document
    console.log(this.newdata);
  }
}


