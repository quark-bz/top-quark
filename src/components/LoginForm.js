import '../css/login.css'

//styling only, to add in functions and auth
export default function LoginForm(){
    return(
        <>
        <div id='loginBG'></div>
        <div class='loginPageContainer'>
            <div id='loginFlexBox'>
                <div id='topIcon'>
                    
                </div>
                <div id='loginInputText'>
                    <div id='usernameInput'><input type="text" class='loginInputClass' placeholder=" Username / E-mail"></input></div>
                    <div id='pwdInput'><input type='password' placeholder=" Password" class='loginInputClass'></input></div>
                </div>
                    <button id='submitBtn'type="submit">Log in</button>
                    <div class='divTextWrap' id='forgotPwd'><a href='#'><p>Forgot password?</p></a></div>
                <div id='horizontalLineSep'>
                    <hr class='orSepLn'></hr>
                    <p>or with</p>
                    <hr class='orSepLn'></hr>
                </div>
                <div id='altLoginIcon'>
                    <i class="fab fa-google fa-2x"></i>
                    <i class="fab fa-github fa-2x"></i>
                    <i class="fab fa-facebook fa-2x"></i>
                </div>
                
                <div class='divTextWrap' id='skipText'><p><a id='homeAref'href='/home'><i class="fas fa-home"></i></a></p></div>
                </div>

        </div>
        </>
    )
}