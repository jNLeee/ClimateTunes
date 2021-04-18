import {ReactComponent as ReactLogo} from './Logo.svg';
import './Login.css';
import { Button} from 'react-bootstrap';

function Login() {
  return (
    <div className="Login">
      
      <header className="Login-header">
      <ReactLogo />
      <p className="LogInButton">
                        <Button
                            variant="primary"
                            size="sm"
                        >
                            Sign In with Spotify
                        </Button>{' '}</p>
      </header>
    </div>
  );
}

export default Login;