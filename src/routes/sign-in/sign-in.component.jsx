import { signInwithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInwithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>SignIn with Google Popup</button>
    </div>
  );
};

export default SignIn;
