import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';

// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChatbotWidgetComponent } from './chatbot-widget/chatbot-widget.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ChatbotWidgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DialogModule,
    CardModule,
    CarouselModule,
    AnimateOnScrollModule,
    SidebarModule,
    CheckboxModule,
    InputTextareaModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ChatbotWidgetComponent,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DialogModule,
    CardModule,
    CarouselModule,
    AnimateOnScrollModule,
    SidebarModule,
    CheckboxModule,
    InputTextareaModule
  ]
})
export class SharedModule { }
