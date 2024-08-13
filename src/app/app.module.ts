import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  
    MonacoEditorModule.forRoot()
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
