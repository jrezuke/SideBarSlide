import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { SideBarVisibilityService } from "app/services/side-bar-visibility.service";
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
  animations:[
    trigger('sideBarVisibility', [
            state('show', style({ opacity: '1', width: '*', display:'block' })),
            state('hide', style({ opacity: '0', width: '0px', display:'none' })),
            transition('show <=> hide', [animate(250)])
        ])
  ]
})

export class HomeComponent implements OnInit, AfterViewInit {
  state = "show";
  width = 300;
  //origWidth = 0;
  //sbLeft = this.width - 8;
  buttonText = "<";
  @ViewChild('sb') sb: ElementRef;
  @ViewChild('sbc') sbc: ElementRef;
  @ViewChild('input') input: ElementRef;

  constructor(private _sbvService: SideBarVisibilityService,
    private _cd: ChangeDetectorRef) { }

  ngOnInit() {
    this._sbvService.state$.subscribe((state) => {      
        this.state = state;  
        console.log('HomeSideBarComponent.ngOnInit state', this.state);
                     
    });

  }

  ngAfterViewInit(){
    let that = this;
    //this.origWidth = this.width
    jQuery(this.sb.nativeElement).draggable({
      axis: "x",
      containment: "parent",
      drag: function(event, ui){
        //console.log("dragging: ", event, ui);
        //console.log("sb right: ", this.style.left);
        //console.log(that.sbc.nativeElement);
        //console.log("ui.position.left", ui.position.left);
        //that.width = that.origWidth + ui.position.left;
        //this._cd.markForCheck();
      }
    });
    jQuery(this.input.nativeElement).datepicker();
  }

  onDrag(event){
    //event.preventDefault();
    console.log("onDragStart:", event);

  }

  onDrop(event){
    event.preventDefault();
    console.log("onDrop:", event);
  }

  allowDrop(event){
    event.preventDefault();
    console.log("allowDrop:", event);
    console.log("allowDrop:", event.dataTransfer);
  }

  onSideBarToggle(){
    if(this.state === "show"){
      this._sbvService.setState('hide');
      this.buttonText = ">"
    }
    else{
      this._sbvService.setState('show');
      this.buttonText = "<";
    }
  }
}
