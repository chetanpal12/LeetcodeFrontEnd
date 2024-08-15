import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseServiceService } from './services/base-service.service';
import { environments } from './enviroments/enviroments';
import { SocketIoService } from './services/socket-io.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'leetcode-project';
  language = 'javascript';
  selectedTheme = 'vs-dark';
  editorOptions = { theme: this.selectedTheme, language: this.language };
  code: string = '';
  userId:string='1';
  problemId:string='66afc6bb9cf2fb88448b53d5';
  socket:any;
  private subscription: Subscription = new Subscription();

   
  //  userId = "1";

  constructor(private Service:BaseServiceService,private socketService: SocketIoService){
    console.log(environments.apiURL);
    // this.initializeSocket();
  }

  ngOnInit(): void {
    this.Service.getData('/api/v1/problems').subscribe((res:any)=>{
      console.log(res);
    });

    this.subscription.add(
      this.socketService.listenToSubmissionResponse().subscribe(
        (data: any) => {
          console.log('Received data from WebSocket:', data);
          // Handle the received data as needed
        },
        (error) => {
          console.error('Error receiving data from WebSocket:', error);
        }
      )
    );
    console.log("scoket",this.subscription);
    
  }

  ngOnDestroy(): void {
    // Clean up subscriptions on component destroy
    this.subscription.unsubscribe();
    this.socketService.disconnect(); // Ensure the socket is disconnected
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

  // initializeSocket(): void {
  //   this.socket = io('http://localhost:3001');

  //   this.socket.on('connect', () => {
  //     console.log('Connected to WebSocket server');

  //     // Attach event listeners after connection
      
  //   });

  //   this.socket.on('submissionPayloadResponse', (data: any) => {
  //     console.log('Received data from WebSocket:', data);
  //     // Handle the received data as needed
  //   });

  //   this.socket.on('disconnect', () => {
  //     console.log('Disconnected from WebSocket server');
  //   });

  //   // Debugging: Check if the socket connection is successful
  //   this.socket.on('connect_error', (error: any) => {
  //     console.error('Connection Error:', error);
  //   });
  // }

 
}
