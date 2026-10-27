import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout.jsx'
import { downloadCsv } from '../../utils/downloadCsv.js'
import { downloadPdf } from '../../utils/downloadPdf.js'
import '../../styles/pages/TalentShow.css'

const apiUrl = import.meta.env.VITE_TALENT_SHOW_API

const applicationFields = [
  ['childName', 'Child Name'],
  ['contactNo', 'Contact No'],
  ['parentName', 'Parent Name'],
  ['age', 'Age'],
  ['city', 'City'],
]

function getValue(record, ...keys) {
  const key = keys.find((candidate) => record[candidate] !== undefined)
  return key ? record[key] : ''
}

function normalizeApplication(record, index) {
  const rawStatus = getValue(record, 'status', 'is_active', 'active')
  const active =
    typeof rawStatus === 'string'
      ? !['inactive', 'disabled', '0', 'false'].includes(rawStatus.toLowerCase())
      : rawStatus === undefined
        ? true
        : Boolean(rawStatus)

  return {
    id: getValue(record, 'id') || `application-${index}`,
    childName: getValue(record, 'childName', 'child_name', 'full_name', 'name'),
    contactNo: getValue(
      record,
      'contactNo',
      'contact_no',
      'mobile_number',
      'contact',
    ),
    parentName: getValue(record, 'parentName', 'parent_name', 'guardian_name'),
    age: getValue(record, 'age', 'child_age'),
    city: getValue(record, 'city', 'parent_city'),
    active,
  }
}

function getApplicationList(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.applications)) {
    return payload.applications
  }

  throw new Error('The Talent Show API returned an unsupported response format.')
}

