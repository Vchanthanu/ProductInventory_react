import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Container, Card, Row, Col,Button } from 'react-bootstrap'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            username: '',
            email: '',
            password: '',
            wrongPassword: false,
            wrongEmail: false,
            invalidEmail: true,
            invalidPassword: true
        }
    }
    login = () => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                this.setState({ users: response.data })
                var loguser = this.state.users.find(user => user.email === this.state.email)
                if (loguser === undefined) {
                    this.setState({ wrongEmail: true })
                } else {
                    if (loguser.password === this.state.password) {
                        this.setState({ username: loguser.firstname })
                        localStorage.loggedin = true
                        localStorage.username = loguser.firstname
                        console.log('Login Successful')
                        this.props.history.push('/product')
                    } else {
                        this.setState({ wrongPassword: true })
                    }
                }
            }, error => { console.error(error); })

    }
    getEmail = (event) => {
        this.setState({ wrongEmail: false })
        if (event.target.value.includes('@')) {
            this.setState({ invalidEmail: false })
            this.setState({ email: event.target.value })
        } else {
            this.setState({ invalidEmail: true })
        }
    }
    getPassword = (event) => {
        this.setState({ wrongPassword: false })
        if (event.target.value === '') {
            this.setState({ invalidPassword: true })
        } else {
            this.setState({ invalidPassword: false })
            this.setState({ password: event.target.value })
        }
    }
    render() {
        return (
            <Container>
                <Card>
                    <h1>Farming protects Future</h1>
                    <Link to='/'><Button className="login button">
                        <h3>LOGIN</h3>
                    </Button></Link>
                    <Link to='/signup'><Button >
                        <h3>SIGNUP</h3>
                    </Button></Link>
                    <h1>Login Here</h1>
                    {this.state.wrongEmail && <h3 className='error'>Invalid Email Id</h3>}
                    {this.state.wrongPassword && <h3 className='error'>Invalid Password</h3>}
                    <form className="form" >
                        <label htmlFor='email'>E-mail:</label>
                        <input type="email" id='email' onChange={this.getEmail} name='email'></input><br></br>
                        {this.state.invalidEmail && <span className='error'>Email Id, must contain '@'</span>}
                        <br></br>
                        <br></br>
                        <label htmlFor='password' >Password:</label>
                        <input type="password" id='password' onChange={this.getPassword} name='password'></input><br></br>
                        {this.state.invalidPassword && <span className='error'>Password is required</span>}
                        <br></br><br></br>
                        {/* <a href="/Forgot password">Forgot Password.?</a>&nbsp; */}
                        <input type="button" onClick={this.login} disabled={this.state.invalidEmail || this.state.invalidPassword} value="Login"></input>
                        <br></br>
                    </form>
                </Card>
            </Container>
        )
    }
}
export default Login