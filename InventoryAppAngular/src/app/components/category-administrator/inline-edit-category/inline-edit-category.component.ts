import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { filter } from 'rxjs/operators';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'app-inline-edit-category',
  templateUrl: './inline-edit-category.component.html',
  styleUrls: ['./inline-edit-category.component.scss']
})
export class InlineEditCategoryComponent implements OnInit {
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.comment = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  comment = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.comment = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.comment);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}
