function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-box container-fluid">

        <div className="hero-left">

          <div className="hero-logo">
            <img
              src="/assets/img/Logo3.png"
              alt="Sharpner Logo"
            />
          </div>

          <div className="left-tagline">
            Now, the little ones will speak... <br />
            and the elders will listen.
          </div>

          <div className="social-icons">
            <a
              href="https://www.youtube.com/@sharpnerWorld"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>

            <a
              href="https://www.instagram.com/sharpnerworld/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>500K+</strong>
              <span>Community</span>
            </div>

            <div>
              <strong>50M+</strong>
              <span>Monthly Reach</span>
            </div>

            <div>
              <strong>Millions</strong>
              <span>Smiles</span>
            </div>
          </div>

        </div>

        <div className="hero-center">
          <img
            src="/assets/img/Sharpner01.png"
            alt="Kids"
          />
        </div>

        <div className="hero-right">

          <div className="top-menu">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/collaborate">Brand Deals</a>
          </div>

          <div className="right-tagline">
            <img
              src="/assets/img/try.png"
              alt="A Movement Of Little Ones With Big Dreams"
              className="movement-text"
            />
          </div>

        </div>

      </div>
    </section>
  )
}

export default HeroSection