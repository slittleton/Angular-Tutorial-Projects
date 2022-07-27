import { Component, OnInit } from '@angular/core';
import { from, Observable, of, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  title = 'angT-observables';


  // ------ Create an Observable ----------------------------------------------------------------
  // Promises wait for the entire requested data object before sending it 
  // Observers stream the data as it is available to the subscribers/observers
  myObservable1 = new Observable((observer) => {
    console.log('Observable Starts')
    setTimeout(() => { observer.next("1") }, 1000)
    setTimeout(() => { observer.next("2") }, 2000)
    setTimeout(() => { observer.next("3") }, 3000)

    // when an error is emited the observable will not emit any additional data
    // setTimeout(() => { observer.error(new Error('Something went wrong please try again later')) }, 3000)

    setTimeout(() => { observer.next("4") }, 4000)
    setTimeout(() => { observer.next("5") }, 5000)
    // no data will be emited after the complete method is called in the observable
    setTimeout(() => { observer.complete() }, 6000)
    setTimeout(() => { observer.next("this will not be emited because complete has already been called") }, 7000)
  });




  // ------ Alternate way to create an observable -----------------------------------------------
  myObservable2 = Observable.create(
    (observer: {
      complete(): unknown;
      error(arg0: Error):
        unknown; next: (arg0: string) => void;
    }) => {
      setTimeout(() => { observer.next("A") }, 1000)
      setTimeout(() => { observer.next("B") }, 2000)
      setTimeout(() => { observer.next("C") }, 3000)
      setTimeout(() => { observer.error(new Error('Something went wrong please try again later')) }, 3000)
      setTimeout(() => { observer.next("D") }, 4000)
      setTimeout(() => { observer.next("E") }, 5000)
      setTimeout(() => { observer.complete() }, 6000)
    });


  array1 = [1, 2, 6, 7, 8, 12, 3, 67, 98, 0.5, 0.2, 0.67, 34]
  array2 = ['A', 'B', 'C']
  // ------ Alternate way to create an observable using the "of()" method -----------------------
  // of emits all data passed to it as parameters - uses any number of parameters
  // emits Each Parameter as a chunk,
  // of() automatically emits complete at the end of the stream
  myObservable3 = of(this.array1, this.array2);

  // ------ Alternate way to create an observable using the "from()" method ---------------------
  // from takes one argument that is an iterable OR a PROMISE which is then converted to an observable
  // emits each value - one at a time - from the object passed
  myObservable4 = from(this.array1);


  // ---- OPERATORS in RxJS ---------------------------------------------------------------------
  // functions that take an obserable as input and transform it into a new obserable and returns it after modifying the data in it
  // operators in RxJS are used to manipulate the obserable data stream
  //https://www.youtube.com/watch?v=bkk54vMovk8&list=PL1BztTYDF-QNrtkvjkT6Wjc8es7QB4Gty&index=55
  myObservable = from(this.array1);

  //User .pipe() to add an operator such as map() (note: different map than the default js one - imported from rxjs)
  transformedObs = this.myObservable.pipe(map((val) => {
    return val * 5;
  }))

  filteredObs = this.transformedObs.pipe(filter((val) => {
    return val >= 30;
  }))

  // CHAINING RXJS Operators
  transformedObs1 = this.myObservable.pipe(
    map((val) => {
      return val * 5;
    }),
    filter((val) => {
      return val >= 30;
    })
  )

  // You can also chain RXJS Operators on the from() method
  myObservable5 = from(this.array1).pipe(map((val) => {
    return val * 5;
  }),
    filter((val) => {
      return val >= 30;
    }))


  // you can then subscribe to the filtered observable which is the modified version of the observable


  // ---- SUBJECT in RxJS ---------------------------------------------------------------------
  // A subject is a special type of observable that allows values to be multicasted to many Observers. Subjects are like EventEmitters
  // EX- two components that do NOT have a parent child relationship but you want one component to transmit a value to the other
  // note: depending upon the case it may be better to user service and event emitter

  // user event emitter and service (requires adding DataService as provider in @Component({}) at top of file)
  // then, because comp1 and comp2 are children of app.component, the service will be injected into both child components
  constructor(private dataService: DataService) {
  }

  // using subject
  // you need to create a subject in the service


  // ---- UNSUBSCRIBE from Observable in RxJS ---------------------------------------------------------------------
  // interval() emits data repeatedly at some time interval

  counterObservable = interval(1000)
  counterSub:any;

  ngOnInit() {
    // the subscribe method has three possible parameters "next, error, complete"
    // next will be called as many times as there is data to emit
    // next - takes a function that handles the incoming data
    // error - deals with what to do in case an error is emited from the observable
    // complete - some observables use the 'complete' method to state that he stream has finished
    // the complete parameter can be used to execute login upon completion of the stream

    //OLD WAY - deprecated
    // this.myObservable.subscribe(val => {
    //   console.log(val)
    // },
    //   (error) => {
    //     alert(error.message)
    //     console.log(error.message)
    //   },
    //   () => {
    //     alert('observable has completed emitting all values')
    //     console.log("Stream Complete")
    //   }
    // )

    // NEW WAY involves passing object with with anonymous functions
    this.myObservable.subscribe({
      next: (val) => console.log(val),
      error: (error) => alert(error.message),
      complete: () => alert('observable has completed emitting all values')
    }
    )

    // will cause data to be emitted at intervals indefinitely 
    this.counterSub = this.counterObservable.subscribe((val) => {
      console.log(val);
    })

    
  }
  // this method was assigned to a button in app.component.html file
  unsubscribe(){
    this.counterSub.unsubscribe();
  }

  // each time the subscribe button is clicked it will create another instance of the obserable
  subscribe(){
    this.counterSub = this.counterObservable.subscribe((val)=>{
      console.log(val)
    })
  }
}
