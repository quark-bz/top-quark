/* eslint-disable @next/next/link-passhref */
// import "../../css/login.css";
// import { SignInWithGoogle } from "../firebase";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginForm = ({}) => {
  const { loginGoogle, loginPassword, currentUser } = useAuth();
  const router = useRouter();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      if (currentUser) {
        if (currentUser?.registered) {
          router.push("/");
        } else {
          router.push("/register");
        }
      }
    }
  }, [currentUser, router, submit]);

  const handleLoginGoogle = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await loginGoogle();
        setSubmit(true);
      } catch (error) {
        alert(error);
      }
    },
    [loginGoogle]
  );

  const handleLoginPassword = async (data) => {
    try {
      await loginPassword(data.email, data.password);
      setSubmit(true);
    } catch (error) {
      alert(error);
    }
  };
  const { register, handleSubmit } = useForm();
  return (
    <>
      <div id="loginBG"></div>
      <div id="lgwrapper">
        <div className="loginPageContainer">
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
            <div className="divTextWrap" id="forgotPwd">
              <a href="#">
                <p>Forgot password?</p>
              </a>
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
              <Link id="homeAref" href="/">
                <i className="fas fa-home"></i>
              </Link>
            </div>
          </div>
        </div>

        <div id="signupcontainer">
          <p>
            No account? Sign up{" "}
            <Link href="/signup">
              <u>here</u>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
