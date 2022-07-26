import { FormGroup } from '@angular/forms';


export interface MssvStepper {

  activeStep: number;
  formGroup: FormGroup;

}


export interface MssvStepperSteps {

  step: number;
  title: string;
  description: string;
  formGroup: FormGroup;
  isActive: boolean;

}
