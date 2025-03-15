import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Learner/home.css'
import Amico from "../../assets/amico.png";
// import ImgSample1 from "../../../assets/portfolio-2.png";
// import ImgSample2 from "../../../assets/portfolio-3.png";
// import ImgSample3 from "../../../assets/portfolio-4.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Home = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);

  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const number = /[0-9]/;
  const specialCharacter = /[!@#$%^&*(),.?;'{}|]/;

  const isLengthValid = minLength.test(password);
  const isUpperValid = upperCase.test(password);
  const isLowerValid = lowerCase.test(password);
  const isNumberValid = number.test(password);
  const isSpecialCharacterValid = specialCharacter.test(password);

  const isPasswordWeak =
    !isLengthValid ||
    !isUpperValid ||
    !isLowerValid ||
    !isNumberValid ||
    !isSpecialCharacterValid;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const isValid =
      isLengthValid &&
      isUpperValid &&
      isLowerValid &&
      isNumberValid &&
      isSpecialCharacterValid;

    setIsPasswordValid(isValid);
  }, [password]);

  useEffect(() => {
    const isConfirmValid = confirmPassword === password;
    setIsConfirmPasswordValid(isConfirmValid);
  }, [confirmPassword, password]);

  useEffect(() => {
    const isEmailValid = emailRegex.test(email);
    setIsEmailValid(isEmailValid);
  }, [email]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmPasswordTouched(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex justify-center items-center Amico p-16">
        <img
          className="w-full md:h-full h-full object-scale-down py-2 md:mx-5"
          src={Amico}
          alt="Your Company"
        />
      </div>

      <div className="flex-1 p-4 md:p-6 mt-6 mb-10 md:mt-0 pb-2">
        <div className="w-full max-w-lg mx-auto pt-8">
          <h2 className="text-left text-2xl md:text-3xl font-bold tracking-tight text-gray-600 mb-4">
            Create Account
          </h2>
          <p className="text-left mb-4 text-sm md:text-base">
            Welcome, create an account and begin your learning Journey
          </p>
          <form className="space-y-4" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="block w-full border-black border-2 rounded-md bg-white px-3 py-1 text-base text-gray-600 outline-1 outline-offset-1 outline-black-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900"
              >
                Surname
              </label>
              <input
                type="text"
                placeholder="Enter SurName"
                className="block w-full border-black border-2 rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="Enter your Email"
                  required
                  className="block w-full border-black border-2 rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />

                {!isEmailValid && email && (
                  <div className="text-red-600 text-xs mt-1">
                    Please enter a valid email
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900"
              >
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  required
                  className={`block w-full border-black border-2 rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm ${
                    isPasswordTouched && password && !isPasswordValid
                      ? "invalid-input"
                      : ""
                  } `}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {isPasswordTouched && password && isPasswordWeak && (
                <div className="text-red-600 text-xs">Weak Password</div>
              )}
              {isPasswordTouched && password && !isPasswordWeak && (
                <div className="text-green-600 text-xs">Strong Password</div>
              )}
            </div>

            <div>
              <label
                htmlFor="password-confirm"
                className="text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password-confirm"
                  id="password-confirm"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  required
                  className={`block w-full border-black border-2 rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm ${
                    isConfirmPasswordTouched &&
                    confirmPassword &&
                    !isConfirmPasswordValid
                      ? "invalid-input"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {isConfirmPasswordTouched &&
                confirmPassword &&
                !isConfirmPasswordValid && (
                  <div className="text-red-600 text-xs">
                    Passwords do not match
                  </div>
                )}
            </div>
            
            <div className="password-requirements">
              <p className={minLength.test(password) ? 'valid' : 'invalid'} >Be a minimum of 8 characters</p>
              <p  className={lowerCase.test(password) ? 'valid' : 'invalid'}>Include at least one lowecase letter (a-z)</p>
              <p  className={upperCase.test(password) ? 'valid' : 'invalid'}>Include at least one uppercase letter (A-Z)</p>
              <p  className={number.test(password) ? 'valid' : 'invalid'}>Include at least one number (0-9)</p>

              <p  className={specialCharacter.test(password) ? 'valid' : 'invalid'}>Include at least one Special Character (0-9)</p>
            </div>
      


            <div className="text-sm flex items-center ">
              <input
                type="checkbox"
                id="terms"
                required
                className="mr-2 mb-4 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <div className="md:flex-wrap mb-4">
                I agree to &nbsp;
                <span className="Terms">
                  <a href="">Terms & Conditions &nbsp;</a>{" "}
                </span>
                and
                <span className="Terms">
                  <a href="">&nbsp;Privacy Policy</a>
                </span>
              </div>
            </div>
            <div>
              <Link to="/successfulReg">
                <button
                  type="submit"
                  disabled={
                    !isPasswordValid || !isConfirmPasswordValid || !isEmailValid
                  }
                  className={`continueBtn w-full flex justify-center rounded-md px-3 ml-2 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                    !isPasswordValid || !isConfirmPasswordValid || !isEmailValid
                      ? "disabled"
                      : ""
                  }`}
                >
                  Continue
                </button>
              </Link>
            </div>
          </form>

          <div className="line-with-text mt-6">
            <span>Or Continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-wrap gap-4 items-center justify-center mt-6">
            <a href="#" className="social-btn linkedin-btn">
              <img className="w-8 h-8 mr-2" src={Amico} alt="LinkedIn" />
              LinkedIn
            </a>
            <a href="#" className="social-btn google-btn">
              <img className="w-8 h-8 mr-2" src={Amico} alt="Google" />
              Google
            </a>
            <a href="#" className="social-btn facebook-btn">
              <img className="w-8 h-8 mr-2" src={Amico} alt="Facebook" />
              Facebook
            </a>
          </div>

          <div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an Account? &nbsp;
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;