import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  geoForm: FormGroup;
  @Output() formOutput = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log(this.geoForm.valid);
  }

  createForm() {
    this.geoForm = this.fb.group({
       name: ['', Validators.required],
       polygon: ['']
    });
  }

  onFormSubmit() {
    console.log(this.geoForm.value);
    this.formOutput.emit(this.geoForm.value);
  }

}
