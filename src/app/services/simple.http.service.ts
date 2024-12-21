import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { DataInterface } from "../interface/data.model";

@Injectable()
export class SimpleHttpService {

    private url: string = "https://jsonplaceholder.typicode.com/";
    http_client: HttpClient;

    constructor(httpclient: HttpClient) {
        this.http_client = httpclient;
    }

    getAllDataService() {
        let httpParams = new HttpParams();
        httpParams.set('userId', 1);
        let headercustom: HttpHeaders = new HttpHeaders();
        headercustom = headercustom.set('custom-header', 'test');
        let httpOptions = {
            //headers: headercustom
            params: httpParams
        }

        return this.http_client.get(this.url + "posts")
            .pipe(
                map((respons: any) => {
                    let dataArray: DataInterface[] = [];
                    let responseArray = respons;
                    for (let key in responseArray) {
                        //    console.log(responseArray[key]); 
                        dataArray.push(responseArray[key]);
                    }
                    return dataArray;
                }),
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse) {
        //console.log(error)
        // client side error
        if (error.status === 0) {
            console.log('An error occurred:', error.message);
        } else {
            console.log(
                `Backend returned code ${error.status}, body was: `, error.message
            );
        }
        return [];
    }


    getSingleDataService() 
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('userId', 1);
        httpParams = httpParams.set('id', 2);
        console.log(httpParams.keys())
        let headercustom: HttpHeaders = new HttpHeaders();
        headercustom = headercustom.set('custom-header', 'test');
        let httpOptions = {
            //headers: headercustom
            params: httpParams
        }
        return this.http_client.get(this.url + "posts", httpOptions)
        /*.pipe(
                map((respons: any) => {
                    let dataArray: DataInterface[] = [];
                    let responseArray = respons;
                    for (let key in responseArray) {
                        //    console.log(responseArray[key]); 
                        dataArray.push(responseArray[key]);
                    }
                    return dataArray;
                })
        )*/
    }

    putDataService(dataInterface:DataInterface) // To ADD or UPDATE
    {
        let httpBodyParam : any = {
            userID:dataInterface.userId,
            id: dataInterface.id,
            name: dataInterface.title,
            body:dataInterface.body
        }
        return this.http_client.put(this.url + "posts/1",httpBodyParam)
    }

    postDataService(dataInterface:DataInterface) // Insert
    {
        let httpBodyParam : any = {
            userID:dataInterface.userId,
            id: dataInterface.id,
            name: dataInterface.title,
            body:dataInterface.body
        }
    return this.http_client.post(this.url + "posts/",httpBodyParam);
    }

    patchDataService(dataInterface:DataInterface) // Replace
    {
        let httpBodyParam : any = {
            userID:dataInterface.userId,
            id: dataInterface.id,
            name: dataInterface.title,
            body:dataInterface.body
        }
    return this.http_client.patch(this.url + "posts/2",httpBodyParam);  
    }

    deleteDataService()
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('userId', 2);
        httpParams = httpParams.set('id', 2);
        console.log(httpParams.keys())
        let headercustom: HttpHeaders = new HttpHeaders();
        headercustom = headercustom.set('custom-header', 'test');
        let httpOptions = {
            //headers: headercustom
            params: httpParams
        }
        return this.http_client.delete(this.url + "posts/2", httpOptions);
    }

}