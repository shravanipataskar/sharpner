
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/pages/VideosPage.css";

const navigationItems = [
  { icon: "▦", label: "Dashboard", path: "/dashboard" },
  { icon: "▣", label: "Videos & Shorts", path: "/admin/videos" },
  { icon: "☻", label: "Auditions", path: "/admin/auditions" },
  { icon: "⊕", label: "Dhol Pathak", path: "/admin/dhol-pathak" },
  { icon: "☆", label: "Talent Show", path: "/admin/talent-shows" },
  { icon: "ⓘ", label: "Creative Ideas", path: "/admin/creative-ideas" },
  { icon: "♙", label: "Brand Deals", path: "/admin/brand-deals" },
  { icon: "▤", label: "Tickets", path: "/admin/tickets" },
  { icon: "♧", label: "Users", path: "/admin/users" },
];

export default function VideosPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Intentionally empty until database integration is implemented.
  const videos = [];

  const resetFilters = () => {
    setSearchInput("");
    setStatusFilter("Active");
  };

  const handleSignOut = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");

    if (confirmed) {
      navigate("/login");
    }
  };

  return (
    <div className="sharpner-videos-page">
      {/* Mobile navigation toggle */}
      <button
        className="videos-mobile-toggle"
        type="button"
        onClick={() => setSidebarOpen((previous) => !previous)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          className="videos-sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`videos-sidebar ${
          sidebarOpen ? "videos-sidebar-open" : ""
        }`}
      >
        <div className="videos-sidebar-brand">
          <Link to="/dashboard">SHARPNER</Link>
        </div>

        <nav className="videos-navigation">
          {navigationItems.map((item) => {
            const isActive =
              item.path === "/admin/videos" &&
              location.pathname.startsWith("/admin/videos");

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`videos-nav-link ${
                  isActive ? "videos-nav-active" : ""
                }`}
              >
                <span className="videos-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            className="videos-signout"
            onClick={handleSignOut}
          >
            <span className="videos-signout-icon">⇥</span>
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="videos-main">
        {/* Header */}
        <header className="videos-header">
          <h1>
            <span className="videos-heading-icon">🤖</span>
            <span>Manage Videos &amp; Shorts</span>
          </h1>

          <div className="videos-header-actions">
            <button
              type="button"
              className={`videos-status-button videos-active-button ${
                statusFilter === "Active" ? "status-active" : ""
              }`}
              onClick={() => setStatusFilter("Active")}
            >
              ☑ Active
            </button>

            <button
              type="button"
              className={`videos-status-button videos-inactive-button ${
                statusFilter === "Inactive" ? "status-inactive" : ""
              }`}
              onClick={() => setStatusFilter("Inactive")}
            >
              ⏸ Inactive
            </button>

            <Link to="/videos/create" className="videos-add-new-link">
              <span>＋</span>
              Add New
            </Link>
          </div>
        </header>

        {/* Search and table container */}
        <section className="videos-content-card">
          {/* Search form */}
          <form
            className="videos-search-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search..."
              aria-label="Search videos"
            />

            <button type="submit" className="videos-search-button">
              <span className="videos-search-icon">⌕</span>
              Search
            </button>

            <button
              type="button"
              className="videos-reset-button"
              onClick={resetFilters}
            >
              <span>×</span>
              Reset
            </button>
          </form>

          {/* Video table */}
          <div className="videos-table-wrapper">
            <table className="videos-table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Platform</th>
                  <th>Type</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="videos-empty-state">
                      No videos available.
                    </td>
                  </tr>
                ) : (
                  videos.map((video) => (
                    <tr key={video.id}>
                      <td>{video.title}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Result count */}
          <div className="videos-result-count">
            Showing {videos.length} videos
          </div>
        </section>
      </main>
    </div>
  );
}
