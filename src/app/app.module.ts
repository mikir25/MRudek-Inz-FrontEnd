import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { DisplayEventComponent } from './Displays/display-event/display-event.component';
import { DisplayForumComponent } from './Displays/display-forum/display-forum.component';
import { DisplayGadgetComponent } from './Displays/display-gadget/display-gadget.component';
import { DisplayPostComponent } from './Displays/display-post/display-post.component';
import { DisplayTutorialComponent } from './Displays/display-tutorial/display-tutorial.component';
import { LoggingComponent } from './Forms/logging/logging.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormPostComponent } from './Forms/form-post/form-post.component';
import { RegistrationComponent } from './Forms/registration/registration.component';
import { EditUserComponent } from './Forms/edit-user/edit-user.component';
import { DisplayGroupComponent } from './Displays/display-group/display-group.component';
import { DisplayGroupConversationComponent } from './Displays/display-group-conversation/display-group-conversation.component';
import { DisplayFriendsComponent } from './Displays/display-friends/display-friends.component';
import { DisplayMassagesComponent } from './Displays/display-massages/display-massages.component';
import { FormTutorialComponent } from './Forms/form-tutorial/form-tutorial.component';
import { FormEventComponent } from './Forms/form-event/form-event.component';
import { FormForumComponent } from './Forms/form-forum/form-forum.component';
import { FormGadgetComponent } from './Forms/form-gadget/form-gadget.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayEventComponent,
    DisplayForumComponent,
    DisplayGadgetComponent,
    DisplayPostComponent,
    DisplayTutorialComponent,
    LoggingComponent,
    FormPostComponent,
    RegistrationComponent,
    EditUserComponent,
    DisplayGroupComponent,
    DisplayGroupConversationComponent,
    DisplayFriendsComponent,
    DisplayMassagesComponent,
    FormTutorialComponent,
    FormEventComponent,
    FormForumComponent,
    FormGadgetComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    NgbModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
