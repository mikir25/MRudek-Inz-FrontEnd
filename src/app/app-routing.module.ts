import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayPostComponent } from './Displays/display-post/display-post.component';
import { RouterModule, Routes } from '@angular/router';
import { DisplayEventComponent } from './Displays/display-event/display-event.component';
import { DisplayForumComponent } from './Displays/display-forum/display-forum.component';
import { DisplayGadgetComponent } from './Displays/display-gadget/display-gadget.component';
import { DisplayTutorialComponent } from './Displays/display-tutorial/display-tutorial.component';
import { FormPostComponent } from './Forms/form-post/form-post.component';
import { LoggingComponent } from './Forms/logging/logging.component';
import { RegistrationComponent } from './Forms/registration/registration.component';
import { EditUserComponent } from './Forms/edit-user/edit-user.component';
import { DisplayGroupComponent } from './Displays/display-group/display-group.component';
import { DisplayGroupConversationComponent } from './Displays/display-group-conversation/display-group-conversation.component';
import { DisplayFriendsComponent } from './Displays/display-friends/display-friends.component';
import { DisplayMassagesComponent } from './Displays/display-massages/display-massages.component';
import { FormEventComponent } from './Forms/form-event/form-event.component';
import { FormForumComponent } from './Forms/form-forum/form-forum.component';
import { FormGadgetComponent } from './Forms/form-gadget/form-gadget.component';
import { FormTutorialComponent } from './Forms/form-tutorial/form-tutorial.component';

const routes: Routes = [
  { path: '', component: DisplayPostComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'editUser', component: EditUserComponent }, 

  { path: 'post', component: DisplayPostComponent },
  { path: 'event', component: DisplayEventComponent },
  { path: 'forum', component: DisplayForumComponent },
  { path: 'gadget', component: DisplayGadgetComponent },
  { path: 'tutorial', component: DisplayTutorialComponent },

  { path: 'post/form', component: FormPostComponent },
  { path: 'post/form/:id', component: FormPostComponent },

  { path: 'event/form', component: FormEventComponent },
  { path: 'event/form/:id', component: FormEventComponent },

  { path: 'forum/form', component: FormForumComponent },
  { path: 'forum/form/:id', component: FormForumComponent },

  { path: 'gadget/form', component: FormGadgetComponent },
  { path: 'gadget/form/:id', component: FormGadgetComponent },

  { path: 'tutorial/form', component: FormTutorialComponent },
  { path: 'tutorial/form/:id', component: FormTutorialComponent },

  { path: 'group', component: DisplayGroupComponent },
  { path: 'group/:id', component: DisplayGroupConversationComponent },

  { path: 'friends', component: DisplayFriendsComponent },

  { path: 'massages', component: DisplayMassagesComponent },

  { path: '**', redirectTo: '/post' }
]; 

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
