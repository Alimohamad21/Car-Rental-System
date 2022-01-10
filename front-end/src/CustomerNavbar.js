import {useNavigate} from "react-router-dom";

const CustomerNavbar = () => {
    const username = "adham";
    const navigate = useNavigate();

    const goToReservations = () => {
        navigate('/reservations',{state:{
                'username':username
            }});
    }
  return (
    <nav className="customer-navbar">
      <h1>Hello {username}</h1>
      <button onClick={goToReservations}>Reservations</button>
    </nav>
  );
}
 
export default CustomerNavbar;