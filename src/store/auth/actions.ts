import { ActionTree } from "vuex";
import { IauthState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/auth";

export const actions: ActionTree<IauthState, RootState> = {
    signUp({}, payload): void {
        firebase.auth().createUserWithEmailAndPassword(payload.id, payload.password)
      .then(user => {
          console.log(user);
      })
      .catch(error => {
        alert(error.message);
      });
    },
    signIn({}, payload){
      firebase.auth.signInWithEmailAndPassword(
        payload.id,
        payload.password
      )
      .then()
      .catch()
      }
};