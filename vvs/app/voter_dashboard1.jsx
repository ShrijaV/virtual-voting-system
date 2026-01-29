// VoterDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// NOTE: change this base URL if your backend runs elsewhere
const backendUrl = "http://127.0.0.1:8000/api";

export default function VoterDashboard({ route, navigate /* if using react-router or expo-router pass navigation/route */ }) {
  // Try to read voter id from localStorage or route.params.voter_id
  const fallbackVoterId = (route && route.params && route.params.voter_id) || null;
  const savedVoterId = typeof window !== "undefined" ? localStorage.getItem("voter_id") : null;
  const initialVoterId = savedVoterId || fallbackVoterId || "";

  const [voterId, setVoterId] = useState(initialVoterId);
  const [voter, setVoter] = useState(null); // {id, phone, has_voted}
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [candidates, setCandidates] = useState([]); // filtered by selectedElection
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [summary, setSummary] = useState([]); // summary for selected election (same as candidates)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const[phone, setPhone]=useState("Loading...");
  const[status, setStatus]=useState("Loading...");

  useEffect(() => {
      const storedPhone = localStorage.getItem("voter_phone");
      const storedStatus = localStorage.getItem("voter_has_voted");

      if (storedPhone) setPhone(storedPhone);
      else setPhone("Not provided");

      if (storedStatus === "true") setStatus("Voted");
      else if (storedStatus === "false") setStatus("Not Voted");
      else setStatus("Unknown");
  }, []);


  // Helpers to fetch data
  async function fetchVoter(id) {
    if (!id) return;
    try {
      const res = await axios.get(`${backendUrl}/voters/${id}/`);
      setVoter(res.data);
    } catch (err) {
      console.error("fetchVoter error:", err);
      // setError("Failed to load voter details.");
    }
  }

  async function fetchElections() {
    try {
      const res = await axios.get(`${backendUrl}/elections/`);
      setElections(res.data || []);
    } catch (err) {
      console.error("fetchElections error:", err);
      setError("Failed to load elections.");
    }
  }

  async function fetchCandidatesForElection(electionId) {
    if (!electionId) {
      setCandidates([]);
      setSummary([]);
      return;
    }
    try {
      const res = await axios.get(`${backendUrl}/candidates/`, { params: { election: electionId }});
      // backend may return array; ensure we set votes default to 0 if missing
      const arr = (res.data || []).map(c => ({ votes: 0, ...c }));
      const filtered=arr.filter(c=>String(c.election)===String(electionId));
      setCandidates(filtered);
      setSummary(filtered);
    } catch (err) {
      console.error("fetchCandidatesForElection error:", err);
      setError("Failed to load candidates for selected election.");
    }
  }

  // Cast vote
  const castVote = async () => {
    setMessage("");
    setError("");
    if (!voterId) {
      setError("Voter not identified. Please login again.");
      return;
    }
    if (!selectedCandidateId) {
      setError("Please select a candidate.");
      return;
    }
    if (voter && voter.has_voted) {
      setError("You have already voted.");
      return;
    }

    try {
      setLoading(true);
      const body = { voter_id: voterId, candidate_id: selectedCandidateId };
      const res = await axios.post(`${backendUrl}/cast-vote/`, body);
      // successful: update UI locally
      setMessage("Vote recorded successfully.");
      // mark voter as has_voted
      setVoter(prev => prev ? { ...prev, has_voted: true } : prev);
      // update candidate vote counts in summary + candidates arrays
      setCandidates(prev => prev.map(c => c.id === selectedCandidateId ? { ...c, votes: (c.votes || 0) + 1 } : c));
      setSummary(prev => prev.map(c => c.id === selectedCandidateId ? { ...c, votes: (c.votes || 0) + 1 } : c));
      setSelectedCandidateId(null);
    } catch (err) {
      console.error("castVote error:", err);
      // if backend returns message, show it
      const msg = err?.response?.data?.error || err?.response?.data?.message || "Could not cast vote.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    // if voterId exists then fetch voter details
    if (voterId) {
      fetchVoter(voterId);
      // also store voterId in localStorage so subsequent loads use it
      try { localStorage.setItem("voter_id", voterId); } catch {}
    }
    fetchElections();
  }, [voterId]);

  // when selected election changes, fetch its candidates
  useEffect(() => {
    if (selectedElection) {
      fetchCandidatesForElection(selectedElection);
    } else {
      setCandidates([]);
      setSummary([]);
    }
    // reset candidate selection on election switch
    setSelectedCandidateId(null);
  }, [selectedElection]);

  // Simple responsive styles inline so it works in expo-web + mobile
  const styles = {
    container: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 30, padding: 24 },
    leftCol: { borderRight: "none", paddingRight: 10 },
    centerCol: { paddingLeft: 10, paddingRight: 10 },
    rightCol: { paddingLeft: 10 },
    card: { border: "1px solid #eee", padding: 20, borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" },
    heading: { fontSize: 32, marginBottom: 18 },
    label: { fontWeight: 700, marginTop: 10 },
    small: { color: "#666", marginTop: 6 },
    candidateRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 10px", borderBottom: "1px solid #f1f1f1" },
    niceButton: { background: "#39b54a", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer" },
    disabledButton: { background: "#a2d6ac", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "not-allowed" },
    radio: { marginRight: 10 },
    electionSelect: { width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" },
    summaryList: { maxHeight: 320, overflowY: "auto" },
  };

  return (
    <div style={styles.container}>
      {/* LEFT: Voter details */}
      <div style={styles.leftCol}>
        <div style={styles.card}>
          <div style={styles.heading}>Voter Dashboard</div>

          <div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 600 }}>Your Voter ID</div>
              <div style={styles.small}>{voterId || "Not set"}</div>
            </div>

            <hr style={{ margin: "18px 0" }} />

            <div>
              <div style={{ fontWeight: 600 }}>Select Election</div>
              <select
                style={styles.electionSelect}
                value={selectedElection}
                onChange={(e) => setSelectedElection(e.target.value)}
              >
                <option value="">-- choose an election --</option>
                {elections.map(el => <option key={el.id} value={el.id}>{el.title}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER: Candidates + Vote */}
      <div style={styles.centerCol}>
        <div style={styles.card}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Vote for Your Candidate</div>

          {!selectedElection ? (
            <div style={styles.small}>Select an election to see candidates.</div>
          ) : (
            <>
              <div style={{ maxHeight: 380, overflowY: "auto", border: "1px solid #fafafa", borderRadius: 6 }}>
                {candidates.length === 0 && <div style={{ padding: 16 }}>No candidates found for this election.</div>}
                {candidates.map(c => (
                  <div key={c.id} style={styles.candidateRow}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="candidate"
                        style={styles.radio}
                        disabled={voter && voter.has_voted}
                        checked={selectedCandidateId === c.id}
                        onChange={() => setSelectedCandidateId(c.id)}
                      />
                      <div>
                        <div style={{ fontWeight: 700 }}>{c.name}</div>
                        <div style={styles.small}>{c.party}</div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16 }}>
                <button
                  style={voter && voter.has_voted ? styles.disabledButton : styles.niceButton}
                  onClick={castVote}
                  disabled={loading || (voter && voter.has_voted)}
                >
                  {loading ? "Submitting..." : (voter && voter.has_voted ? "You already voted" : "Cast Vote")}
                </button>
              </div>

              {message && <div style={{ marginTop: 12, color: "green" }}>{message}</div>}
              {error && <div style={{ marginTop: 12, color: "green" }}>{error}</div>}
            </>
          )}
        </div>
      </div>

      {/* RIGHT: Election summary */}
      <div style={styles.rightCol}>
        <div style={styles.card}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Election Summary</div>

          {!selectedElection ? (
            <div style={styles.small}>Choose an election to view the summary.</div>
          ) : (
            <div style={styles.summaryList}>
              {summary.length === 0 && <div style={{ padding: 8 }}>No data</div>}
              {summary.map(s => (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px", borderBottom: "1px solid #f7f7f7" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{s.name}</div>
                    <div style={styles.small}>{s.party}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
