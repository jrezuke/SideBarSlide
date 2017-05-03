import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('btnJq') btnJq: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('sn') sn:ElementRef;
  
  constructor() { }

  ngOnInit() {
    console.log("btnJq", jQuery(this.btnJq.nativeElement));
    console.log("#btnJq", jQuery("#btnJq"));
    jQuery("#btnJq").click(function(){alert("clicked")});
  }

  ngAfterViewInit() {
    jQuery(this.input.nativeElement).datepicker();
  }

  onToggle() {
        
    }
}
