import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-gestion-home-vivo',
  templateUrl: './gestion-home-vivo.component.html',
  styleUrls: ['./gestion-home-vivo.component.scss']
})
export class GestionHomeVivoComponent implements OnInit {

  // @ts-ignore
  @ViewChild('video')
  public video: ElementRef;

  // @ts-ignore
  @ViewChild('canvas')
  public canvas: ElementRef;

  public captures: Array<any>;

  constructor() {
    this.captures = [];
  }

  ngOnInit() {
  }
  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }
  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }
}
