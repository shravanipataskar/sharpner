import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/Dashboard.css";

const navigationItems = [
{ icon: "▦", label: "Dashboard", path: "/dashboard" },
{ icon: "▱", label: "Videos & Shorts", path: "/admin/videos" },
{ icon: "☻", label: "Auditions", path: "/admin/auditions" },
{ icon: "⊕", label: "Dhol Pathak", path: "/admin/dhol-pathak" },
{ icon: "☆", label: "Talent Show", path: "/admin/talent-shows" },
{ icon: "ⓘ", label: "Creative Ideas", path: "/admin/creative-ideas" },
{ icon: "♙", label: "Brand Deals", path: "/admin/brand-deals" },
{ icon: "▤", label: "Tickets", path: "/admin/tickets" },
{ icon: "♧", label: "Users", path: "/admin/users" },
];

const statisticSections = [
{
title: "👥 Users",
columns: 3,
cards: [
{ label: "TOTAL USERS", value: "3" },
{ label: "ACTIVE USERS", value: "2" },
{ label: "INACTIVE USERS", value: "1" },
],
},
{
title: "🎬 Videos & Shorts",
columns: 3,
cards: [
{ label: "TOTAL VIDEOS", value: "4" },
{ label: "TOTAL SHORTS", value: "4" },
{ label: "ACTIVE CONTENT", value: "6" },
],
},
{
title: "📝 Submissions",
columns: 4,
cards: [
{ label: "CHILD AUDITIONS", value: "42" },
{ label: "DHOL PATHAK", value: "3072" },
{ label: "TALENT SHOWS", value: "7" },
{ label: "CREATIVE IDEAS", value: "20" },
{ label: "BRAND DEALS", value: "29" },
],
},
];

export default function Dashboard() {
const [sidebarOpen, setSidebarOpen] = useState(false);

const handleSignOut = () => {
const confirmed = window.confirm("Are you sure you want to sign out?");


if (confirmed) {
  window.location.href = "/login";
}


};

return ( <div className="sharpner-dashboard">
<button
type="button"
className="dashboard-mobile-toggle"
onClick={() => setSidebarOpen(!sidebarOpen)}
aria-label="Toggle navigation"
aria-expanded={sidebarOpen}
>
☰ </button>


  {sidebarOpen && (
    <button
      type="button"
      className="dashboard-sidebar-backdrop"
      onClick={() => setSidebarOpen(false)}
      aria-label="Close navigation"
    />
  )}

  <aside
    className={`dashboard-sidebar ${
      sidebarOpen ? "dashboard-sidebar-open" : ""
    }`}
  >
    <div className="dashboard-sidebar-brand">
      <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>
        SHARPNER
      </Link>
    </div>

    <nav className="dashboard-navigation">
      {navigationItems.map((item, index) => (
        <Link
          key={item.label}
          to={item.path}
          onClick={() => setSidebarOpen(false)}
          className={`dashboard-nav-link ${
            index === 0 ? "dashboard-nav-active" : ""
          }`}
        >
          <span className="dashboard-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}

      <button
        type="button"
        className="dashboard-signout"
        onClick={handleSignOut}
      >
        <span>⇥</span>
        Sign Out
      </button>
    </nav>
  </aside>

  <main className="dashboard-main">
    <header className="dashboard-header">
      <h1>
        <span>📊</span>
        Admin Dashboard
      </h1>
    </header>

    {statisticSections.map((section) => (
      <section className="dashboard-section" key={section.title}>
        <div className="dashboard-section-heading">
          <h2>{section.title}</h2>
        </div>

        <div
          className={`dashboard-stat-grid ${
            section.columns === 3
              ? "dashboard-grid-3"
              : "dashboard-grid-4"
          }`}
        >
          {section.cards.map((card) => (
            <article className="dashboard-stat-card" key={card.label}>
              <h3>{card.label}</h3>
              <p>{card.value}</p>
            </article>
          ))}
        </div>
      </section>
    ))}

    <section className="dashboard-section dashboard-quick-section">
      <div className="dashboard-section-heading">
        <h2>⚡ Quick Actions</h2>
      </div>

      <div className="dashboard-quick-actions">
        <Link
          to="/admin/videos"
          className="dashboard-action dashboard-action-blue"
        >
          🎬 Manage Videos
        </Link>

        <Link
          to="/admin/videos"
          className="dashboard-action dashboard-action-gray"
        >
          ➕ Add New Video
        </Link>

        <Link
          to="/admin/videos"
          className="dashboard-action dashboard-action-yellow"
        >
          ▣ Inactive Content
        </Link>
      </div>
    </section>
  </main>
</div>


);
}
