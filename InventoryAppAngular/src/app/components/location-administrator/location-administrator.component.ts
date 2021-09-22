import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/commonService';
import { LocationServices } from 'src/app/services/locationServices';
import { Location } from 'src/app/models/location';
import { LocationDialog } from './location-dialog';

@Component({
  selector: 'app-location-administrator',
  templateUrl: './location-administrator.component.html',
  styleUrls: ['./location-administrator.component.scss']
})
export class LocationAdministratorComponent implements OnInit {


  editLocation!: Location;
  location: Location[] = this.locationService.locationList;
  dataSources: MatTableDataSource<Location> = new MatTableDataSource<Location>(this.location);
  parent!: Location;

  constructor(private locationService: LocationServices, private dialog: MatDialog, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  locationColumns: string[] = [
    'name',
    'address',
    'telNumber',
    'actions'
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

  edit(location: Location) {
    if (location.address && location.name && location.telNumber) {
      this.locationService.editLocation(location).subscribe();
      this.updateTable();
      this.commonService.showSnackBarMessage("edit complete");
    }
    else {
      this.commonService.showSnackBarMessage("edit fail");
    }
  }

  add() {
    const dialogRef = this.dialog.open(LocationDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCategoryList();
      this.updateTable();
    });
  }

  delete(id: number, index: number): void {
    this.locationService.deleteLocation(id).subscribe(
      () => {
        this.commonService.showSnackBarMessage("category deleted");
        this.dataSources.data.slice(index, 1);
        this.getCategoryList();
        this.updateTable();
      }, (err) => {
        this.commonService.showSnackBarMessage("delete fail");
      }
    );

  }
}
