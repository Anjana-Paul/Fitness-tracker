import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'; //for adding animations
import { StoreModule } from '@ngrx/store';
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from './training.reducer';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { ExcelService } from './excel.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
    FormsModule
  ],
  entryComponents: [StopTrainingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ExcelService]
})
export class TrainingModule {
  constructor () {};
}
