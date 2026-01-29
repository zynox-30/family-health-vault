import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Family Health Vault</h1>
        <p>Securely manage your family’s health records</p>
      </header>

      <main className="main">
        <div className="card">
          <h2>👨‍👩‍👧 Family Members</h2>
          <p>Add and manage health data for each family member.</p>
        </div>

        <div className="card">
          <h2>📄 Medical Reports</h2>
          <p>Upload and store prescriptions, lab reports, and scans.</p>
        </div>

        <div className="card">
          <h2>🔒 Secure Access</h2>
          <p>Your data stays private and protected.</p>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Family Health Vault</p>
      </footer>
    </div>
  );
}

export default App;
