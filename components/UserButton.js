// Simple component that allows a user to log out.

import { getAuth, signOut } from "firebase/auth"
import { useContext } from "react"
import { UserContext } from "../providers/UserProvider"
import app from "../firebase/ClientApp"

const UserButton = () => {
  const { user } = useContext(UserContext)
  const auth = getAuth(app)

  // If the user is logged in, display a log out button.
  if (user) {
    return (
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => signOut(auth)}
      >
        Log Out
      </button>
    )
  }
}

export default UserButton
