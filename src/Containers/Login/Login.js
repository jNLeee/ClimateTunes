import {ReactComponent as ReactLogo} from './Logo.svg';
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
                        >
                          Sign in with Spotify
                        </Button>{' '}</p>
      </header>
    </div>
  );
}

export default Login;