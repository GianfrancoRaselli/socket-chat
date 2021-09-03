import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { environment } from 'src/environments/environment';

import { Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthService } from "./services/auth.service";

import { AuthGuard, SignGuard } from "./auth.guard";
import { TokenInterceptorService } from './services/token-interceptor.service';
import { IndexComponent } from './components/index/index.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { UsersComponent } from './components/chat/users/users.component';
import { ConversationComponent } from './components/chat/conversation/conversation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    IndexComponent,
    ProfileComponent,
    ChatComponent,
    UsersComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpLinkModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SignGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: environment.API_URL }) as any,
      cache: new InMemoryCache() as any,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          pollInterval: 30000,
        },
      }
    })
  }
}
