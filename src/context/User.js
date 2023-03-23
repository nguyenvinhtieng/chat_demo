import { useState, useEffect } from "react";
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function UserContext() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          let dataUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }
          setUser(dataUser);
        }else {
          setUser(null);
        }
      })
    }, [])

    return {
      userData: [user, setUser],
    };
}

export default UserContext;