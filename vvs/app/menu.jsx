import { Link } from 'expo-router';
import React, { useState } from 'react';
import Svg, { Path } from "react-native-svg";


export default function MenuPage() {
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'create', 'abort'
  const [elections, setElections] = useState([
    { id: 1, name: 'General Election 2025', status: 'Active', date: '2025-11-15', createdAt: '2025-01-01' }
  ]);
  const [newElection, setNewElection] = useState({
    name: '',
    date: '',
    description: ''
  });

  // Create Election Functions
  const openCreateForm = () => {
    setCurrentView('create');
  };

  const submitNewElection = () => {
    if (!newElection.name.trim()) {
      alert('❌ Please enter an election name');
      return;
    }
    if (!newElection.date) {
      alert('❌ Please select an election date');
      return;
    }

    const election = {
      id: Date.now(),
      name: newElection.name,
      date: newElection.date,
      description: newElection.description,
      status: 'Active',
      createdAt: new Date().toLocaleString()
    };

    setElections([...elections, election]);
    setNewElection({ name: '', date: '', description: '' });
    setCurrentView('menu');
    alert(`✓ Election "${election.name}" created successfully!`);
  };

  const cancelCreate = () => {
    setNewElection({ name: '', date: '', description: '' });
    setCurrentView('menu');
  };

  // Abort Election Functions
  const openAbortList = () => {
    const activeElections = elections.filter(e => e.status === 'Active');
    if (activeElections.length === 0) {
      alert('⚠️ No active elections to abort.');
      return;
    }
    setCurrentView('abort');
  };

  const abortElection = (electionId) => {
    const election = elections.find(e => e.id === electionId);
    if (!election) {
      alert('❌ Election not found');
      return;
    }

    const userConfirmed = window.confirm(
      `⚠️ Abort "${election.name}"?\n\nThis will:\n• Stop all voting\n• Invalidate all votes\n• Cannot be undone\n\nClick OK to confirm.`
    );

    if (userConfirmed) {
      // Create new array with updated election
      const updatedElections = elections.map(e => {
        if (e.id === electionId) {
          return { 
            ...e, 
            status: 'Aborted', 
            abortedAt: new Date().toLocaleString() 
          };
        }
        return e;
      });
      
      setElections(updatedElections);
      setCurrentView('menu');
      
      // Delay alert to ensure state update completes
      setTimeout(() => {
        alert(`✓ Election "${election.name}" has been aborted successfully.`);
      }, 200);
    }
  };

  const cancelAbort = () => {
    setCurrentView('menu');
  };

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
      filter: currentView !== 'menu' ? 'blur(10px)' : 'none',
      transition: 'filter 0.3s ease'
    },
    pattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      backgroundImage: 'radial-gradient(circle, #ea580c 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1000,
      overflowY: 'auto'
    },
    modalCard: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      padding: '2.5rem',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    closeBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#9ca3af',
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s'
    },
    modalHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    modalIcon: {
      width: '4rem',
      height: '4rem',
      margin: '0 auto 1rem',
      color: '#ea580c'
    },
    modalTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    modalSubtitle: {
      fontSize: '1rem',
      color: '#6b7280'
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
      marginBottom: '2rem'
    },
    menuOption: {
      padding: '1.5rem',
      backgroundColor: '#fff7ed',
      border: '2px solid #fed7aa',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    optionIcon: {
      width: '3.5rem',
      height: '3.5rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      flexShrink: 0
    },
    optionContent: {
      flex: 1
    },
    optionTitle: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    optionDesc: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    optionArrow: {
      width: '1.5rem',
      height: '1.5rem',
      color: '#ea580c'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    required: {
      color: '#dc2626'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      boxSizing: 'border-box',
      minHeight: '100px',
      fontFamily: 'inherit',
      resize: 'vertical',
      transition: 'border-color 0.3s'
    },
    btnGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem'
    },
    primaryBtn: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#ea580c',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    secondaryBtn: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#ffffff',
      color: '#374151',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    electionList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    electionCard: {
      padding: '1.25rem',
      backgroundColor: '#fff7ed',
      border: '2px solid #fed7aa',
      borderRadius: '0.75rem'
    },
    electionName: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    electionInfo: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '1rem'
    },
    abortBtn: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#dc2626',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    statusSection: {
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem'
    },
    statusTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.75rem'
    },
    statusItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem 0',
      fontSize: '0.875rem'
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    activeBadge: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    abortedBadge: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.background}>
        <div style={styles.pattern}></div>
      </div>

      {/* Main Menu */}
      {currentView === 'menu' && (
        <div style={styles.overlay}>
          <div style={styles.modalCard}>
            <button
              style={styles.closeBtn}
              onClick={() => alert('Menu closed')}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#1f2937';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              ✕
            </button>

            <div style={styles.modalHeader}>
              <Svg style={styles.modalIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </Svg>
              <h1 style={styles.modalTitle}>Election Management</h1>
              <p style={styles.modalSubtitle}>Choose an action to proceed</p>
            </div>

            <div style={styles.menuGrid}>
              <div
                style={styles.menuOption}
                onClick={openCreateForm}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffedd5';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff7ed';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{...styles.optionIcon, backgroundColor: '#ea580c'}}>
                  <Svg style={{width: '1.75rem', height: '1.75rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </Svg>
                </div>
                <div style={styles.optionContent}>
                  <div style={styles.optionTitle}>Create Election</div>
                  <div style={styles.optionDesc}>Set up a new election campaign</div>
                </div>
                <Svg style={styles.optionArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </Svg>
              </div>

              <div
                style={styles.menuOption}
                onClick={openAbortList}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffedd5';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff7ed';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{...styles.optionIcon, backgroundColor: '#dc2626'}}>
                  <Svg style={{width: '1.75rem', height: '1.75rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </Svg>
                </div>
                <div style={styles.optionContent}>
                  <div style={styles.optionTitle}>Abort Election</div>
                  <div style={styles.optionDesc}>Cancel an active election</div>
                </div>
                <Svg style={styles.optionArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </Svg>
              </div>
            </div>

            {/* Elections Status */}
            <div style={styles.statusSection}>
              <div style={styles.statusTitle}>Current Elections</div>
              {elections.map(election => (
                <div key={election.id} style={styles.statusItem}>
                  <span>{election.name}</span>
                  <span style={{...styles.badge, ...(election.status === 'Active' ? styles.activebadge : styles.abortedBadge)}}>
                    {election.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Election Form */}
      {currentView === 'create' && (
        <div style={styles.overlay}>
          <div style={styles.modalCard}>
            <Link href="/ad_login1" style={{marginHorizontal:'auto'}} asChild>
                <button
                style={styles.closeBtn}
                onClick={cancelCreate}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.color = '#1f2937';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#9ca3af';
                }}
                >
                ✕
                </button>
            </Link>

            <div style={styles.modalHeader}>
              <Svg style={styles.modalIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </Svg>
              <h1 style={styles.modalTitle}>Create New Election</h1>
              <p style={styles.modalSubtitle}>Fill in the details below</p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Election Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={newElection.name}
                onChange={(e) => setNewElection({...newElection, name: e.target.value})}
                placeholder="e.g., General Election 2025"
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Election Date <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={newElection.date}
                onChange={(e) => setNewElection({...newElection, date: e.target.value})}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                value={newElection.description}
                onChange={(e) => setNewElection({...newElection, description: e.target.value})}
                placeholder="Enter description (optional)"
                style={styles.textarea}
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={styles.btnGroup}>
              <button
                style={styles.secondaryBtn}
                onClick={cancelCreate}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                Cancel
              </button>
              <button
                style={styles.primaryBtn}
                onClick={submitNewElection}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c2410c'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ea580c'}
              >
                Create Election
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Abort Election List */}
      {currentView === 'abort' && (
        <div style={styles.overlay}>
          <div style={styles.modalCard}>
            <button
              style={styles.closeBtn}
              onClick={cancelAbort}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#1f2937';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              ✕
            </button>

            <div style={styles.modalHeader}>
              <Svg style={{...styles.modalIcon, color: '#dc2626'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </Svg>
              <h1 style={styles.modalTitle}>Abort Election</h1>
              <p style={styles.modalSubtitle}>Select an election to abort</p>
            </div>

            <div style={styles.electionList}>
              {elections.filter(e => e.status === 'Active').map(election => (
                <div key={election.id} style={styles.electionCard}>
                  <div style={styles.electionName}>{election.name}</div>
                  <div style={styles.electionInfo}>
                    Date: {election.date}
                    {election.description && ` • ${election.description}`}
                  </div>
                  <button
                    style={styles.abortBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      abortElection(election.id);
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
                  >
                    Abort This Election
                  </button>
                </div>
              ))}
            </div>

            <div style={styles.btnGroup}>
              <button
                style={styles.secondaryBtn}
                onClick={cancelAbort}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}