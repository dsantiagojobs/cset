import { Component, OnInit} from '@angular/core';
import { ReportAnalysisService } from '../../services/report-analysis.service';
import { ReportService } from '../../services/report.service';
import { ConfigService } from '../../services/config.service';
import { Title, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MaturityService } from '../../services/maturity.service';

@Component({
  selector: 'app-cis-commentsmarked',
  templateUrl: './cis-commentsmarked.component.html',
  styleUrls: ['../reports.scss', '../acet-reports.scss']
})
export class CisCommentsmarkedComponent implements OnInit {
  response: any = null;
  loading: boolean = false;

  constructor(
  public analysisSvc: ReportAnalysisService,
  public reportSvc: ReportService,
  public configSvc: ConfigService,
  private titleService: Title,
  public maturitySvc: MaturityService,
  private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.titleService.setTitle("Comments Report - CIS");

    this.maturitySvc.getCommentsMarked().subscribe(
      (r: any) => {
        this.response = r;
        this.loading = false;
      },
      error => console.log('Comments Marked Report Error: ' + (<Error>error).message)
    );
  }
}
