
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { LocationServices } from "src/app/services/locationServices";
import { Location } from "src/app/models/location";

@Component({
  selector: 'categoryDialog',
  templateUrl: 'location-dialog.html',
  styleUrls: ['../category-administrator/category-dialog.css'],
})

export class LocationDialog implements OnInit {

  addLocationFormGroup!: FormGroup;
  location: Location;


  constructor(private formBilder: FormBuilder,
    private locationService: LocationServices,
    private dialogRef: MatDialogRef<LocationDialog>,
  ) {

    this.location = Object();
  }
  ngOnInit(): void {

    this.addLocationFormGroup = this.formBilder.group({
      name: [this.location.name, Validators.required],
      address: [this.location.address, Validators.required],
      telNumber: [this.location.telNumber, Validators.required],
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitMe() {
    // this.location = new Location(this.addCategoryFormGroup.value);
    this.locationService.addLocation(this.addLocationFormGroup.value).subscribe();
    this.dialogRef.close();
  }
  public closeMe() {
    this.dialogRef.close();
  }
}
