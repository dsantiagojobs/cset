import { Component, OnInit } from '@angular/core';
import { ReportAnalysisService } from '../../services/report-analysis.service';
import { ReportService } from '../../services/report.service';
import { ConfigService } from '../../services/config.service';
import { Title } from '@angular/platform-browser';
import { MaturityService } from '../../services/maturity.service';

@Component({
  selector: 'app-commentsmfr',
  templateUrl: './commentsmfr.component.html',
  styleUrls: ['../reports.scss', '../acet-reports.scss']
})
export class CommentsMfrComponent implements OnInit {
  response: any = null;

  loading: boolean = false;

  questionAliasSingular: string;

  constructor(
    public analysisSvc: ReportAnalysisService,
    public reportSvc: ReportService,
    public configSvc: ConfigService,
    private titleService: Title,
    public maturitySvc: MaturityService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.titleService.setTitle("Comments and Marked For Review Report");

    this.maturitySvc.getCommentsMarked().subscribe(
      (r: any) => {
        this.response = r;

        // until we define a singular version in the maturity model database table, just remove (hopefully) the last 's'
        this.questionAliasSingular = this.response?.information.questionsAlias.slice(0, -1);
        this.loading = false;
      },
      error => console.log('Comments Marked Report Error: ' + (<Error>error).message)
    );
  }

  getQuestion(q) {
    return q;
    // return q.split(/(?<=^\S+)\s/)[1];
  }
}
