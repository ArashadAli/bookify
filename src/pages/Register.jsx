import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import {useFirebase} from '../context/Firebase.jsx'
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
const RegisterPage = () => {
    const firebase = useFirebase()
    const navigate = useNavigate()
    // console.log("firebase : ",firebase)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isFieldEmpty,setisFieldEmpty] = useState(false)
    const [isUserSignUp,setisUserSignUp] = useState(false)
    useEffect(() => {
      if(firebase.isLoggedIn){
        navigate('/dashboard')
      }
      if(isUserSignUp) {
        navigate('/login')
      }
    },[firebase.isLoggedIn,navigate])
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(email !== "" && password !== ""){
            console.log("user signup....")
            const result = await firebase.SignupUserWithEmailAndPassword(email,password)
            if(result.user) setisUserSignUp(true)
            alert("user signup successfully...!")
            resetField();
        }
        else{
            setisFieldEmpty(true);
        }
    }
    const resetField = () => {
        setEmail("")
        setPassword("")
    }
    const backToSignup = () => {
        setisFieldEmpty(false)
    }
   if (isFieldEmpty) {
  return (
    <>
      {/* Error Message Box */}
      <div className="alert alert-danger text-center fw-semibold rounded-3 shadow-sm">
        ⚠️ All fields are required!
      </div>

      {/* Button */}
      <div className="d-grid mt-3">
        <Button
          variant="outline-primary"
          type="submit"
          className="rounded-3 fw-semibold shadow-sm"
          onClick={backToSignup}
        >
          Go Back
        </Button>
      </div>
    </>
  );
}
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow-lg p-4 rounded-4" style={{ width: "400px", border: "none" }}>
        <h3 className="text-center mb-4 fw-bold text-primary">Create Account</h3>
        
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control 
              value={email}
              type="email" 
              placeholder="Enter your email" 
              className="rounded-3"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              value={password} 
              type="password" 
              placeholder="Enter password" 
              className="rounded-3"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit" 
              className="rounded-3 fw-semibold"
              onClick={handleSubmit}
            >
              Create Account
            </Button>
          </div>
        </Form>

        <p className="text-center mt-3 text-muted">
          Already have an account? <Link className="text-primary fw-semibold" to="/login">login</Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
