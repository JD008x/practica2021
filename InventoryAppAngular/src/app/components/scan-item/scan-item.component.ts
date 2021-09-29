import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from "@zxing/library";
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-item',
  templateUrl: './scan-item.component.html',
  styleUrls: ['./scan-item.component.scss']
})
export class ScanItemComponent implements OnInit {
  scannerFormat = [BarcodeFormat.QR_CODE, BarcodeFormat.CODABAR, BarcodeFormat.MAXICODE];
  availableDevice!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo;
  hasDevice!: boolean;
  hasPermission!: boolean;
  torchEnable = false;
  tryHandler = false;
  allowEmptyString = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //camera found result
  onCameraFound(devices: MediaDeviceInfo[]): void {
    this.availableDevice = devices;
    this.hasDevice = Boolean(devices && devices.length);
  }

  //QR code event
  onCodeResult(resultString: string) {
    console.log(resultString);
    this.router.navigate(['/view-item/' + resultString])
  }

  //Permission check
  onHasPermission(hasPermission: boolean) {
    this.hasPermission = hasPermission;
  }

  public scanSuccessHandler($event: any) {
    console.log($event);
    //this.router.navigate(['/view-item/' + result])
  }
}
