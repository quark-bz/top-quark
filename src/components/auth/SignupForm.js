/* eslint-disable @next/next/link-passhref */
// import "../../css/login.css";
import { useRef } from "react";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const SignupForm = ({}) => {
  const { loginGoogle, signup, loginPassword } = useAuth();
  const router = useRouter();
  const handleLoginGoogle = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await loginGoogle();
        router.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [loginGoogle, router]
  );

  const handleSignup = async (data) => {
    try {
      await signup(data.email, data.password);
      await loginPassword(data.email, data.password);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <>
      <div id="loginBG"></div>
      <div id="lgwrapper">
        <div className="loginPageContainer">
          <div id="loginFlexBox">
            <div id="topIcon"></div>
            <form id="loginInputText" onSubmit={handleSubmit(handleSignup)}>
              <div>
                <TextField
                  id="emailInput"
                  label="Email Address"
                  autoComplete="email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  {...register("email")}
                />
              </div>
              {/* <div>
                <TextField
                  id="usernameInput"
                  label="Username"
                  type="username"
                  variant="outlined"
                  margin="normal"
                  required
                  {...register("username")}
                />
              </div> */}
              <div>
                <TextField
                  id="pwdInput"
                  label="Password"
                  autoComplete="password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="loginerror">{errors.password.message}</p>
                )}
              </div>

              <div>
                <TextField
                  id="cfmpwdInput"
                  name="cfmpassword"
                  label="Confirm Password"
                  autoComplete="password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  {...register("cfmpassword", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                {errors.cfmpassword && (
                  <p className="loginerror">
                    {errors.cfmpassword.message} hi joen pls fix this :(
                  </p>
                )}
              </div>
              <Button
                id="loginSubmitBtn"
                margin="normal"
                type="submit"
                style={{ fontFamily: "Nunito", marginTop: "20px" }}
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </form>
            <div className="divTextWrap" id="forgotPwd">
              <Link href="/login">
                <p>Back to Log in</p>
              </Link>
            </div>
            <div id="horizontalLineSep">
              <hr className="orSepLn"></hr>
              <p>or with</p>
              <hr className="orSepLn"></hr>
            </div>
            <div id="altLoginIcon">
              <i
                onClick={handleLoginGoogle}
                className="fab fa-google fa-2x"
              ></i>
              {/*<i class="fab fa-github fa-2x"></i>
                    <i class="fab fa-facebook fa-2x"></i>*/}
            </div>

            <div className="divTextWrap" id="skipText">
              <Link id="homeAref" href="/home">
                <i className="fas fa-home"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
