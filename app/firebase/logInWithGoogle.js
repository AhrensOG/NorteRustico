import axios from "axios";
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT;

export const logInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(auth, provider);
    const res = await axios.post(SERVER_URL_AUTH_ENDPOINT, credentials);
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al autenticar.');
    return error;
  }
};
