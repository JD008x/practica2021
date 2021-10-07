import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocationServices } from 'src/app/services/locationServices';
import { Location } from 'src/app/models/location';
import { EmailService } from 'src/app/services/httpService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactFormGroup: FormGroup;
  location: Location[] = this.locationService.locationList;
  dataSources: MatTableDataSource<Location> = new MatTableDataSource<Location>(this.location);
  parent!: Location;
  loading = false;
  buttonText = "Submit";

  constructor(private fb: FormBuilder,
    private locationService: LocationServices,
    private emailService: EmailService,
    private router: Router
  ) {
    this.contactFormGroup = Object();
  }

  ngOnInit(): void { 
    this.getCategoryList();

    this.contactFormGroup = this.fb.group({
      emailTo: [null, [Validators.email, Validators.required]],
      message: [ null, Validators.required]
   })
  }

  locationColumns: string[] = [
    'name',
    'address',
    'telNumber'
  ];

  getCategoryList(): void {
    this.locationService.getLocations().subscribe((list: Location[]) => {
      this.location = list;
      this.updateTable();
    }, (err) => {
      if (err.status === 401) return;
    });
  }

  updateTable(): void {
    this.dataSources = new MatTableDataSource<Location>(this.location);
  }

  hasError(controlName: string, errorName: string) {
    return this.contactFormGroup.controls[controlName].hasError(errorName);
  }

  
  onSubmit(formDirective: FormGroupDirective) {
    this.loading = true;

    let user = {
      emailTo: this.contactFormGroup.value.emailTo,
      message: this.contactFormGroup.value.message
    }

    this.emailService.sendEmail(user);
    formDirective.resetForm();
    this.contactFormGroup.reset();
  
  }
}