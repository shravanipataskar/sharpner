import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout.jsx'
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
  const [applications, setApplications] = useState([])
  const [statusFilter, setStatusFilter] = useState('active')
  const [search, setSearch] = useState('')
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loadState, setLoadState] = useState({
    loading: Boolean(apiUrl),
    error: apiUrl
      ? ''
      : 'Talent Show data is not connected. Set VITE_TALENT_SHOW_API to the database-backed applications endpoint.',
  })

  useEffect(() => {
    if (!apiUrl) {
      return undefined
    }

    const controller = new AbortController()

    async function loadApplications() {
      setLoadState({ loading: true, error: '' })

      try {
        const response = await fetch(apiUrl, {
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
        setLoadState({ loading: false, error: '' })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoadState({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Unable to load Talent Show applications.',
          })
        }
      }
    }

    loadApplications()
    return () => controller.abort()
  }, [])

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
    setStatusFilter('active')
  }

  function exportExcel() {
    const columns = ['Child Name', 'Contact No', 'Parent Name', 'Age', 'City']
    const rows = visibleApplications.map((application) =>
      applicationFields.map(([field]) => application[field]),
    )
    const csv = [columns, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','),
      )
      .join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'talent-show-applications.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout pageClass="talent-show-admin">
      <main className="dashboard-main talent-show-main">
        <header className="talent-show-header">
          <h1>
            <span aria-hidden="true">🏆</span>
            Manage Talent Show Applications
          </h1>
          <div className="talent-show-toolbar" aria-label="Application actions">
            <button
              type="button"
              className={`talent-show-button talent-show-button-active${statusFilter === 'active' ? ' is-selected' : ''}`}
              onClick={() => setStatusFilter('active')}
              aria-pressed={statusFilter === 'active'}
            >
              ✅ Active
            </button>
            <button
              type="button"
              className={`talent-show-button talent-show-button-inactive${statusFilter === 'inactive' ? ' is-selected' : ''}`}
              onClick={() => setStatusFilter('inactive')}
              aria-pressed={statusFilter === 'inactive'}
            >
              ⏸️ Inactive
            </button>
            <button
              type="button"
              className="talent-show-button talent-show-button-add"
              disabled
              title="Connect a create-application API to enable this action."
            >
              ➕ Add New
            </button>
            <button
              type="button"
              className="talent-show-button talent-show-button-excel"
              onClick={exportExcel}
              disabled={visibleApplications.length === 0}
            >
              📊 Export Excel
            </button>
            <button
              type="button"
              className="talent-show-button talent-show-button-pdf"
              onClick={() => window.print()}
              disabled={visibleApplications.length === 0}
            >
              📄 Export PDF
            </button>
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
              disabled={loadState.loading || Boolean(loadState.error)}
            />
            <button
              type="submit"
              className="talent-show-button talent-show-button-search"
              disabled={loadState.loading || Boolean(loadState.error)}
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

          {loadState.error && (
            <p className="talent-show-data-message is-error" role="alert">
              {loadState.error}
            </p>
          )}

          {!loadState.error && !loadState.loading && (
            <p className="talent-show-data-message">
              Add, edit, and activation changes require the corresponding
              database write API; this page does not save local-only changes.
            </p>
          )}

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
                {loadState.loading ? (
                  <tr>
                    <td className="talent-show-empty" colSpan="6">
                      Loading Talent Show applications...
                    </td>
                  </tr>
                ) : loadState.error ? (
                  <tr>
                    <td className="talent-show-empty" colSpan="6">
                      No database records are displayed until the API is
                      configured.
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
