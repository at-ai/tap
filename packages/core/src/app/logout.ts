import { disconnect } from "@uxland/uxl-prism";
import firebase from "firebase/app";

export const logout = async () => {
  try {
    await firebase.auth().signOut();
    disconnect();
  } catch (error) {
    console.log(error);
  }
};
