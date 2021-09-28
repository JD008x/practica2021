import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.contactFormGroup = Object();
  }

  ngOnInit(): void { 
    
    this.contactFormGroup = this.fb.group({
    name: [ null, Validators.required],
    email: [null, Validators.maxLength(100)],
    message: [ null, Validators.required]

   })
  }
   

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onSubmit()
  {
    
  }
}
