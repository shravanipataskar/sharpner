import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Collaborate', to: '/collaborate' },
  { label: 'Creative Lab', to: '/creative-lab' },
  { label: 'Gallery', to: '/gallery' },
]

function Header() {
  return (
    <header className="site-header">
      <Link className="site-brand" to="/" aria-label="Sharpner home">
        sharpner<span>.</span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link className="button button-small" to="/join-community">
        Join us
      </Link>
    </header>
  )
}

export default Header
