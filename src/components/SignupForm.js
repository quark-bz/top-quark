import "../css/login.css";
import { withRouter } from "react-router";
import { useRef } from "react";
import { useAuth } from "../contexts/FirebaseAuthContext";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SignupForm = ({ history }) => {
  const { loginGoogle, signup, loginPassword } = useAuth();
  const handleLoginGoogle = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await loginGoogle();
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [loginGoogle, history]
  );

  const handleSignup = async (data) => {
    try {
      await signup(data.email, data.password);
      await loginPassword(data.email, data.password);
      history.push("/");
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
        <div class="loginPageContainer">
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
                  <p class="loginerror">{errors.password.message}</p>
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
                  <p class="loginerror">
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
            <div class="divTextWrap" id="forgotPwd">
              <a href="/login">
                <p>Back to Log in</p>
              </a>
            </div>
            <div id="horizontalLineSep">
              <hr class="orSepLn"></hr>
              <p>or with</p>
              <hr class="orSepLn"></hr>
            </div>
            <div id="altLoginIcon">
              <i onClick={handleLoginGoogle} class="fab fa-google fa-2x"></i>
              {/*<i class="fab fa-github fa-2x"></i>
                    <i class="fab fa-facebook fa-2x"></i>*/}
            </div>

            <div class="divTextWrap" id="skipText">
              <p>
                <a id="homeAref" href="/home">
                  <i class="fas fa-home"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(SignupForm);
