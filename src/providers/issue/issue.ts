import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

/*
  Generated class for the IssueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssueProvider {

  constructor(public http: HttpClient) { }

  getAllIssueActiveSprint(){
    return this.http.get(URL_BASE + "/issue/active-sprints");
  }

  getAllIssueBacklog(){
    return this.http.get(URL_BASE + "/issue/backlog")
  }

  getIssueById(id:number){
    return this.http.get(URL_BASE + "/issue/" + id);
  }

  createNewIssue(issue:any){
    return this.http.post(URL_BASE+"/issue/", issue);
  }

  updateIssue(issue:any , id:number){
    return this.http.put(URL_BASE+"/issue/" + id, issue);
  }

  addIssueInActiveSprint(id:number){
    // @ts-ignore
    return this.http.post(URL_BASE + "/issue/sprint/" + id);
  }

}
