import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFieldEmpty, setisFieldEmpty] = useState(false);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [firebase.isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email !== "" && password !== "") {
        const result = await firebase.signinUserWithEmailAndPassword(
          email,
          password
        );
        if (result.success) {
          alert("User signed in successfully");
        }
      } else {
        setisFieldEmpty(true);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const backToSignup = () => {
    setisFieldEmpty(false);
  };

  const googleLogin = async () => {
    try {
      await firebase.loginWithGoogle();
    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);
    }
  };

  if (isFieldEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-sm">
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 animate-bounce">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 
                  0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 
                  0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Oops! Something's Missing
            </h3>
            <p className="text-gray-600">All fields are required to continue</p>
            <Button
              variant="outline-primary"
              className="w-full mt-6 py-2 px-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold shadow-md hover:from-sky-600 hover:to-cyan-600 transition-all"
              onClick={backToSignup}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <Card className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl mb-3 shadow-md">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 
                  002-2v-6a2 2 0 00-2-2H6a2 2 
                  0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 
                  0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              Welcome Back
            </h3>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <Form>
            {/* Email */}
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="space-y-3">
              {/* Login Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-full py-2 px-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-lg font-semibold shadow-md hover:from-sky-600 hover:to-cyan-600 transition-all"
                onClick={handleSubmit}
              >
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500 font-medium">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Google Button */}
              <Button
                variant="outline-dark"
                className="w-full py-2 px-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                onClick={googleLogin}
              >
                <FcGoogle size={18} />
                Sign in with Google
              </Button>
            </div>
          </Form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-purple-600 hover:text-pink-600 transition-colors"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
