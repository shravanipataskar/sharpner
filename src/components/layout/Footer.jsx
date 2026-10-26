import { Link, useLocation } from 'react-router-dom'

function Footer() {
  const { pathname } = useLocation()
  const isBrandDealsPage = pathname === '/collaborate'

  return (
    <footer className={`footer-section${isBrandDealsPage ? ' brand-deals-footer' : ''}`}>
      <div className="footer-main">
        <div className="footer-brand">
          <h4>
            {isBrandDealsPage ? (
              <span>Sharpner World</span>
            ) : (
              <><strong>Sharpner</strong> <span>World</span></>
            )}
          </h4>
          <p>A Movement Of Little Ones With Big Dreams</p>
        </div>

        <div className="footer-follow">
          <span>Follow Us</span>
          <a href="https://www.youtube.com/@sharpnerWorld" target="_blank" rel="noopener noreferrer" aria-label="Sharpner World on YouTube">
            <i className="fab fa-youtube" aria-hidden="true"></i>
          </a>
          <a href="https://www.instagram.com/sharpnerworld/" target="_blank" rel="noopener noreferrer" aria-label="Sharpner World on Instagram">
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Sharpner World on Facebook">
            <i className="fab fa-facebook-f" aria-hidden="true"></i>
          </a>
        </div>

        <nav className="footer-links" aria-label="Policies">
          {isBrandDealsPage ? (
            <>
              <Link to="/legal">Privacy Policy</Link>
              <Link to="/legal">Terms &amp; Conditions</Link>
               <Link to="/child-safety-policy">Child Safety Policy</Link>
              <Link to="/community-guidelines">Community Guidelines</Link>
            </>
          ) : (
            <>
              <Link to="/legal">Privacy<br />Policy</Link>
              <Link to="/legal">Terms &amp;<br />Conditions</Link>
              <Link to="/child-safety-policy">Child Safety Policy</Link>
              <Link to="/community-guidelines">Community Guidelines</Link>
            </>
          )}
        </nav>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 {isBrandDealsPage ? 'AayojanAI' : 'Aayojan.AI'}. All Rights Reserved.
        </span>
        <span>
          Developed By <a href={isBrandDealsPage ? 'https://aayojanai.com' : 'https://aayojan.ai/'}>
            AayojanAI
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
