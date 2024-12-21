import { Component } from '@angular/core';
import { SimpleHttpService } from './services/simple.http.service';
import { DataInterface } from './interface/data.model';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data_interface : DataInterface[] = [];
  
  constructor(private _http_service:SimpleHttpService){

  }

  getAllDataComponent()
  {
    this._http_service.getAllDataService().subscribe(
      (data:any)=>{
        this.data_interface = data ;
        console.log(this.data_interface);
      }
    );
  }

  getSingleDataComponent()
  {
    this._http_service.getSingleDataService().subscribe(
    (data:any)=>{
      this.data_interface = data ;
      console.log(this.data_interface);
    }
  );
  }

  putDataComponent()
  {
    let dataInterface : DataInterface = {
      userId:1,
      id: 2,
      title: 'abc',
      body: 'put test'
    };
      this._http_service.putDataService(dataInterface).subscribe();
  }

  postDataComponent(myform:NgForm) // create data
  {
    let dataInterface : DataInterface = {
      userId : myform.control.value.userid,
      id: myform.control.value.id,
      title: myform.control.value.title,
      body: myform.control.value.body
    };
    this._http_service.postDataService(dataInterface).subscribe();
  }

  patchDataComponent() 
  {
    let dataInterface : DataInterface = {
      userId:11,
      id: 101,
      title: 'xyz',
      body: 'patch test'
    };
      this._http_service.patchDataService(dataInterface).subscribe();
  }

  deleteDataComponent()
  {
    this._http_service.deleteDataService().subscribe();
  }
}
