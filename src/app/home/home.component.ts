import { Component, Renderer, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  width = 200;
  origWidth = 0;
  sbLeft = this.width - 60;
  sbRight = 0;
  offset = 0;
  buttonText = "<";
  @ViewChild('sb') sb: ElementRef;
  @ViewChild('sbc') sbc: ElementRef;
  @ViewChild('input') input: ElementRef;

  constructor(private _sbvService: SideBarVisibilityService,
    private _cd: ChangeDetectorRef, private elRef:ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this._sbvService.state$.subscribe((state) => {
        this.state = state;
        console.log('HomeSideBarComponent.ngOnInit state', this.state);

    });

  }

  onDrop(event, ui){
    console.log("drop ui.offset.left: ", ui.offset.left);
    //this.width = ui.offset.left;

  }

  ngAfterViewInit(){
    let that = this;
    this.origWidth = this.width;


    jQuery(this.elRef.nativeElement).droppable(
    {
      drop: function(event, ui){
        console.log("drop: ", event, ui);
        that.width = ui.offset.left + 8;
        that._cd.detectChanges();
      }
    }
    //   {
    //   drop: function( event, ui ) {
    //     console.log("drop: ", event, ui);
    //     that.offset = ui.position.left + 60;
    //     if(that.offset > 60){
    //       that.width = that.offset;
    //     }
    //     // else{

    //     //   that.width = 30;
    //     //   that.sbLeft = 22;
    //     // }
    //   }
    // }
    );
    //jQuery(this.elRef.nativeElement).on("drop", this.onDrop);
    jQuery(this.sb.nativeElement).draggable({
      axis: "x",

      containment: [60,51,300,251],
      drag: function(event, ui){
        console.log("dragging ui.offset.left: ", ui.offset.left);
        console.log("dragging event.clientX: ", event.clientX);
        console.log("dragging ui.position.left: ", ui.position.left);
        if(ui.offset.left < 61){
          //ui.position.left = 51;
          //that.onDrop(event, ui);
        }

        //console.log("sb right: ", this.style.left);
        //console.log(that.sbc.nativeElement);
        //console.log("ui.position.left", ui.position.left);
        //that.width = event.clientX;
        //that.offsetLeft = ui.offset.left;
        //this._cd.markForCheck();
      }
    });
    jQuery(this.input.nativeElement).datepicker();
  }

  onSideBarToggle(){
    if(this.state === "show"){
      this._sbvService.setState('hide');
      this.buttonText = ">"
      this.renderer.setElementStyle(this.sb.nativeElement, "left", "140px");
    }
    else{
      this._sbvService.setState('show');
      this.buttonText = "<";
    }
  }
}
