import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful'
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private client = createClient({
    space: environment.spaceId,
    accessToken: environment.accessToken
  })


  constructor() { }

  getAllEntries() {
    const thePromise = this.client.getEntries()

    return from(thePromise);
  }
  getEntryById(id: string) {
    const thePromise = this.client.getEntry(id);
    
    return from(thePromise)
  }


}
