import Container from "./HomeContainer";
import "../css/Footer.css";

export default function Footer(props) {
  return (
    <Container id={props.id}>
      <div id="flexrow">
        <div class="footerBox">
          <div id="quarklogo"></div>
          <div id="footerSocialLinks">
            <a href="https://www.instagram.com/quark.bz/">
              <div class="linkItem">
                <i class="fab fa-instagram fa-2x"></i>
                <p>Quark.bz</p>
              </div>
            </a>
            <a href="https://github.com/quark-bz">
              <div class="linkItem">
                <i class="fab fa-github fa-2x"></i>
                <p>Quark-bz</p>
              </div>
            </a>
          </div>
        </div>
        <div class="footerBox">
          <div id="sitemapContainer">
            <div class="sitemap">
              <a href="/">
                <p>Home</p>
              </a>
            </div>
            <div class="sitemap">
              <a href="/about">
                <p>About</p>
              </a>
            </div>
            <div class="sitemap">
              <a href="/develop">
                <p>Develop with Us</p>
              </a>
            </div>
            <div class="sitemap">
              <a href="/feedback">
                <p>Feedback</p>
              </a>
            </div>
          </div>
        </div>
        <div class="footerBox"></div>
      </div>
      <div id="copyrightText">
        <p>© 2021 Quark.bz</p>
      </div>
    </Container>
  );
}
