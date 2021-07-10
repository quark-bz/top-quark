import "../../css/login.css";
// import { SignInWithGoogle } from "../firebase";
import { useCallback } from "react";
import { withRouter } from "react-router";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = ({ history }) => {
  const { loginGoogle, loginPassword } = useAuth();
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

  const handleLoginPassword = async (data) => {
    try {
      await loginPassword(data.email, data.password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };
  const { register, handleSubmit } = useForm();
  return (
    <>
      <div id="loginBG"></div>
      <div id="lgwrapper">
        <div class="loginPageContainer">
          <div id="loginFlexBox">
            <div id="topIcon"></div>
            <form
              id="loginInputText"
              onSubmit={handleSubmit(handleLoginPassword)}
            >
              <div>
                <TextField
                  id="usernameInput"
                  label="Email Address"
                  autoComplete="email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  {...register("email")}
                />
              </div>
              <div>
                <TextField
                  id="pwdInput"
                  label="Password"
                  autoComplete="password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  {...register("password")}
                />
              </div>

              <Button
                id="loginSubmitBtn"
                margin="normal"
                type="submit"
                style={{ fontFamily: "Nunito", marginTop: "20px" }}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
            <div class="divTextWrap" id="forgotPwd">
              <a href="#">
                <p>Forgot password?</p>
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

        <div id="signupcontainer">
          <p>
            No account? Sign up{" "}
            <a href="/signup">
              <u>here</u>
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default withRouter(LoginForm);
