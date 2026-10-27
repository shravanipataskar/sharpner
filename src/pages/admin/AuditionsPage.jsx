import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/AuditionsPage.css";

const navigationItems = [
{ icon: "▦", label: "Dashboard", path: "/dashboard" },
{ icon: "▣", label: "Videos & Shorts", path: "/admin/videos" },
{ icon: "☻", label: "Auditions", path: "/admin/auditions" },
{ icon: "⊕", label: "Dhol Pathak", path: "/admin/dhol-pathak" },
{ icon: "☆", label: "Talent Show", path: "/admin/talent-shows" },
{ icon: "ⓘ", label: "Creative Ideas", path: "/admin/creative-ideas" },
{ icon: "♙", label: "Brand Deals", path: "/admin/brand-deals" },
{ icon: "▤", label: "Tickets", path: "/admin/tickets" },
];

export default function AuditionsPage() {
const [search, setSearch] = useState("");
const [status, setStatus] = useState("Active");
const [currentPage, setCurrentPage] = useState(1);
const [sidebarOpen, setSidebarOpen] = useState(false);

// No database records are displayed yet.
const auditions = [];

const handleReset = () => {
setSearch("");
setStatus("Active");
setCurrentPage(1);
};

const handleSignOut = () => {
if (window.confirm("Are you sure you want to sign out?")) {
window.location.href = "/login";
}
};

return ( <div className="sharpner-auditions-page">
<button
className="auditions-mobile-toggle"
type="button"
onClick={() => setSidebarOpen(!sidebarOpen)}
aria-label="Toggle navigation"
>
☰ </button>


  {sidebarOpen && (
    <button
      className="auditions-sidebar-backdrop"
      type="button"
      aria-label="Close navigation"
      onClick={() => setSidebarOpen(false)}
    />
  )}

  {/* Sidebar */}
  <aside
    className={`auditions-sidebar ${
      sidebarOpen ? "auditions-sidebar-open" : ""
    }`}
  >
    <div className="auditions-sidebar-brand">
      <Link to="/dashboard">SHARPNER</Link>
    </div>

    <nav className="auditions-navigation">
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          onClick={() => setSidebarOpen(false)}
          className={`auditions-nav-link ${
            item.path === "/admin/auditions"
              ? "auditions-nav-active"
              : ""
          }`}
        >
          <span className="auditions-nav-icon">{item.icon}</span>
          {item.label}
        </Link>
      ))}

      <button
        type="button"
        className="auditions-signout"
        onClick={handleSignOut}
      >
        <span>⇥</span>
        Sign Out
      </button>
    </nav>
  </aside>

  {/* Main content */}
  <main className="auditions-main">
    <header className="auditions-header">
      <h1>
        <span className="auditions-title-icon">🎭</span>
        Manage Auditions
       
      </h1>

      <div className="auditions-header-actions">
        <button
          type="button"
          className={`auditions-status-button ${
            status === "Active" ? "auditions-status-selected" : ""
          }`}
          onClick={() => setStatus("Active")}
        >
          ☑ Active
        </button>

        <button
          type="button"
          className={`auditions-inactive-button ${
            status === "Inactive" ? "auditions-inactive-selected" : ""
          }`}
          onClick={() => setStatus("Inactive")}
        >
          ⏸ Inactive
        </button>

         <Link
  to="/admin/auditions/create"
  className="auditions-add-new-button"
>
  <span>＋</span> Add New
</Link>

        <button
          type="button"
          className="auditions-export-excel"
          onClick={() =>
            window.alert("Excel export will be available when connected.")
          }
        >
          📊 Export Excel
        </button>

        <button
          type="button"
          className="auditions-export-pdf"
          onClick={() =>
            window.alert("PDF export will be available when connected.")
          }
        >
          📄 Export PDF
        </button>
      </div>
    </header>

    <section className="auditions-content-card">
      {/* Search */}
      <form
        className="auditions-search-form"
        onSubmit={(event) => {
          event.preventDefault();
          setCurrentPage(1);
        }}
      >
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, city or mobile..."
          aria-label="Search auditions by name, city or mobile"
        />

        <button type="submit" className="auditions-search-button">
          <span>⌕</span>
          Search
        </button>

        <button
          type="button"
          className="auditions-reset-button"
          onClick={handleReset}
        >
          <span>×</span>
          Reset
        </button>
      </form>

      {/* Table */}
      <div className="auditions-table-wrapper">
        <table className="auditions-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile No</th>
              <th>Age</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {auditions.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="auditions-empty-cell"
                >
                  {/* Intentionally empty: database records are not shown. */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="auditions-pagination">
        <button
          type="button"
          className="auditions-page-button auditions-page-disabled"
          disabled
          aria-label="Previous page"
        >
          ‹
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            type="button"
            key={page}
            className={`auditions-page-button ${
              currentPage === page ? "auditions-page-current" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="auditions-page-button"
          onClick={() => setCurrentPage((page) => page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </section>
  </main>
</div>


);
}
