export class User {
    id: number = 0;
    userName: string = '';
    email: string = '';
    password: string = '';
    realName: string = '';
    creationDate : Date = new Date();

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
      }
}

