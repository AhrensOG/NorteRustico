import { auth } from "@/app/firebase/config";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT;

export const isUserLogged = async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        const data = await axios.get(
          `${SERVER_URL_AUTH_ENDPOINT}?id=${user.uid}`
        );
        dispatch({ type: "LOGGED_IN_USER", payload: data.data });
        return true;
      } else {
        dispatch({ type: "LOGGED_IN_USER", payload: false });
        return false;
      }
    } catch (error) {
      return error;
    }
  });
};
