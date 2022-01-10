import {useNavigate} from "react-router-dom";

const CustomerNavbar = () => {

    const navigate = useNavigate();
    // const {username} = state;

    const username ="adham";
    const goToReservations = () => {
        navigate('/reservations',{state:{
                'username':username
            }});
    }
  return (
    <nav className="customer-navbar">
      <h1>Hello @{username}</h1>
      <button onClick={goToReservations}>Reservations</button>
    </nav>
  );
}
 
export default CustomerNavbar;