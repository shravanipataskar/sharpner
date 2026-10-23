import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <Link className="site-brand" to="/">
        sharpner<span>.</span>
      </Link>
      <p>Ideas, creativity, and community.</p>
      <Link to="/legal">Legal information</Link>
    </footer>
  )
}

export default Footer
