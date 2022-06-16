import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AssessmentService } from './assessment.service';
import { MaturityDomainRemarks, QuestionGrouping } from '../models/questions.model';
import {
  AssessmentContactsResponse,
  AssessmentDetail,
  MaturityModel,
  Demographic
} from '../models/assessment-info.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as internal from 'stream';
const headers = {
  headers: new HttpHeaders().set("Content-Type", "application/json"),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class TsaAnalyticsService {
  public assessment: AssessmentDetail;
  public selectedStandards: string[] = [];
  constructor(
    private http: HttpClient,
    private configSvc: ConfigService,
    private assessSvc: AssessmentService,
    private router: Router
  ) { }

  TSAanalyticsAssessment(assessId: number){
     this.http.get(
      this.configSvc.apiUrl+"tsa/getAssessmentById",
      headers,
    )
    this.router.navigate(["/tsa-analytics"], { queryParamsHandling: 'preserve' });
  }
  loadAssessment(id: number) {
    this.getAssessmentToken(id).then(() => {

      this.getAssessmentDetail().subscribe(data => {
        this.assessment = data;
        // const rpath = localStorage.getItem('returnPath');
        this.router.navigate(['/tsa-analytics']);
       });
    });
  }
  getAssessmentToken(assessId: number) {
    return this.http
      .get(this.configSvc.apiUrl + 'auth/token?assessmentId=' + assessId)
      .toPromise()
      .then((response: { token: string }) => {
        localStorage.removeItem('userToken');
        localStorage.setItem('userToken', response.token);
        if (assessId) {
          localStorage.removeItem('assessmentId');
          localStorage.setItem(
            'assessmentId',
            assessId ? assessId.toString() : ''
          );
        }
      });
  }
  getAssessmentDetail() {
    return this.http.get(this.configSvc.apiUrl + 'assessmentdetail', headers);
  }
  getDashboard(industry: string) {
    return this.http.get(
      this.configSvc.apiUrl +
        "TSA/Dashboard?industry=" +
        industry
    ,headers);
  }

  getAssessmentsForUser(arg0: string): Observable<AssessmentsApi> {
    return this.http.get<AssessmentsApi>(
      this.configSvc.apiUrl + "Dashboard/GetAssessmentList?id=" + arg0
    ,headers);
  }

  getSectors() {
    return this.http.get(this.configSvc.apiUrl + "TSA/getSectors");
  }
  getStandardList(){
    return this.http.get<any[]>(this.configSvc.apiUrl + 'TSA/getStandardList');
  }
  getSectorIndustryStandardsTSA(sectorId?: number, industryId?:number): any {
    var url=this.http.get(this.configSvc.apiUrl + 'TSA/getSectorIndustryStandardsTSA');
    if(sectorId && industryId)
    {
      url=this.http.get(this.configSvc.apiUrl + 'TSA/getSectorIndustryStandardsTSA?sectorId='+sectorId+'&industryId='+industryId);
    }else if(!sectorId){
      url=this.http.get(this.configSvc.apiUrl + 'TSA/getSectorIndustryStandardsTSA');
    }
     else if(!industryId && sectorId || sectorId && industryId.toString()=="0: null" ){
      url=this.http.get(this.configSvc.apiUrl + 'TSA/getSectorIndustryStandardsTSA?sectorId='+sectorId);
    }

    return url;
  }
  MaturityDashboardByCategory(selectedMaturityModelId: number, sectorId?:number, industryId?:number): any {
  var url
  if(! sectorId){
    url=this.http.get(this.configSvc.apiUrl + 'TSA/analyticsMaturityDashboard?maturity_model_id='+selectedMaturityModelId);
  }
else if(sectorId && !industryId){
  url= url=this.http.get(this.configSvc.apiUrl + 'TSA/analyticsMaturityDashboard?maturity_model_id='+selectedMaturityModelId+'&sectorId='+sectorId);
}else if(sectorId && industryId){
  url= url=this.http.get(this.configSvc.apiUrl + 'TSA/analyticsMaturityDashboard?maturity_model_id='+selectedMaturityModelId+'&sectorId='+sectorId+'&industryId='+industryId);
}
    return url;
  }

}

export interface AssessmentsApi {
  items: any[];
  total_count: number;
}
