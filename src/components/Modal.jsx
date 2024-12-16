import "./Modal.css"
import { useEffect } from "react"

const Modal = ({notifText, closeNotif}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeNotif()
    }, 2000);
    // CleanUp funkce
    return () => clearTimeout(timer); 
  })

  return (
    <p className="notifText">{notifText}</p>
  )
}

export default Modal