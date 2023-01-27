import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('post') post!:ElementRef<HTMLImageElement>; 
  jobs:any
  
  constructor(private data:DataService,private api:ApiService){

  }
  ngOnInit(): void {
    this.getDataFromFirebase();
    this.updateDataFirebase();
  }
  

  getDataFromFirebase()
  {
    this.data.getJobs().subscribe(response=>{
      this.jobs=response.get('jobs');
      console.log(this.jobs)
    })
  }

  updateDataFirebase()
  {
    this.api.get("https://manisharora31.github.io/github.io/job.json").subscribe((response)=>{
      var jsonResult = JSON.parse(JSON.stringify(response));
      let new_length=jsonResult.jobs.length;
      let last_length;
      this.data.getLength().subscribe(response=>{
        last_length = response.get('last-length');
        
        if(new_length > last_length)
        {
          this.data.addJobs(jsonResult)
        }
      });
      
    })
  }


  // getData()
  // {
  //   this.api.get("https://manisharora31.github.io/github.io/job.json").subscribe((data)=>{
  //     var jsonResult = JSON.parse(JSON.stringify(data));
  //     console.log(jsonResult);
  //     this.data.addJobs(jsonResult)
  //   })
    
  // }

  trackByIndex = (index: number): number => {
		return index;
	};

  openLink(index:any)
  {
    let link = this.jobs[index].link;
    console.log(link);
    window.open(link,"_self")
  }


  create()
  {
    html2canvas(this.post.nativeElement,{
      scale:5
    }).then((canvas)=>{
      const base64imamge = canvas.toDataURL("image/png");
      console.log(base64imamge)
    })
  }
}
