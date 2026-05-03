import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error) { if (import.meta.env.DEV) console.error(error); }

  reset = () => { this.setState({ error: null }); window.location.assign('/'); };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{
        minHeight: '100vh', background: '#F4F1EC', color: '#0A0A0A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, fontFamily: "'Inter',sans-serif",
      }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{
            fontFamily: "'DM Mono',monospace", fontSize: 9,
            letterSpacing: '.2em', textTransform: 'uppercase',
            color: '#5A544E', marginBottom: 24,
          }}>
            Unexpected error
          </div>
          <h1 style={{
            fontFamily: "'Fraunces',serif", fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1, margin: 0,
            letterSpacing: '-.02em',
          }}>
            Something <em style={{ color: '#8C3A2B' }}>broke</em>.
          </h1>
          <p style={{ marginTop: 20, color: '#5C5751', lineHeight: 1.7, fontWeight: 300 }}>
            Please return to the gallery and try again.
          </p>
          <button onClick={this.reset} className="btn btn-inverse" style={{ marginTop: 32 }}>
            Return home →
          </button>
        </div>
      </div>
    );
  }
}
