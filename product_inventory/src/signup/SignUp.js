import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'

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
            invalidfirstname: true,
            invalidlastname: true,
            invalidemail: true,
            invalidpassword: true,
            invalidconfirmpassword: true,
            invalidsecurityquestion: true,
            invalidanswer: true,
            invalidgender: true,
            invalidsubmit: true,
            onchangefirstname:false,
            onchangelastname:false,
            onchangeemail:false,
            onchangepassword:false,
            onchangeconfirmpassword:false,
            onchangesequrity:false,
            onchangeanswer:false,
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
            "gender": this.state.gender
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
        this.setState({onchangefirstname:true})
        if (event.target.value === '' || event.target.value.includes('@')||event.target.value.includes('#')||event.target.value.includes('$')||event.target.value.includes('%')||event.target.value.includes('*')) {
            this.setState({ invalidfirstname: true })
        } else {
            this.setState({ invalidfirstname: false, firstname: event.target.value })
        }
    }
    getLastName = (event) => {
        this.setState({onchangelastname:true})
        if (event.target.value === '' || event.target.value.includes('@')||event.target.value.includes('#')||event.target.value.includes('$')||event.target.value.includes('%')||event.target.value.includes('*')) {
            this.setState({ invalidlastname: true })
        } else {
            this.setState({ invalidlastname: false, lastname: event.target.value })
        }
    }
    getEmail = (event) => {
        this.setState({onchangeemail:true})
        if (event.target.value.includes('@')) {
            this.setState({ invalidemail: false, email: event.target.value })
        } else {
            this.setState({ invalidemail: true })
        }
    }
    getPassword = (event) => {
        this.setState({onchangepassword:true})
        if (event.target.value === '') {
            this.setState({ invalidpassword: true })
        } else {
            this.setState({ invalidpassword: false, password: event.target.value })
        }
    }
    getConfirmPassword = (event) => {
        this.setState({onchangeconfirmpassword:true})
        if (event.target.value !== this.state.password) {
            this.setState({ invalidconfirmpassword: true })
        } else {
            this.setState({ invalidconfirmpassword: false, confirmpassword: event.target.value })
        }
    }
    getSecurityQuestion = (event) => {
        this.setState({onchangesequrity:true})
        if (event.target.value.length === 0) {
            this.setState({ invalidsecurityquestion: true })
        } else {
            this.setState({ invalidsecurityquestion: false, securityquestion: event.target.value })
        }
    }
    getAnswer = (event) => {
        this.setState({onchangeanswer:true})
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
            <Container >
                <Row>
                    <Card className='mx-auto'>
                        <h2 className='text-center'>Farming protects Future</h2>
                        <br></br>
                        <Row className='mx-auto'>
                            <Col xl={5} md={5} xs={12}>
                                <Link to='/'><Button >
                                    <h4>LOGIN</h4>
                                </Button></Link>
                            </Col>
                            <Col xl={2} md={2} xs={12}>&nbsp;</Col>
                            <Col xl={5} md={5} xs={12} >
                                <Link to='/signup'><Button >
                                    <h4>SIGNUP</h4>
                                </Button></Link>
                            </Col>
                        </Row>
                        <br></br>
                        <Row className='mx-auto'><h2 >SignUp Here</h2></Row>
                        <br></br>
                        <form >
                            <Row className='mx-auto'>
                                <Col xl={6} md={6} xs={12}><label htmlFor='firstname'>{this.state.invalidfirstname && <span className='error'>*</span>}First Name :</label></Col>
                                <Col xl={6} md={6} xs={12}><input type="text" id='firstname' name="firstname" onChange={this.getFirstName}></input></Col>
                            </Row>
                            <Row className='mx-auto'><Col className="text-center ">{this.state.invalidfirstname && this.state.onchangefirstname && <span className='error'>Invalid firstName</span>}</Col></Row>
                            <Row className='mx-auto'>
                                <Col xl={6} md={6} xs={12}><label htmlFor='lastname'>{this.state.invalidlastname &&  <span className='error'>*</span>}Last Name :</label></Col>
                                <Col xl={6} md={6} xs={12}><input type="text" id='lastname' name="lastname" onChange={this.getLastName}></input></Col>
                            </Row>
                            <Row className='mx-auto'><Col className="text-center ">{this.state.invalidlastname && this.state.onchangelastname && <span className='error'>Invalid LastName</span>}</Col></Row>
                            <Row className='mx-auto'>
                                <Col xl={6} md={6} xs={12}><label htmlFor="email">{this.state.invalidemail  && <span className='error'>*</span>}E-mail :</label></Col>
                                <Col xl={6} md={6} xs={12}><input type="email" id='email' onChange={this.getEmail}></input></Col>
                            </Row>
                            <Row className='mx-auto'><Col className="text-center ">{this.state.invalidemail && this.state.onchangeemail && <span className='error'>Email Id, must contain '@'</span>}</Col></Row>
                            <Row className='mx-auto'>
                                <Col xl={6} md={6} xs={12}><label htmlFor='password'>{this.state.invalidpassword  && <span className='error'>*</span>}Password :</label></Col>
                                <Col xl={6} md={6} xs={12}><input type="password" id="password" onChange={this.getPassword}></input></Col>
                            </Row>
                            <Row className='mx-auto'><Col className="text-center ">{this.state.invalidpassword && this.state.onchangepassword && <span className='error'>Password is required</span>}</Col></Row>
                            <Row className='mx-auto'>
                                <Col xl={6} md={6} xs={12}><label htmlFor="confirmpassword">{this.state.invalidconfirmpassword  && <span className='error'>*</span>}Confirmpassword :</label></Col>
                                <Col xl={6} md={6} xs={12}><input type="password" id='confirmpassword' onChange={this.getConfirmPassword}></input></Col>
                            </Row>
                            <Row className='mx-auto'><Col className="text-center ">{this.state.invalidconfirmpassword && this.state.onchangeconfirmpassword && <span className='error'>Confirm Password should match with Password</span>}</Col></Row>
                            <Row className='mx-auto'>
                                <Col xl={5} md={5} xs={12}><label htmlFor="securityquestion">{this.state.invalidsecurityquestion && <span className='error'>*</span>}Security Question ?</label></Col>
                                <Col xl={7} md={7} xs={12}><select id="securityquestion" name="securityquestion" onChange={this.getSecurityQuestion}>
                                    <option value=''> </option>
                                    <option value='what is your first school?'>what is your first school?</option>
                                    <option value='who is your best friend?'>who is your best friend?</option>
                                    <option value='what is tour favourite color?'>what is tour favourite color?</option>
                                </select></Col>
                            </Row>
                            <Row className='mx-auto'><Col className="text-center ">{this.state.invalidsecurityquestion && this.state.onchangesequrity && <span className='error'>Select Security question</span>}</Col></Row>
                            <Row className='mx-auto'>
                                <Col xl={6} md={6} xs={12}><label htmlFor="answer">{this.state.invalidanswer && <span className='error'>*</span>}Security Answer :</label></Col>
                                <Col xl={6} md={6} xs={12}><input type="text" id="answer" name='answer' onChange={this.getAnswer}></input></Col>
                            </Row>
                            <Row className='mx-auto'><Col className="text-center ">{this.state.invalidanswer && this.state.onchangeanswer && <span className='error'>Answer required </span>}</Col></Row>
                            <Row className='mx-auto'>
                                <Col xl={6} md={6} xs={12}>{this.state.invalidgender && <span className='error'>*</span>}<label >Gender</label></Col>
                                <Col xl={6} md={6} xs={12}><input type="radio" id="male" name="gender" value="male" onClick={this.getGender}></input>
                                    <label htmlFor="male">Male</label>&nbsp;&nbsp;
                                    <input type="radio" id="female" name="gender" value="female" onClick={this.getGender}></input>
                                    <label htmlFor="female">Female</label></Col>
                            </Row>
                            <br></br>
                            <Row className='mx-auto'>
                                <Col className="text-center"><input type="button" onClick={this.signUp} disabled={this.state.invalidsubmit} value="SignUp"></input></Col>
                            </Row>
                            <br></br>&nbsp;<br></br>
                        </form>
                    </Card>
                </Row>
            </Container>
        )
    }
}
export default SignUp