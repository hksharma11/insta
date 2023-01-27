import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs:AngularFirestore) { }

  addJobs(jobs:any)
  {
    return this.afs.collection('/Jobs').doc('jobs').set(jobs)
  }

  getJobs()
  {
    return this.afs.collection('/Jobs').doc('jobs').get();
  }

  addLength(jobs:any)
  {
    return this.afs.collection('/Jobs').doc('last-length').set({"last-length":jobs.jobs.length})
  }

  getLength()
  {
    return this.afs.collection('/Jobs').doc('last-length').get();
  }
}
