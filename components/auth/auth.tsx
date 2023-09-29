import * as styles from "./styles";

import { firebase } from "../../pages/_app";
import { useAuth } from "../../custom/auth";

const db = firebase.firestore();

export default function Auth() {
  const { setUser } = useAuth();

  const googleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (res) => {
        const user = {
          displayName: res.user ? res.user.displayName || "" : "",
          email: res.user ? res.user.email || "" : "",
          refreshToken: res.user ? res.user.refreshToken || "" : "",
          uid: res.user ? res.user.uid || "" : "",
          photoUrl: res.user?.photoURL || "",
        };
        setUser(user);
        await db.collection("users").doc(user.uid).set({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoUrl: user.photoUrl,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <styles.AuthContainer>
      <styles.AuthForm>
        <styles.LoginButton color="primary" onClick={googleAuth}>
          <styles.Logo src="/static/google_logo.png" alt="" />
          <span className="ms-3" style={{ fontSize: "1.2rem" }}>
            Sign in with Google
          </span>
        </styles.LoginButton>
      </styles.AuthForm>
    </styles.AuthContainer>
  );
}
