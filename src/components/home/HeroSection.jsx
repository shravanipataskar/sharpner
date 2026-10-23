import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="home-hero">
      <p className="eyebrow">A space to create together</p>
      <h1>Big ideas grow better together.</h1>
      <p className="hero-copy">
        Sharpner brings curious people together to share ideas, explore
        creativity, and build meaningful experiences.
      </p>
      <div className="hero-actions">
        <Link className="button" to="/submit-idea">
          Share an idea
        </Link>
        <Link className="text-link" to="/about">
          Get to know us
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
