const faqItems = [
  'Is there any registration fee?',
  'Are parents allowed during shoots?',
  'Is the Creative Lab paid?',
  'Can selected creators become part of the core team later?',
  'Is prior experience necessary?',
]

const whatWeDoItems = [
  { icon: 'fa-solid fa-film', label: <>Kids Acting<br />Content</> },
  { icon: 'fa-solid fa-book-open', label: <>Storytelling<br />Reels</> },
  { icon: 'fa-solid fa-flask', label: <>Educational<br />Experiments</> },
  { icon: 'fa-solid fa-lightbulb', label: <>Creative Lab<br />Training</> },
  { icon: 'fa-solid fa-users', label: <>Community<br />Collaboration</> },
  { icon: 'fa-solid fa-microphone-lines', label: <>Offline Shows</> },
]

function WhatFaqSection() {
  return (
    <section className="whatfaq-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="what-banner">
              <img src="/assets/images/panel_community.png" alt="" />
              <div className="what-overlay">
                <h2>What We Do</h2>
                <div className="what-items">
                  {whatWeDoItems.map((item) => (
                    <div className="what-item" key={item.icon}>
                      <i className={item.icon} aria-hidden="true"></i>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="faq-card">
              <div className="section-header">
                <h2>Frequently Asked Questions</h2>
                <p>Everything you need to know about joining the Sharpner Creative Lab.</p>
              </div>
              <div className="faq-wrapper">
                <div className="faq-left">
                  {faqItems.map((question) => (
                    <details className="faq-item" key={question}>
                      <summary className="faq-question">{question}</summary>
                      <div className="faq-answer">
                        <p>Get in touch with our team and we’ll be happy to help.</p>
                      </div>
                    </details>
                  ))}
                </div>
                <div className="faq-right">
                  <img src="/assets/images/ChatGPT Image Jun 11, 2026, 04_38_55 PM.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatFaqSection
