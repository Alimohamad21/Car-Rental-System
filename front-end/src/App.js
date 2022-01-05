import './App.css';
import axios from "axios";
import {useEffect,useState} from "react";

function App() {
  const [listOfUsers,setListOfUsers] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3001/users").then((response)=>{
      setListOfUsers(response.data);
    });
  },[]);
  return (
    <div className="App">
      {listOfUsers.map((value,key) => {
        return (
            <div className="user">
              <div className="name"> {value.name} </div>
              <div className="creation_date"> {value.createdAt} </div>
              <div className="updated"> {value.updatedAt} </div>
            </div>
        );
      })}
    </div>
  );
}

export default App;
