import auth from "./firebaseAuth";
import { signOut } from "firebase/auth";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Signout.scss'

export default function SignOut() {
  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
   
      .then((cred) => {
        currentUser.setCurrentUser("");
        console.log(cred);
        alert("user signed out", cred);
       
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };
  
  return (
    <li onClick={userSignOut} className="navbar__menuItem">
      Sign Out
    </li>
    
  )
}
