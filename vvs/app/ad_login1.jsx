import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const backendUrl = "http://127.0.0.1:8000/api";

  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [newElection, setNewElection] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedSummaryElection, setSelectedSummaryElection] = useState("");
  const [summary, setSummary] = useState([]);

  // Fetch elections
  const fetchElections = async () => {
    try {
      const res = await axios.get(`${backendUrl}/elections/`);
      setElections(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSummary = async (electionId) => {
  try {
    const res = await axios.get(`${backendUrl}/election-results/${electionId}/`);
    setSummary(res.data);
  } catch (err) {
    console.log("Error fetching summary:", err);
    setSummary([]);
  }
};

  // Fetch candidates
  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${backendUrl}/candidates/`);
      setCandidates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create election
  const createElection = async () => {
    if (!newElection.trim()) return;
    try {
      await axios.post(`${backendUrl}/elections/`, { title: newElection });
      setNewElection("");
      fetchElections();
    } catch (err) {
      console.log(err);
    }
  };
  
  


  // Add candidate to election
  const addCandidate = async () => {
    if (!candidateName.trim() || !selectedElection) return;
    try {
      await axios.post(`${backendUrl}/candidates/`, {
        name: candidateName,
        party: candidateParty,
        election: selectedElection,
      });
      setCandidateName("");
      setCandidateParty("");
      fetchCandidates();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchElections();
    fetchCandidates();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", alignItems: "start" }}>
      {/* LEFT SIDE — Create Election + Add Candidate */}
      <div>
        <h2>Create Election</h2>
        <input
          type="text"
          placeholder="Election Title"
          value={newElection}
          onChange={(e) => setNewElection(e.target.value)}
          style={styles.input}
        />
        <button onClick={createElection} style={styles.loginBtn}>
          Create Election
        </button>

        <h2 style={{ marginTop: 40 }}>Add Candidates</h2>
        <select
          onChange={(e) => setSelectedElection(e.target.value)}
          style={styles.input }
        >
          <option>Select Election</option>
          {elections.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Party"
          value={candidateParty}
          onChange={(e) => setCandidateParty(e.target.value)}
          style={styles.input}
        />

        <button onClick={addCandidate} style={styles.loginBtn}>
          Add Candidate
        </button>
      </div>

      {/* CENTER — All Elections */}
      <div>
        <h2>All Elections</h2>
        {elections.map((el) => (
          <div
            key={el.id}
            style={{ padding: 10, marginTop: 10, border: "1px solid #ccc" }}
          >
            <b>{el.title}</b>
          </div>
        ))}
        
        <h2>Election Summary</h2>

<select
  value={selectedSummaryElection}
  onChange={(e) => {
    setSelectedSummaryElection(e.target.value);
    fetchSummary(e.target.value);
  }}
  style={{ padding: "8px", width: "100%", marginTop: "10px" }}
>
  <option value="">-- select election --</option>
  {elections.map((e) => (
    <option key={e.id} value={e.id}>{e.title}</option>
  ))}
</select>

<div style={{ marginTop: "20px", maxHeight: "400px", overflowY: "auto" }}>
  {summary.length === 0 ? (
    <p>No results available</p>
  ) : (
    summary.map((candidate) => (
      <div key={candidate.id} style={{ padding: 10, border: "1px solid #ccc", marginTop: 10 }}>
        <b>{candidate.name}</b> – {candidate.party}
        <br /> Votes: {candidate.votes}
      </div>
    ))
  )}
</div>


      </div>

      {/* RIGHT — All Candidates */}
      <div style={{maxHeight: '700px',overflowY:'auto',paddingRight:'10px'}}>
        <h2>All Candidates</h2>
        {candidates.map((c) => (
          <div
            key={c.id}
            style={{ padding: 10, marginTop: 10, border: "1px solid #ccc"}}
          >
            <b>{c.name}</b> – {c.party}
            <br /> Election ID: {c.election}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles={
  loginBtn:{
    width: '100%',
    backgroundColor: '#ea580c',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '0.875rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxShadow: '0 4px 6px -1px rgba(234, 88, 12, 0.3)'
  },
  input :{
    width: "95%",
    padding: 8, 
    marginBottom: 10, 
    height:30,
    borderRadius: '0.5rem',
  }
  
}