import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-department-list',
  template: `
    <h3>Department List</h3>
    <ul class="items">
        <li 
        (click)="onSelect(department)" 
        *ngFor="let department of departments" 
        style="list-style-type:none; color:blue; text-decoration:underline "
        [class.selected]="isSelected(department)"
        >
          <span class="badge">{{department.id}}</span> {{department.name}}
        </li>
    </ul>
  `,
  styles: [
  ]
})
export class DepartmentListComponent implements OnInit {
  departments = [
    {"id":1, "name": 'Angular'},
    {"id":2, "name": 'Node'},
    {"id":3, "name": 'MongoDB'},
    {"id":4, "name": 'Ruby'},
    {"id":5, "name": 'Bootstrap'},
  ]
  public selectedId: number|undefined;


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id = parseInt(<string>params.get('id'));
      this.selectedId = id;
    })
  }

  onSelect(department:DepartmentDetails){
    // this.router.navigate(['/departments',department.id]);
    // so you don't have to go through the entire app and change the route string you can just use relativeTo and it
    // will use whatever the current route is 
    this.router.navigate([department.id],{relativeTo:this.route});

  }

  isSelected(department:DepartmentDetails){
    return department.id === this.selectedId
  }

}

interface DepartmentDetails{
  id: number,
  name: string
}