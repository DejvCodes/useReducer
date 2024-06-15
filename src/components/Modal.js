import "./Modal.css"
import { useEffect } from "react"

const Modal = ({notifContent, closeNotif}) => {
  useEffect(() => {
    setTimeout(() => {
      closeNotif()
    }, 2000);
  })

  return <div>
    <div className="notification">{notifContent}</div>
    {/* <p onClick={closeNotif}>Zavřít</p> */}
  </div>
}

export default Modal