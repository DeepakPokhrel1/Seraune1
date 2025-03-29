import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './pages/About';
import './App.css';
import Services from './pages/Services';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import MessagesPage from './admin/pages/MessagesPage';

// Layout component that conditionally renders NavBar and Footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <NavBar />}
      <main className="content">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AppLayout>
            <Home />
          </AppLayout>
        } />
        <Route path="/contact" element={
          <AppLayout>
            <Contact />
          </AppLayout>
        } />
        <Route path="/about" element={
          <AppLayout>
            <About />
          </AppLayout>
        } />
        <Route path="/services" element={
          <AppLayout>
            <Services />
          </AppLayout>
        } />
        
        {/* Admin Routes - without NavBar and Footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/messages" element={<MessagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;