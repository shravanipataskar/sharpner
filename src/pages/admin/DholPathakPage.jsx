import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/DholPathakPage.css";

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

const practiceDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const declarations = [
  "I understand the practice sessions will be held in Pune.",
  "I confirm that I will attend the 55-day practice discipline sincerely.",
  "I understand physical participation is required.",
  "I confirm that the information provided is true.",
];

const initialFormDate = new Date().toISOString().slice(0, 10);

export default function DholPathakPage() {
const [search, setSearch] = useState("");
const [status, setStatus] = useState("Active");
const [currentPage, setCurrentPage] = useState(1);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [showCreateForm, setShowCreateForm] = useState(false);
const [formData, setFormData] = useState({
  ageGroup: "",
  fullName: "",
  parentName: "",
  mobileNumber: "",
  city: "",
  address: "",
  schoolName: "",
  previousExperience: "",
  ownInstrument: "",
  medicalConditions: "",
  emergencyContact: "",
  weeklyAvailability: "",
  practiceDays: [],
  preferredLocation: "",
  declarations: [],
  signature: "",
  date: initialFormDate,
});

// Database records are intentionally not displayed.
const applications = [];

const handleReset = () => {
setSearch("");
setStatus("Active");
setCurrentPage(1);
};

const updateFormField = (event) => {
  const { name, value } = event.target;
  setFormData((previous) => ({ ...previous, [name]: value }));
};

const toggleFormSelection = (field, value) => {
  setFormData((previous) => ({
    ...previous,
    [field]: previous[field].includes(value)
      ? previous[field].filter((item) => item !== value)
      : [...previous[field], value],
  }));
};

const handleCreateSubmit = (event) => {
  event.preventDefault();
  if (formData.practiceDays.length < 4) {
    window.alert("Please select at least four available practice days.");
    return;
  }
  if (!event.currentTarget.reportValidity()) return;

  window.alert("Dhol Pathak application saving is not connected yet.");
};

const handleCancelCreate = () => {
  setShowCreateForm(false);
};

const handleSignOut = () => {
if (window.confirm("Are you sure you want to sign out?")) {
window.location.href = "/login";
}
};

return ( <div className="sharpner-dhol-page">
{/* Mobile menu */}
<button
type="button"
className="dhol-mobile-toggle"
onClick={() => setSidebarOpen((open) => !open)}
aria-label="Toggle navigation"
>
☰ </button>


  {sidebarOpen && (
    <button
      type="button"
      className="dhol-sidebar-backdrop"
      onClick={() => setSidebarOpen(false)}
      aria-label="Close navigation"
    />
  )}

  {/* Sidebar */}
  <aside
    className={`dhol-sidebar ${
      sidebarOpen ? "dhol-sidebar-open" : ""
    }`}
  >
    <div className="dhol-sidebar-brand">
      <Link to="/dashboard">SHARPNER</Link>
    </div>

    <nav className="dhol-navigation">
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          onClick={() => setSidebarOpen(false)}
          className={`dhol-nav-link ${
            item.path === "/admin/dhol-pathak"
              ? "dhol-nav-active"
              : ""
          }`}
        >
          <span className="dhol-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}

      <button
        type="button"
        className="dhol-signout"
        onClick={handleSignOut}
      >
        <span className="dhol-signout-icon">⇥</span>
        Sign Out
      </button>
    </nav>
  </aside>

  {/* Main content */}
  <main className="dhol-main">
    {showCreateForm ? (
      <>
        <header className="dhol-create-header">
          <h1><span>🥁</span> Add New Dhol Pathak Application</h1>
          <button type="button" className="dhol-back-button" onClick={handleCancelCreate}>
            ← Back
          </button>
        </header>

        <form className="dhol-create-card" onSubmit={handleCreateSubmit}>
          <section className="dhol-create-section dhol-age-section">
            <h2>Age Group</h2>
            <div className="dhol-create-radio-row">
              {["8-10", "11-14", "15-18", "18+"].map((age) => (
                <label key={age}>
                  <input
                    type="radio"
                    name="ageGroup"
                    value={age}
                    checked={formData.ageGroup === age}
                    onChange={updateFormField}
                    required
                  />
                  {age}
                </label>
              ))}
            </div>
          </section>

          <section className="dhol-create-section dhol-form-details-section">
            <h2>Form Details</h2>
            <div className="dhol-create-grid">
              <label className="dhol-create-field">
                <span>Full Name <b>*</b></span>
                <input name="fullName" value={formData.fullName} onChange={updateFormField} required />
              </label>
              <label className="dhol-create-field">
                <span>Parent Name <b>*</b></span>
                <input name="parentName" value={formData.parentName} onChange={updateFormField} required />
              </label>
              <label className="dhol-create-field">
                <span>Mobile Number <b>*</b></span>
                <input name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={updateFormField} required />
              </label>
              <label className="dhol-create-field">
                <span>City <b>*</b></span>
                <input name="city" value={formData.city} onChange={updateFormField} required />
              </label>
              <label className="dhol-create-field">
                <span>Address</span>
                <textarea name="address" value={formData.address} onChange={updateFormField} rows="4" />
              </label>
              <label className="dhol-create-field">
                <span>School / College Name</span>
                <input name="schoolName" value={formData.schoolName} onChange={updateFormField} />
              </label>
              <fieldset className="dhol-create-choice">
                <legend>Previous Dhol Experience? <span>*</span></legend>
                <div className="dhol-create-radio-row">
                  {["Yes", "No"].map((choice) => (
                    <label key={choice}>
                      <input type="radio" name="previousExperience" value={choice} checked={formData.previousExperience === choice} onChange={updateFormField} required />
                      {choice}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="dhol-create-choice">
                <legend>Can you bring your own instrument for Dhol Pathak? <span>*</span></legend>
                <div className="dhol-create-radio-row">
                  {["Yes", "No"].map((choice) => (
                    <label key={choice}>
                      <input type="radio" name="ownInstrument" value={choice} checked={formData.ownInstrument === choice} onChange={updateFormField} required />
                      {choice}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>

          <section className="dhol-create-section">
            <h2>Medical &amp; Safety</h2>
            <div className="dhol-create-grid dhol-medical-grid">
              <label className="dhol-create-field">
                <span>Medical Conditions (or write “None”) <b>*</b></span>
                <textarea name="medicalConditions" value={formData.medicalConditions} onChange={updateFormField} rows="4" required />
              </label>
              <div className="dhol-create-stack">
                <label className="dhol-create-field">
                  <span>Emergency Contact <b>*</b></span>
                  <input name="emergencyContact" type="tel" value={formData.emergencyContact} onChange={updateFormField} required />
                </label>
                <label className="dhol-create-field">
                  <span>Weekly Availability <b>*</b></span>
                  <select name="weeklyAvailability" value={formData.weeklyAvailability} onChange={updateFormField} required>
                    <option value="">Select Option</option>
                    <option>1-2 days per week</option>
                    <option>3-4 days per week</option>
                    <option>5-6 days per week</option>
                    <option>All days</option>
                  </select>
                </label>
              </div>
              <fieldset className="dhol-create-choice">
                <legend>Available Practice Days (Min 4) <span>*</span></legend>
                <div className="dhol-create-days">
                  {practiceDays.map((day) => (
                    <label key={day}>
                      <input type="checkbox" checked={formData.practiceDays.includes(day)} onChange={() => toggleFormSelection("practiceDays", day)} />
                      {day}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="dhol-create-choice">
                <legend>Preferred Location <span>*</span></legend>
                <div className="dhol-create-radio-row dhol-create-location">
                  {["Narayan Peth, Pune", "Navale Bridge, Pune"].map((location) => (
                    <label key={location}>
                      <input type="radio" name="preferredLocation" value={location} checked={formData.preferredLocation === location} onChange={updateFormField} required />
                      {location}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>

          <section className="dhol-create-section dhol-declaration-section">
            <h2>Declaration</h2>
            <div className="dhol-create-declarations">
              {declarations.map((declaration) => (
                <label key={declaration}>
                  <input type="checkbox" checked={formData.declarations.includes(declaration)} onChange={() => toggleFormSelection("declarations", declaration)} required={!formData.declarations.includes(declaration)} />
                  {declaration}
                </label>
              ))}
            </div>
            <div className="dhol-create-grid dhol-signature-fields">
              <label className="dhol-create-field">
                <span>Digital Signature (Parent Full Name) <b>*</b></span>
                <input name="signature" value={formData.signature} onChange={updateFormField} required />
              </label>
              <label className="dhol-create-field">
                <span>Date <b>*</b></span>
                <input name="date" type="date" value={formData.date} onChange={updateFormField} required />
              </label>
            </div>
          </section>

          <div className="dhol-create-actions">
            <button type="button" className="dhol-create-cancel" onClick={handleCancelCreate}>Cancel</button>
            <button type="submit" className="dhol-create-save">Save Application</button>
          </div>
        </form>
      </>
    ) : (
      <>
    <header className="dhol-header">
      <h1>
        <span className="dhol-title-icon">🥁</span>
        Manage Dhol Pathak Applications
      </h1>

      <div className="dhol-header-actions">
        <button
          type="button"
          className={`dhol-status-button ${status === "Active" ? "dhol-status-selected" : ""}`}
          onClick={() => setStatus("Active")}
        >
          ☑ Active
        </button>
        <button
          type="button"
          className={`dhol-inactive-button ${status === "Inactive" ? "dhol-inactive-selected" : ""}`}
          onClick={() => setStatus("Inactive")}
        >
          ⏸ Inactive
        </button>
        <button
          type="button"
          className="dhol-add-button"
          onClick={() => setShowCreateForm(true)}
        >
          <span>＋</span> Add New
        </button>
        <button
          type="button"
          className="dhol-export-excel"
          onClick={() =>
            window.alert("Excel export is not connected yet.")
          }
        >
          📊 Export Excel
        </button>

        <button
          type="button"
          className="dhol-export-pdf"
          onClick={() =>
            window.alert("PDF export is not connected yet.")
          }
        >
          📄 Export PDF
        </button>
      </div>
    </header>

    {/* Search and table container */}
    <section className="dhol-content-card">
      <form
        className="dhol-search-form"
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
          aria-label="Search Dhol Pathak applications"
        />

        <button type="submit" className="dhol-search-button">
          <span className="dhol-search-icon">⌕</span>
          Search
        </button>

        <button
          type="button"
          className="dhol-reset-button"
          onClick={handleReset}
        >
          <span>×</span>
          Reset
        </button>
      </form>

      {/* Empty table: no database records */}
      <div className="dhol-table-wrapper">
        <table className="dhol-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile No</th>
              <th>Parent Name</th>
              <th>City</th>
              <th>Age Group</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="dhol-empty-cell"
                >
                  {/* Intentionally blank until database integration. */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination matching the screenshot */}
      <nav className="dhol-pagination" aria-label="Pagination">
        <button
          type="button"
          className="dhol-page-button dhol-page-disabled"
          disabled
          aria-label="Previous page"
        >
          ‹
        </button>

        {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
          <button
            type="button"
            key={page}
            className={`dhol-page-button ${
              currentPage === page ? "dhol-page-current" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <span className="dhol-page-ellipsis">...</span>

        {[306, 307].map((page) => (
          <button
            type="button"
            key={page}
            className={`dhol-page-button ${
              currentPage === page ? "dhol-page-current" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="dhol-page-button"
          onClick={() =>
            setCurrentPage((page) => Math.min(page + 1, 307))
          }
          aria-label="Next page"
        >
          ›
        </button>
      </nav>
    </section>
      </>
    )}
  </main>
</div>


);
}
