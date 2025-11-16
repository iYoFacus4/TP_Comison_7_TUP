import {useState} from 'react'
import BasicExample from "./BasicExample"



const Certificados = () => {

  const  [show,setShow] = useState(false);

  // const mostrar = () =>{
  //   setShow(!show);
    
  // }

  return (
    <div>
      <h2 onClick={()=>setShow(!show)}>Certificados</h2>
      {show && <BasicExample />}
    </div>
  )
}

export default Certificados
