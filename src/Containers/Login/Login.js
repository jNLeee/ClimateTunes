import {ReactComponent as ReactLogo} from './logo.svg';
import './Login.css';
import { Button} from 'react-bootstrap';

function Login() {
  return (
    <div className="Login">
      
      <header className="Login-header">
      <ReactLogo />
      <p >
                        <Button class="LogInButton"
                            variant="login"
                            href="http://localhost:5000/login"
                        >
                          Sign in with Spotify
                        </Button>{' '}</p>
      </header>
    </div>
  );
}

export default Login;