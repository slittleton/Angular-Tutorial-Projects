import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-department-detail',
  template: `
    <h3>You Selected Department with id = {{departmentId}}</h3>


    <div>Child routes - only show up inside a specific component ex : /department/2/overview</div>
    <p>
      <button (click)="showOverview()">Overview</button>
      <button (click)="showContact()">Contact</button>
    </p>

    <router-outlet></router-outlet>

    <button (click)="goPrevious()" style="border:2px solid gray; border-radius:1rem; padding:.3rem" >Previous</button> | 
    <button (click)="goNext()"style="border:2px solid gray; border-radius:1rem; padding:.3rem">Next</button>
    <br>
    <div style="margin: 1rem;">
      <button (click)="goToDepartment()">Back</button>
    </div>
  `,
  styles: [
  ]
})
export class DepartmentDetailComponent implements OnInit {
  public departmentId: number | undefined;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // let id:number = parseInt(<string>this.route.snapshot.paramMap.get('id'))
    // this.departmentId = id;

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(<string>params.get('id'));
      this.departmentId = id;
    })
  }
  goPrevious() {
    let previousId: number = <number>this.departmentId - 1;
    this.router.navigate(['/departments', previousId])


  }

  goNext() {
    let nextId = <number>this.departmentId + 1;

    this.router.navigate(['/departments', nextId])

  }

  goToDepartment() {
    let selectedId = this.departmentId ? this.departmentId : null;
    // this.router.navigate(['/departments', {id: selectedId}])
    // use '../' to go back one segment in the url
    this.router.navigate(['../', { id: selectedId }], { relativeTo: this.route });
  }

  showContact() {
    this.router.navigate(['contact'], { relativeTo: this.route })
  }
  showOverview() {
    this.router.navigate(['overview'], { relativeTo: this.route })
  }
}
