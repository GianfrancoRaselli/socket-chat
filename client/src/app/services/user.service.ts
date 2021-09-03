import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { map } from 'rxjs/operators';

const GETUSERSWITHCONVERSATION = gql`
  {
    getUsersWithConversation {
      _id
      username
    }
  }
`;

const SEARCHUSERS = gql`
  query searchUsers($username: String!) {
    searchUsers(username: $username) {
      _id
      username
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  getUsersWithConversation(): any {
    return this.apollo.watchQuery({
      query: GETUSERSWITHCONVERSATION
    });
  }

  searchUsers(username: String): any {
    return this.apollo.watchQuery({
      query: SEARCHUSERS,
      variables: {
        username
      }
    }).valueChanges.pipe(
      map((res: any) => {
        return res.data.searchUsers;
      })
    );
  }

}
