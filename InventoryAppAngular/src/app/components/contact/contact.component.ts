import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocationServices } from 'src/app/services/locationServices';
import { Location } from 'src/app/models/location';


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

  constructor(private fb: FormBuilder,private locationService: LocationServices) { 
    this.contactFormGroup = Object();
  }

  ngOnInit(): void { 
    this.getCategoryList();

    this.contactFormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
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

  onSubmit()
  {}
  // onSubmit()
  // {
  //   this.loading = true;
  //   this.buttonText = "Submiting...";

  //   let user = {
  //     email: this.contactFormGroup.value.email,
  //     message: this.contactFormGroup.value.message
  //   }
  //   this.http.sendEmail( user ).subscribe(
  //     data => {
  //       let res:any = data; 
  //       console.log(
  //         `👏 > 👏 > 👏 > 👏 ${user.email} is successfully register and mail has been sent and the message id is ${res.messageId}`
  //       );
  //     },
  //     err => {
  //       console.log(err);
  //       this.loading = false;
  //       this.buttonText = "Submit";
  //     },() => {
  //       this.loading = false;
  //       this.buttonText = "Submit";
  //     }
  //   );
  // }


}