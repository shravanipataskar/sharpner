import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading.jsx'

const opportunities = [
  { title: 'Share an idea', description: 'Bring a thought or project to life.', to: '/submit-idea' },
  { title: 'Join the community', description: 'Meet people who love making things.', to: '/join-community' },
  { title: 'Give an audition', description: 'Show us what you can do.', to: '/give-audition' },
]

function OpportunitiesSection() {
  return (
    <section className="content-section">
      <SectionHeading
        eyebrow="Get involved"
        title="Find your way in"
        description="Whether you have an idea, a skill, or just a little curiosity, there’s a place for you here."
      />
      <div className="card-grid">
        {opportunities.map((opportunity) => (
          <Link className="content-card" key={opportunity.to} to={opportunity.to}>
            <h3>{opportunity.title}</h3>
            <p>{opportunity.description}</p>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default OpportunitiesSection
