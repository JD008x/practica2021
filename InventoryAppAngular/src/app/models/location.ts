export class Location {
    id: string = '';
    name: string = '';
    address: string = '';
    telNumber: string = '';

    constructor(init?: Partial<Location>) {
        Object.assign(this, init);
      }
}


