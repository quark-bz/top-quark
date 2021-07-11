/* eslint-disable @next/next/link-passhref */
import Container from "./home/HomeContainer";
// import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function Footer(props) {
  return (
    <Container id={props.id}>
      <div id="flexrow">
        <div className="footerBox">
          <div id="quarklogo"></div>
          <div id="footerSocialLinks">
            <a href="https://www.instagram.com/quark.bz/">
              <div className="linkItem">
                <i className="fab fa-instagram fa-2x" />
                <p>Quark.bz</p>
              </div>
            </a>
            <Link href="https://github.com/quark-bz">
              <div className="linkItem">
                <i className="fab fa-github fa-2x"></i>
                <p>Quark-bz</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="footerBox">
          <div id="sitemapContainer">
            <div className="sitemap">
              <Link href="/">
                <p>Home</p>
              </Link>
            </div>
            <div className="sitemap">
              <Link href="/about">
                <p>About</p>
              </Link>
            </div>
            <div className="sitemap">
              <Link href="/develop">
                <p>Develop with Us</p>
              </Link>
            </div>
            <div className="sitemap">
              <Link href="/feedback">
                <p>Feedback</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="footerBox"></div>
      </div>
      <div id="copyrightText">
        <p>© 2021 Quark.bz</p>
      </div>
    </Container>
  );
}
