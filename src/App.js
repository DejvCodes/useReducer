import { useState, useReducer } from "react"
import Modal from "./components/Modal"
import OneUser from "./components/OneUser"

const reducer = (state, action) => {
  // Musí vracet stav
  // console.log(state, action)

  // Přidání uživatele
  if (action.type === "ADD_USER") {
    const newUsers = [...state.users, action.payload]
    return {
      ...state,
      users: newUsers,
      showNotification: true,
      notificationText: "Uživatel byl přidán",
    }
  }

  // Pokud uživatel nezadá jméno
  if (action.type === "NO_USER_NAME") {
    return {
      ...state,
      showNotification: true,
      notificationText: "Zadejte uživatele"
    }
  }

  // Skrytí notifikace
  if (action.type === "CLOSE_NOTIFICATION") {
    return {
      ...state,
      showNotification: false,
    }
  }

  // Odstranění uživatele
  if (action.type === "DELETE_USER") {
    const filteredUsers = state.users.filter((oneUser) => {
      return oneUser.id !== action.payload
    })
    return {
      ...state,
      users: filteredUsers,
      showNotification: true,
      notificationText: "Uživatel byl odstraněn",
    }
  }
  console.error(new Error("Chyba - žádná shoda s action.type"))
  return state
}

const defaultState = {
  users: [],
  showNotification: false,
  notificationText: "",
}

const App = () => {
  const [userName, setUserName] = useState("")
  const [state, dispatch] = useReducer(reducer, defaultState)

  const formSubmit = (e) => {
    e.preventDefault()

    // Validace
    if (userName.trim()) {
      const newUser = { id: new Date().getTime(), name: userName }
      dispatch({ type: "ADD_USER", payload: newUser })
    } else {
      dispatch({ type: "NO_USER_NAME" })
    }
    setUserName("")
  }

  const closeNotification = () => {
    dispatch({ type: "CLOSE_NOTIFICATION" })
  }

  const deleteUser = (id) => {
    dispatch({ type: "DELETE_USER", payload: id })
  }

  return (
    <div className="container">
      <div className="notification">
        {state.showNotification && <Modal
          notifText={state.notificationText}
          closeNotif={closeNotification}
        />}
      </div>

      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Zadejte uživatele"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input type="submit" value="Přidat" />
      </form>

      <div className="users-list">
        {state.users.map((oneUser) => (
          <OneUser key={oneUser.id} {...oneUser} deleteUser={deleteUser} />
        ))}
      </div>
    </div>
  )
}

export default App