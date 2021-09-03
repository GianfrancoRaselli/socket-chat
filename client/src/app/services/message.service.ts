import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../models/User';

const GETMESSAGESBETWEENUSERS = gql`
  query getMessagesBetweenUsers($userWithId: String!) {
    getMessagesBetweenUsers(userWithId: $userWithId) {
      userFromId
      userToId
      message
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private apollo: Apollo) { }

  getMessagesBetweenUsers(userConversation: User): any {
    return this.apollo.watchQuery({
      query: GETMESSAGESBETWEENUSERS,
      variables: {
        userWithId: userConversation._id
      }
    });
  }

}
