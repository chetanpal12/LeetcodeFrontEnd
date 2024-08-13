import { Component,OnInit } from '@angular/core';
import { BaseServiceService } from './services/base-service.service';
import { environments } from './enviroments/enviroments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'leetcode-project';
  language = 'javascript';
  selectedTheme = 'vs-dark';
  editorOptions = { theme: this.selectedTheme, language: this.language };
  code: string = '';
  userId:string='1';
  problemId:string='66afc6bb9cf2fb88448b53d5';

  constructor(private Service:BaseServiceService){
    console.log(environments.apiURL);
  }

  ngOnInit(): void {
    this.Service.getData('/api/v1/problems').subscribe((res:any)=>{
      console.log(res);
    })
  }
  

  languages = [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'Python', value: 'python' },
    { name: 'Java', value: 'java' },
    { name: 'C++', value: 'cpp' }
  ];

  themes = [
    { name: 'VS Dark', value: 'vs-dark' },
    { name: 'VS Light', value: 'vs-light' },
    { name: 'HC Black', value: 'hc-black' },
    {name:'HC Light',value:'hc-light'},
    {name:'vs',value:'vs'}
  ];

  onLanguageChange() {
    this.editorOptions = {
      ...this.editorOptions,
      language: this.language
    };
  }

  onThemeChange() {
    this.editorOptions = {
      ...this.editorOptions,
      theme: this.selectedTheme
    };
  }

  onGetCode() {
    const payload={
      code:this.code,
      language:this.language,
      userId:this.userId,
      problemId:this.problemId

    }
    console.log("code is -->>",this.code);
    console.log("paylaod",payload);
    this.Service.postData('/api/v1/submissions',payload).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
