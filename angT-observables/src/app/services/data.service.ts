import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor() { }

  // Event emitter is one way to get value from one component to another OR you can use Subject() observable
  // dataEmitter = new EventEmitter<string>();
  dataEmitter = new Subject<string>();

  raiseDataEmitterEvent(data: string){
  //  this.dataEmitter.emit(data);
    this.dataEmitter.next(data);
  }
}
