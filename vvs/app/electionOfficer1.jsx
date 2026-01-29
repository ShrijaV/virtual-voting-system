import React, { useState } from 'react';
import { Link, router, useRouter } from 'expo-router';
import Svg, { Path } from "react-native-svg";

export default function ElectionOfficerLogin() {
  const router=useRouter();
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Demo credentials: User ID: OFFICER2025, Password: officer@123
    if (credentials.userId === 'OFFICER2025' && credentials.password === 'officer@123') {
      alert('✓ Election Officer Login Successful!\nWelcome to the Election Management System.');
      router.push('/ad_login1')
    } else {
      alert('✗ Invalid credentials!');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    contentWrapper: {
      width: '100%',
      maxWidth: '28rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    logo: {
      width: '4rem',
      height: '4rem',
      margin: '0 auto 1rem',
      color: '#ea580c'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#6b7280'
    },
    loginCard: {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      padding: '2.5rem',
      border: '1px solid #f3f4f6'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      color: '#374151',
      fontWeight: '600',
      marginBottom: '0.5rem',
      fontSize: '0.875rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#ea580c'
    },
    passwordWrapper: {
      position: 'relative'
    },
    passwordInput: {
      width: '100%',
      padding: '0.75rem 3rem 0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box'
    },
    toggleButton: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    toggleButtonHover: {
      color: '#ea580c'
    },
    loginButton: {
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
    loginButtonHover: {
      backgroundColor: '#c2410c'
    },
    demoSection: {
      marginTop: '2rem',
      backgroundColor: '#fff7ed',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      border: '2px solid #fed7aa'
    },
    demoTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ea580c',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    demoContent: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '1px solid #fed7aa'
    },
    demoLabel: {
      fontSize: '0.875rem',
      color: '#9a3412',
      fontWeight: '500',
      marginBottom: '0.25rem'
    },
    demoValue: {
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      color: '#1f2937',
      backgroundColor: '#fef3c7',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      marginBottom: '0.75rem',
      fontWeight: '600'
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '0.875rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <Svg style={styles.logo} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </Svg>
          <h1 style={styles.title}>Election Officer Portal</h1>
          <p style={styles.subtitle}>Secure Access for Election Officials</p>
        </div>

        {/* Login Card */}
        <div style={styles.loginCard}>
          <div style={styles.formGroup}>
            <label style={styles.label}>User ID</label>
            <input
              type="text"
              value={credentials.userId}
              onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
              style={styles.input}
              placeholder="Enter your user ID"
              onFocus={(e) => e.target.style.borderColor = '#ea580c'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                style={styles.passwordInput}
                placeholder="Enter your password"
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
                type="button"
                onMouseOver={(e) => e.currentTarget.style.color = '#ea580c'}
                onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                {showPassword ? (
                  <Svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </Svg>
                ) : (
                  <Svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </Svg>
                )}
              </button>
            </div>
          </div>
            {/* <Link href="/ad_login1" style={{marginHorizontal:'auto'}} asChild> */}
          <button
            onClick={handleLogin}
            style={styles.loginButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c2410c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ea580c'}
          >
            Login
          </button>
          {/* </Link> */}
        </div>

        {/* Demo Credentials */}
        <div style={styles.demoSection}>
          <h3 style={styles.demoTitle}>Demo Credentials for Testing</h3>
          <div style={styles.demoContent}>
            <p style={styles.demoLabel}>User ID:</p>
            <div style={styles.demoValue}>OFFICER2025</div>
            <p style={styles.demoLabel}>Password:</p>
            <div style={styles.demoValue}>officer@123</div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>© 2025 Virtual Voting System. All rights reserved.</p>
          <p style={{marginTop: '0.5rem'}}>For technical support, contact your system administrator</p>
        </div>
      </div>
    </div>
  );
}