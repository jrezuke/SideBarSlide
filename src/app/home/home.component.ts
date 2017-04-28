import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { SideBarVisibilityService } from "app/services/side-bar-visibility.service";

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
export class HomeComponent implements OnInit {
  state = "show"
  constructor(private _sbvService: SideBarVisibilityService) { }

  ngOnInit() {
    this._sbvService.state$.subscribe((state) => {      
        this.state = state;  
        console.log('HomeSideBarComponent.ngOnInit state', this.state);    
    });
  }

  onSideBarToggle(){
    if(this.state === "show"){
      this._sbvService.setState('hide');
    }
    else{
      this._sbvService.setState('show');
    }
  }
}
