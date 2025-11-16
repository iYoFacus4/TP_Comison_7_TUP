import {useState} from 'react'
import { Container,Form,Button,Alert } from 'react-bootstrap';
import {useAuth} from "../hook/useAuth";
import {useAuthStore} from "../store/zunstand";

const Login = () => {
const [loading,setLoading] = useState (false);
const [email,setEmail] = useState ("");
const [password,setPassword] = useState ("");
const { handleLogin, error} = useAuth();
// const user = useAuthStore((state) => state.user);
const setUser = useAuthStore((state) => state.setUser);

const handleSumbit = async (e) => {
  e.preventDefault();
  setLoading(true);
  await handleLogin({email, password});
  setLoading(false);
}

  return (
    <div>
      <Container className='contenedorLogin'>
        <Form  onSubmit={handleSumbit}>
        <h1>Login</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        <Container>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)} value={email} />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} value={password} />
          </Form.Group>
        </Container>
        <br />
        <Button disabled={loading} variant="primary" type="submit">
          {loading ? 'Ingresando...' : 'Entrar'}
        </Button>
        </Form>
         </Container>
        {/* <form>
          <div>
            <label>Email:</label>
            <input type="email" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" />
          </div>
          <button type="submit">Login</button>
        </form> */}
  
    </div>
  )
}

export default Login