function TalentShow() {
  const { pathname } = useLocation()
  const statusFilter = pathname.endsWith('/inactive') ? 'inactive' : 'active'
  const [applications, setApplications] = useState([])
  const [search, setSearch] = useState('')
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loading, setLoading] = useState(Boolean(apiUrl))

  useEffect(() => {
    if (!apiUrl) {
      return undefined
    }

    const controller = new AbortController()

    async function loadApplications() {
      setLoading(true)

      try {
        const requestUrl = new URL(apiUrl, window.location.origin)
        requestUrl.searchParams.set('status', statusFilter)
        const response = await fetch(requestUrl, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Unable to load Talent Show applications (HTTP ${response.status}).`,
          )
        }

        const payload = await response.json()
        const records = getApplicationList(payload)
        setApplications(records.map(normalizeApplication))
        setLoading(false)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Unable to load Talent Show applications.', error)
          setApplications([])
          setLoading(false)
        }
      }
    }

    loadApplications()
    return () => controller.abort()
  }, [statusFilter])

  const visibleApplications = useMemo(() => {
    const query = search.trim().toLowerCase()

    return applications.filter((application) => {
      const matchesStatus = application.active === (statusFilter === 'active')
      const matchesQuery =
        !query ||
        [
          application.childName,
          application.contactNo,
          application.parentName,
          application.age,
          application.city,
        ].some((value) => String(value).toLowerCase().includes(query))

      return matchesStatus && matchesQuery
    })
  }, [applications, search, statusFilter])

  function resetFilters() {
    setSearch('')
  }

  function exportExcel() {
    downloadCsv(
      'talent-show-applications.csv',
      applicationFields.map(([, label]) => label),
      visibleApplications.map((application) =>
        applicationFields.map(([field]) => application[field]),
      ),
    )
  }

  function exportPdf() {
    downloadPdf(
      'talent-show-applications.pdf',
      'Talent Show Applications',
      applicationFields.map(([, label]) => label),
      visibleApplications.map((application) =>
        applicationFields.map(([field]) => application[field]),
      ),
    )
  }

  return (
    <AdminLayout
      pageClass={`talent-show-admin${statusFilter === 'inactive' ? ' is-inactive' : ''}`}
    >
      <main className="dashboard-main talent-show-main">
        <header className="talent-show-header">
          <h1>
            <span aria-hidden="true">
              {statusFilter === 'inactive' ? '⏸️' : '🏆'}
            </span>
            {statusFilter === 'inactive'
              ? 'Inactive Talent Show Applications'
              : 'Manage Talent Show Applications'}
          </h1>
          <div className="talent-show-toolbar" aria-label="Application actions">
            <Link
              className={`talent-show-button talent-show-button-active${statusFilter === 'active' ? ' is-selected' : ''}`}
              to="/admin/talent-show"
              aria-current={statusFilter === 'active' ? 'page' : undefined}
            >
              ✅ Active
            </Link>
            <Link
              className={`talent-show-button talent-show-button-inactive${statusFilter === 'inactive' ? ' is-selected' : ''}`}
              to="/admin/talent-show/inactive"
              aria-current={statusFilter === 'inactive' ? 'page' : undefined}
            >
              ⏸️ Inactive
            </Link>
            {statusFilter === 'active' && <Link
              className="talent-show-button talent-show-button-add"
              to="/admin/talent-show/create"
            >
              ➕ Add New
            </Link>}
            {statusFilter === 'active' && <button
              type="button"
              className="talent-show-button talent-show-button-excel"
              onClick={exportExcel}
              disabled={loading}
            >
              📊 Export Excel
            </button>}
            {statusFilter === 'active' && <button
              type="button"
              className="talent-show-button talent-show-button-pdf"
              onClick={exportPdf}
              disabled={loading}
            >
              📄 Export PDF
            </button>}
          </div>
        </header>

        <section className="talent-show-card" aria-label="Talent Show applications">
          <form
            className="talent-show-search"
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <label className="talent-show-sr-only" htmlFor="talent-show-search">
              Search applications
            </label>
            <input
              id="talent-show-search"
              type="search"
              placeholder="Search by child name, age, city or contact..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="talent-show-button talent-show-button-search"
              disabled={loading}
            >
              🔍 Search
            </button>
            <button
              type="button"
              className="talent-show-button talent-show-button-reset"
              onClick={resetFilters}
            >
              ✕ Reset
            </button>
          </form>

          <div className="talent-show-table-scroll">
            <table className="talent-show-table">
              <thead>
                <tr>
                  <th scope="col">Child Name</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Parent Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">City</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="talent-show-empty" colSpan="6">
                      Loading Talent Show applications...
                    </td>
                  </tr>
                ) : visibleApplications.length > 0 ? (
                  visibleApplications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.childName}</td>
                      <td>{application.contactNo}</td>
                      <td>{application.parentName}</td>
                      <td>{application.age}</td>
                      <td>{application.city}</td>
                      <td>
                        <div className="talent-show-row-actions">
                          <button
                            type="button"
                            className="talent-show-button talent-show-button-view"
                            onClick={() => setSelectedApplication(application)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="talent-show-button talent-show-button-edit"
                            disabled
                            title="Connect an update-application API to enable this action."
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="talent-show-button talent-show-button-deactivate"
                            disabled
                            title="Connect a status-update API to enable this action."
                          >
                            {application.active ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="talent-show-empty" colSpan="6">
                      No {statusFilter} applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {selectedApplication && (
        <div
          className="talent-show-modal-backdrop"
          onClick={() => setSelectedApplication(null)}
          role="presentation"
        >
          <section
            className="talent-show-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="talent-show-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="talent-show-modal-heading">
              <h2 id="talent-show-modal-title">Application Details</h2>
              <button
                type="button"
                className="talent-show-modal-close"
                onClick={() => setSelectedApplication(null)}
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <dl className="talent-show-details">
              {applicationFields.map(([field, label]) => (
                <div key={field}>
                  <dt>{label}</dt>
                  <dd>{selectedApplication[field]}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}
    </AdminLayout>
  )
}

export default TalentShow
