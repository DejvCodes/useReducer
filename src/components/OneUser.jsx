import "./OneUser.css"
import PropTypes from 'prop-types';

const OneUser = ({id, name, deleteUser}) => {
  return <div key={id} className="one-user">
    <p>ID: {id}</p>
    <h2>Jméno: {name}</h2>
    <button onClick={() => deleteUser(id)}>Smazat</button>
  </div>
}

OneUser.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

export default OneUser