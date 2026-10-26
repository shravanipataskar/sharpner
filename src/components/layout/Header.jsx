import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Collaborate', to: '/collaborate' },
  { label: 'Creative Lab', to: '/creative-lab' },
  { label: 'Gallery', to: '/gallery' },
]

function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isBrandDealsPage = pathname === '/collaborate'
  const isLegalPage = pathname === '/legal' || pathname === '/terms-conditions'

  if (isBrandDealsPage || isLegalPage) {
    const headerClass = isLegalPage ? 'legal-site-header' : 'brand-deals-header'

    return (
      <header className={`site-header ${headerClass}`}>
        <Link
          className={isLegalPage ? 'legal-site-logo' : 'brand-deals-logo'}
          to="/"
          aria-label="Sharpner home"
        >
          <img src="/assets/images/Logo3.png" alt="Sharpner" />
        </Link>
        <button
          className={isLegalPage ? 'legal-menu-toggle' : 'brand-deals-menu-toggle'}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={isLegalPage ? 'legal-navigation' : 'brand-deals-navigation'}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          id={isLegalPage ? 'legal-navigation' : 'brand-deals-navigation'}
          aria-label="Main navigation"
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/collaborate" onClick={() => setMenuOpen(false)}>
            Brand Deals
          </NavLink>
        </nav>
      </header>
    )
  }

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
