/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
export default function BlurOffPage() {
  return (
    <>
      <div id="blurBlanket">
        <div id="limitText">
          <h1>
            <Link href="/">Quark</Link>
          </h1>
          <br></br>
          <div id="blurBlanketTextContainer">
            <p>
              Big ideas💡 require bigger screens! Try again on a larger
              screen...🙈Sorry!
            </p>
            <br></br>
            <br></br>
            <br></br>
            <div className="blurOffDirText">
              <Link href="/">
                <u>Home</u>
              </Link>
            </div>
            <div className="blurOffDirText">
              <Link href="/about">
                <u>About</u>
              </Link>
            </div>
            <div className="blurOffDirText">
              <Link href="/develop">
                <u>Develop with Us</u>
              </Link>
            </div>
            <div className="blurOffDirText">
              <Link href="/feedback">
                <u>Feedback</u>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
