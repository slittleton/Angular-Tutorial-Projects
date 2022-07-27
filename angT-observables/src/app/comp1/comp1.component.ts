import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {

  enteredText: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onBtnClick(){
    this.dataService.raiseDataEmitterEvent(this.enteredText);
  }
}
