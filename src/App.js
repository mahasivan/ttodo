import { useEffect, useState } from "react";
import axios from "axios"
function App() {
  const [evalue,setevalue]=useState("")
  const [fruit,setfruit]=useState([])
  const [dvalue,setdvalue]=useState("")
 useEffect(function(){ axios.get("http://localhost:5000/fruits").then(function(data){
    setfruit(data.data)
  // console.log(data)
  }
)},[])
  function handlechange(evt){
setevalue(evt.target.value)
  }
  function add(){
    if (evalue.trim() === '') {
      alert('Item name cannot be empty');
      return;
    }
    axios.post("http://localhost:5000/addfruit",{newfruit:evalue})
   .then(function(response){ setfruit([...fruit,response.data])
    setevalue("")
    console.log(fruit)})
}
function deleteitem(id){
console.log(id)
axios.post("http://localhost:5000/delfruit",{did:id})
setfruit(fruit.filter(item => item._id !== id))
}
console.log(fruit)
  return (
    <div>
      <input value={evalue} type="text" onChange={handlechange}></input>
      <button onClick={add}>Add</button>
      {
        fruit.map(function(item){
          return <div style={{display:"inline"}}>
            <h1>{item.name}</h1>
          <button onClick={()=>deleteitem(item._id)}>Delete</button>
          </div>
        })
      }
    </div>
  );
}

export default App;
