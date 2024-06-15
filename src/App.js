import Modal from "./components/Modal"
import { useState, useReducer } from "react"

const reducer = (state, action) => {
  // Musí vracet stav
  console.log(state, action)

  if (action.type === "ADD_MOVIE") {
    const newMovies = [...state.movies, action.payload]
    return {
      ...state,
      movies: newMovies,
      showNotification: true,
      notificationContent: "Film byl přidán",
    }
  }

  if (action.type === "NO_MOVIE_NAME") {
    return {
      ...state,
      showNotification: true,
      notificationContent: "Zadejte film",
    }
  }

  if (action.type === "CLOSE_NOTIFICATION") {
    return {
      ...state,
      showNotification: false,
    }
  }

 
  if (action.type === "REMOVE_MOVIE") {
    const filteredMovie = state.movies.filter((oneMovie) => {
      return oneMovie.id !== action.payload
    })
    return {
      ...state,
      movies: filteredMovie,
    }
  }

  return new Error("Chyba - žádná shoda s action.type!")
}

const defaultState = {
  movies: [],
  showNotification: false,
  notificationContent: "",
}

const App = () => {
  const [movieName, setMovieName] = useState("")
  const [state, dispatch] = useReducer(reducer, defaultState)

  const submitForm = (event) => {
    event.preventDefault()

    if (movieName) {
      const newMovie = {id: new Date().getTime(), name: movieName}
      dispatch({type: "ADD_MOVIE", payload: newMovie})
    } else {
      dispatch({type: "NO_MOVIE_NAME"})
    }
    setMovieName("")
  }

  const closeNotification = () => {
    dispatch({type: "CLOSE_NOTIFICATION"})
  }

  return <section className="form">
    {state.showNotification && <Modal notifContent={state.notificationContent} closeNotif={closeNotification} />}
    <form onSubmit={submitForm}>
      <input 
        type="text" 
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
      />
      <input type="submit" value="Přidat" />
    </form>
    <div>
      {
        state.movies.map((oneMovie) => {
          const {id, name} = oneMovie

          return <div className="all-movies" key={id}>
            <p>{name}</p>
            <button onClick={() => dispatch({type: "REMOVE_MOVIE", payload: id})}>Smazat</button>
          </div>
        })
      }
    </div>
  </section>
}

export default App