import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public lastItems: Item[] = [{
    id: '10001',
    name: 'PC01',
    description: 'Dell precision PC',
    user: 'Ion',
    location: 'Brasov',
    inventoryNumber: '20190001',
    creationDate: new Date('2019-01-01'),
    modifiedAt: new Date('2020-02-02'),
    deletedAt: false,
    category:'Test4'
  },
  {
    id: '10002',
    name: 'PC01',
    description: 'Dell precision PC',
    user: 'Ion',
    location: 'Brasov',
    inventoryNumber: '20190001',
    creationDate: new Date('2019-01-01'),
    modifiedAt: new Date('2020-02-02'),
    deletedAt: false,
    category:'Test3'
  },
  {
    id: '10003',
    name: 'PC01',
    description: 'Dell precision PC',
    user: 'Ion',
    location: 'Brasov',
    inventoryNumber: '20190001',
    creationDate: new Date('2019-01-01'),
    modifiedAt: new Date('2020-02-02'),
    deletedAt: false,
    category:'Test1'
  },
  {
    id: '10004',
    name: 'PC01',
    description: 'Dell precision PC',
    user: 'Ion',
    location: 'Brasov',
    inventoryNumber: '20190001',
    creationDate: new Date('2019-01-01'),
    modifiedAt: new Date('2020-02-02'),
    deletedAt: false,
    category:'Test2'
  }];

  constructor() {
  }

  ngOnInit(): void {
  }

}
