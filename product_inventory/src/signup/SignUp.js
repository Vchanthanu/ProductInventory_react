import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            securityquestion: ' ',
            answer: '',
            gender: '',
            invalidfirstname: false,
            invalidlastname: false,
            invalidemail: true,
            invalidpassword: false,
            invalidconfirmpassword: false,
            invalidsecurityquestion: false,
            invalidanswer: false,
            invalidgender: false,
            invalidsubmit: true,
            existuser: []
        }
    }
    signUp = (event) => {
        let signupRequestBody = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "password": this.state.password,
            "confirmpassword": this.state.confirmpassword,
            "securityquestion": this.state.securityquestion,
            "answer": this.state.answer,
            "gender": this.state.gender,
        }
            axios.post('http://localhost:3000/users', signupRequestBody)
                .then(response => {
                    console.log('signUp done')
                    this.props.history.push('/')
                }, error => {
                    console.error(error)
                })
    }
    getFirstName = (event) => {
        if (event.target.value === '' || event.target.value.includes('@')) {
            this.setState({ invalidfirstname: true })
        } else {
            this.setState({ invalidfirstname: false, firstname: event.target.value })
        }
    }
    getLastName = (event) => {
        if (event.target.value === ''|| event.target.value.includes('@')) {
            this.setState({ invalidlastname: true })
        } else {
            this.setState({ invalidlastname: false, lastname: event.target.value })
        }
    }
    getEmail = (event) => {
        if (event.target.value.includes('@')) {
            this.setState({ invalidemail: false, email: event.target.value })
        } else {
            this.setState({ invalidemail: true })
        }
    }
    getPassword = (event) => {
        if (event.target.value === '') {
            this.setState({ invalidpassword: true })
        } else {
            this.setState({ invalidpassword: false, password: event.target.value })
        }
    }
    getConfirmPassword = (event) => {
        if (event.target.value !== this.state.password) {
            this.setState({ invalidconfirmpassword: true })
        } else {
            this.setState({ invalidconfirmpassword: false, confirmpassword: event.target.value })
        }
    }
    getSecurityQuestion = (event) => {
        if (event.target.value.length === 0) {
            this.setState({ invalidsecurityquestion: true })
        } else {
            this.setState({ invalidsecurityquestion: false, securityquestion: event.target.value })
        }
    }
    getAnswer = (event) => {
        if (event.target.value === '') {
            this.setState({ invalidanswer: true })
        } else {
            this.setState({ invalidanswer: false, answer: event.target.value })
        }
    }
    getGender = (event) => {
        if (event.target.value === '') {
            this.setState({ invalidgender: true })
        } else {
            this.setState({ invalidgender: false, gender: event.target.value })
        }
        this.vaildsubmit();
    }
    vaildsubmit = () => {
        if (this.state.invalidfirstname || this.state.invalidlastname || this.state.invalidemail || this.state.invalidpassword || this.state.invalidconfirmpassword || this.state.invalidsecurityquestion || this.state.invalidanswer || this.state.invalidgender) {
            this.setState({ invalidsubmit: true })
        } else {
            this.setState({ invalidsubmit: false })
        }
        return this.state.invalidsubmit
    }
    render() {
        return (
            <div className="section">
                <div className="container">
                    <span className="image">
                        <h1 className="quote">Farming protects Future</h1>
                        <h4 className="option"><Link to='/'><button className="login button" >
                            <h3>LOGIN</h3>
                        </button></Link>
                        </h4>
                        <h4 className="option"><Link to='/signup'><button className="signup button" >
                            <h3>SIGNUP</h3>
                        </button></Link>
                        </h4>
                    </span>
                    <span className="loginarea">
                        <h1>SignUp Here</h1>
                        <form className="form" >
                            <label htmlFor='firstname'>First Name</label>
                            <input type="text" id='firstname' name="firstname" onChange={this.getFirstName}></input><br></br>
                            {this.state.invalidfirstname && <span className='error'>FirstName is required</span>}
                            <br></br><br></br>
                            <label htmlFor='lastname'>Last Name</label>
                            <input type="text" id='lastname' name="lastname" onChange={this.getLastName}></input><br></br>
                            {this.state.invalidlastname && <span className='error'>LastName is required</span>}<br></br><br></br>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id='email' onChange={this.getEmail}></input><br></br>
                            {this.state.invalidemail && <span className='error'>Email Id, must contain '@'</span>}
                            <br></br><br></br>
                            <label htmlFor='password'>Password:</label>
                            <input type="password" id="password" onChange={this.getPassword}></input><br></br>
                            {this.state.invalidpassword && <span className='error'>Password is required</span>}
                            <br></br><br></br>
                            <label htmlFor="confirmpassword">Confirmpassword</label>
                            <input type="password" id='confirmpassword' onChange={this.getConfirmPassword}></input><br></br>
                            {this.state.invalidconfirmpassword && <span className='error'>Confirm Password should match with Password</span>}
                            <br></br><br></br>
                            <label htmlFor="securityquestion">Security Question</label>
                            <select id="securityquestion" name="securityquestion" onChange={this.getSecurityQuestion}>
                                <option value=''> </option>
                                <option value='what is your first school?'>what is your first school?</option>
                                <option value='who is your best friend?'>who is your best friend?</option>
                                <option value='what is tour favourite color?'>what is tour favourite color?</option>
                            </select><br></br>
                            {this.state.invalidsecurityquestion && <span className='error'>required</span>}
                            <br></br><br></br>
                            <label htmlFor="answer">Security Answer?</label>
                            <input type="text" id="answer" name='answer' onChange={this.getAnswer}></input><br></br>
                            {this.state.invalidanswer && <span className='error'>required</span>}
                            <br></br>
                            <label >Gender</label>
                            <input type="radio" id="male" name="gender" value="male" onClick={this.getGender}></input>
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" onClick={this.getGender}></input>
                            <label htmlFor="female">Female</label><br></br>
                            <br></br>
                            <input type="button" onClick={this.signUp} disabled={this.state.invalidsubmit} value="SignUp"></input>
                            <br></br>&nbsp;<br></br>
                        </form>
                    </span>
                </div>
            </div>
        )
    }
}
export default SignUp