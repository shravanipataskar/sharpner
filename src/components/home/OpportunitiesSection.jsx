function OpportunitiesSection() {
  return (
    <section className="join-section">

      <div className="join-title-image">
        <img
          src="/assets/img/Let.png"
          alt="Let's Join Us"
        />
      </div>

      <div className="join-cards">

        <a href="/give-audition" className="join-card yellow-card">
          <div className="card-content">
            <h3>
              BE FEATURED <br />
              IN SHARPNER <br />
              VIDEOS
            </h3>
            <button>APPLY NOW</button>
          </div>
        </a>

        <a href="/join-dhol-pathak" className="join-card orange-card">
          <div className="card-content">
            <h3>
              JOIN THE <br />
              DHOL <br />
              PATHAK
            </h3>

            <button>JOIN NOW</button>
          </div>

          <img
            src="/assets/img/dhol.png"
            className="dhol-img"
            alt="Dhol Pathak"
          />
        </a>

        <a href="/submit-idea" className="join-card blue-card">
          <div className="card-content">
            <h3>
              SUBMIT YOUR <br />
              CREATIVE <br />
              IDEA
            </h3>

            <button>SUBMIT NOW</button>
          </div>

          <img
            src="/assets/img/creative.png"
            className="creative-img"
            alt="Creative"
          />
        </a>

      </div>

    </section>
  )
}

export default OpportunitiesSection