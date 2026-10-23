import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading.jsx'

const channels = [
  { title: 'Creative Lab', to: '/creative-lab' },
  { title: 'Dhol Pathak', to: '/join-dhol-pathak' },
  { title: 'Our Gallery', to: '/gallery' },
  { title: 'Collaborate', to: '/collaborate' },
]

function ChannelsSection() {
  return (
    <section className="content-section channels-section">
      <SectionHeading
        eyebrow="Explore"
        title="More ways to make something happen"
      />
      <div className="channel-list">
        {channels.map((channel) => (
          <Link key={channel.to} to={channel.to}>
            {channel.title}<span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ChannelsSection
