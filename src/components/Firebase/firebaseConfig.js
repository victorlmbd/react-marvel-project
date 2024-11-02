import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiZU7u7ghXI9w1_sDGWo1lzmjgFGCWAtE",
  authDomain: "marvel-quiz-263d2.firebaseapp.com",
  projectId: "marvel-quiz-263d2",
  storageBucket: "marvel-quiz-263d2.appspot.com",
  messagingSenderId: "873972161871",
  appId: "1:873972161871:web:b3771d0c09781f2881393a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const user = uid => doc(db, `user/${uid}`);
