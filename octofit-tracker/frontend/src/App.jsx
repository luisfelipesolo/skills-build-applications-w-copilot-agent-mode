import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for teams</h1>
              <p className="lead text-muted mb-4">
                Build workouts, track activity, and compete on a shared leaderboard with a multi-tier app foundation.
              </p>
              <div className="d-flex gap-3">
                <a className="btn btn-primary" href="http://localhost:8000/api/health">
                  Check API Health
                </a>
                <a className="btn btn-outline-secondary" href="https://vitejs.dev/" target="_blank" rel="noreferrer">
                  Vite Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
