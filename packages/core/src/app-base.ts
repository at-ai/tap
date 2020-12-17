import { PrismAppBase } from "@uxland/uxl-prism";
import { locales } from "./locales";
import { TPBootstrapper } from "./bootstrapper";
import { TPUserInfo } from "./domain";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRyrG30il-ex3UPAwNxtRJ476CrfL_XJI",
  authDomain: "teacher-assistant-portal.firebaseapp.com",
  projectId: "teacher-assistant-portal",
  storageBucket: "teacher-assistant-portal.appspot.com",
  messagingSenderId: "139916123020",
  appId: "1:139916123020:web:d1163deb6897f70b7e14a9",
  measurementId: "G-HPKD269EDX",
};

export class TPAppBase extends PrismAppBase {
  constructor() {
    super();
    this.options = {
      ...this.options,
      language: "ca",
      locales: locales,
      fetchUser: () => this.doFetchUser() as any,
    };
  }

  private provider;

  protected initApp(): Promise<any> {
    firebase.initializeApp(firebaseConfig);
    this.provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    return new TPBootstrapper(this.options).run();
  }

  private async doFetchUser(): Promise<TPUserInfo> {
    try {
      const result = await firebase.auth().signInWithPopup(this.provider);
      return Promise.resolve({
        ...result.additionalUserInfo,
        token: (result.credential as any).accessToken,
        modules: [
          {
            folder: "calculator",
            moduleId: "calculator",
            type: "local",
          },
        ],
      });
    } catch (error) {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    }
  }
}
