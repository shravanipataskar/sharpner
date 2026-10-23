import SectionHeading from '../common/SectionHeading.jsx'

function WhatFaqSection() {
  return (
    <section className="content-section faq-section">
      <SectionHeading
        eyebrow="A little about us"
        title="What is Sharpner?"
        description="A community for people who want to learn, create, and turn good ideas into shared experiences."
      />
      <details>
        <summary>Who can be part of the community?</summary>
        <p>
          Anyone with an interest in creating, collaborating, or supporting
          creative ideas is welcome.
        </p>
      </details>
      <details>
        <summary>How can I get involved?</summary>
        <p>
          Explore the opportunities above, share an idea, or get in touch to
          start a conversation.
        </p>
      </details>
    </section>
  )
}

export default WhatFaqSection
