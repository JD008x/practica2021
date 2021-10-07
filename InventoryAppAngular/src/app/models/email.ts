
export class Email {
      emailTo: string = '';
      message: string = '';
     
    
      constructor(init?: Partial<Email>) {
        Object.assign(this, init);
      }
    }
    