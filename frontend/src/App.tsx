import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import MarketDatabase from './pages/MarketDatabase';
import SignalScanner from './pages/SignalScanner';
import DataEnrichment from './pages/DataEnrichment';
import MigrationInsights from './pages/MigrationInsights';
import Outreach from './pages/Outreach';
import OutreachTracking from './pages/OutreachTracking';
import Pricing from './pages/Pricing';
import SplineTest from './pages/SplineTest';
import GlassmorphicExample from './pages/GlassmorphicExample';
import Menu from './components/menu/Menu';
import { FilterProvider } from './contexts/FilterContext';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background-primary text-text-primary">
          <div className="glass-panel p-8 rounded-xl max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-accent-primary">Something went wrong</h2>
            <p className="text-text-secondary mb-4">
              We're sorry, but there was an error loading the application.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="glass-button"
            >
              Reload Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-accent-primary">Error Details</summary>
                <pre className="mt-2 text-xs text-text-muted overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    // Add Inter font to the document
    document.body.classList.add('font-inter');
    
    // Set initial theme attributes
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  }, []);
  
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex min-h-screen bg-gradient-to-br from-background-primary via-background-primary to-background-accent/40 text-text-primary overflow-hidden">
          {/* Glassmorphic orbs/gradients in background for visual interest */}
          <div className="fixed -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-accent-primary/5 blur-[120px] pointer-events-none"></div>
          <div className="fixed -bottom-[30%] -left-[10%] w-[80%] h-[80%] rounded-full bg-accent-primary/8 blur-[120px] pointer-events-none"></div>
          
          <Menu />
          <main className="flex-1 ml-[110px] relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spline-test" element={<SplineTest />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/ui-example" element={<GlassmorphicExample />} />
              <Route path="/market-database" element={
                <FilterProvider>
                  <MarketDatabase />
                </FilterProvider>
              } />
              <Route path="/signal-scanner" element={<SignalScanner />} />
              <Route path="/signal-scanner/:facilityId" element={<SignalScanner />} />
              <Route path="/data-enrichment" element={<DataEnrichment />} />
              <Route path="/migration-insights" element={<MigrationInsights />} />
              <Route path="/outreach" element={<Outreach />} />
              <Route path="/outreach-tracking" element={<OutreachTracking />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </main>
        </div>
        
        {/* Toast container with glassmorphic styling */}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(26, 26, 26, 0.8)',
              color: '#FFFFFF',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
            },
          }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
