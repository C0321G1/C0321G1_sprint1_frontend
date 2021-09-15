import {AbstractControl} from '@angular/forms';
// khue check validate date from and date to of fied search
export function DateBirthSearchValidator(control: AbstractControl): { [key: string]: boolean } | null {

  const fromDate = control.get('dateOfBirthFrom');
  const toDate = control.get('dateOfBirthTo');
  const fromWorkDate = control.get('startWorkDateFrom');
  const toWorkDate = control.get('startWorkDateTo');
  if (fromDate.value > toDate.value && fromWorkDate.value > toWorkDate.value && fromDate.value != ''
  && toDate.value != '' && fromWorkDate.value != '' && toWorkDate.value != '') {
    return {
      dateToSearch: true,
      dateWorkToSearch: true
    };
  }
  if (toDate.value != '' && fromDate.value != '' && fromDate.value > toDate.value) {
    return {
      dateToSearch: true
    };
  }
  if (fromWorkDate.value != '' && toWorkDate.value != '' && fromWorkDate.value > toWorkDate.value) {
    return {
      dateWorkToSearch: true
    };
  }
  return {};
}


export function DatePastValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const  date = control.value;
  const current = new Date();
  if (new Date(date) > current) {
    return {
      dateFuture: true
    };
  }
  return null;
}

export function CheckAgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const  birthDate = control.value;
  const current = new Date();
  if (current.getFullYear() - new Date(birthDate).getFullYear() < 18) {
    return {
      checkAge: true
    };
  }
  return null;
}
