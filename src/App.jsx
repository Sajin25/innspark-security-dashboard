import React, { useState, useMemo } from 'react';
import { generateEvents } from './mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, X, ShieldAlert, Activity, Unlock, Shield, Target } from 'lucide-react';
import './App.css';

export default function App() {
  const [events] = useState(generateEvents());
  
  // Dashboard Summary Calculations
  const totalEvents = events.length;
  const criticalEvents = events.filter(e => e.severity === 'Critical').length;
  const highEvents = events.filter(e => e.severity === 'High').length;
  const openEvents = events.filter(e => e.status === 'Open').length;
  const avgRisk = Math.round(events.reduce((sum, e) => sum + e.riskScore, 0) / totalEvents) || 0;

  // Chart State
  const [timeRange, setTimeRange] = useState('7d');

  // Table State
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Chart Logic
  const chartData = useMemo(() => {
    const now = new Date();
    let cutoff = new Date();
    if (timeRange === '24h') cutoff.setDate(now.getDate() - 1);
    if (timeRange === '7d') cutoff.setDate(now.getDate() - 7);
    if (timeRange === '30d') cutoff.setDate(now.getDate() - 30);

    const filtered = events.filter(e => new Date(e.timestamp) >= cutoff);
    const grouped = filtered.reduce((acc, curr) => {
      const dateStr = new Date(curr.timestamp).toLocaleDateString();
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(grouped)
      .map(date => ({ date, count: grouped[date] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, timeRange]);

  // Table Logic (Filter, Sort, Paginate)
  const filteredEvents = useMemo(() => {
    let result = events;
    if (statusFilter !== 'All') {
      result = result.filter(e => e.status === statusFilter);
    }
    
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return result;
  }, [events, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="dashboard">
      <header>
        <h2>Security Analytics Platform</h2>
      </header>

      {/* 1. Dashboard Summary */}
      <section className="summary-cards">
        <div className="card">
          <div className="card-icon"><Target size={24} /></div>
          <div className="card-info"><span>Total Events</span><h3>{totalEvents}</h3></div>
        </div>
        <div className="card danger">
          <div className="card-icon"><ShieldAlert size={24} /></div>
          <div className="card-info"><span>Critical Events</span><h3>{criticalEvents}</h3></div>
        </div>
        <div className="card warning">
          <div className="card-icon"><Activity size={24} /></div>
          <div className="card-info"><span>High Severity</span><h3>{highEvents}</h3></div>
        </div>
        <div className="card info">
          <div className="card-icon"><Unlock size={24} /></div>
          <div className="card-info"><span>Open Events</span><h3>{openEvents}</h3></div>
        </div>
        <div className="card dark">
          <div className="card-icon"><Shield size={24} /></div>
          <div className="card-info"><span>Avg Risk Score</span><h3>{avgRisk}</h3></div>
        </div>
      </section>

      {/* 2. Event Trend Chart */}
      <section className="panel">
        <div className="panel-header">
          <h3>Event Trend</h3>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 3. Event Table */}
      <section className="panel">
        <div className="panel-header">
          <h3>Event Log</h3>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Investigating">Investigating</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>ID ↕</th>
                <th onClick={() => handleSort('timestamp')}>Timestamp ↕</th>
                <th onClick={() => handleSort('source')}>Source ↕</th>
                <th onClick={() => handleSort('destination')}>Destination ↕</th>
                <th onClick={() => handleSort('eventType')}>Event Type ↕</th>
                <th onClick={() => handleSort('severity')}>Severity ↕</th>
                <th onClick={() => handleSort('protocol')}>Protocol ↕</th>
                <th onClick={() => handleSort('riskScore')}>Risk Score ↕</th>
                <th onClick={() => handleSort('status')}>Status ↕</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map(event => (
                  <tr key={event.id} onClick={() => setSelectedEvent(event)}>
                    <td><strong>{event.id}</strong></td>
                    <td>{new Date(event.timestamp).toLocaleString()}</td>
                    <td>{event.source}</td>
                    <td>{event.destination}</td>
                    <td>{event.eventType}</td>
                    <td><span className={`badge ${event.severity.toLowerCase()}`}>{event.severity}</span></td>
                    <td>{event.protocol}</td>
                    <td><strong>{event.riskScore}</strong></td>
                    <td>{event.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>No events found matching this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      </section>

      {/* 4. Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Event Details: {selectedEvent.id}</h3>
              <button className="close-btn" onClick={() => setSelectedEvent(null)}><X size={20} /></button>
            </div>
            
            <div className="visual-flow">
              <div className="flow-item"><strong>Source</strong>{selectedEvent.source}</div>
              <ArrowRight className="flow-arrow" size={24} />
              <div className="flow-item"><strong>Protocol</strong>{selectedEvent.protocol}</div>
              <ArrowRight className="flow-arrow" size={24} />
              <div className="flow-item"><strong>Destination</strong>{selectedEvent.destination}</div>
              <ArrowRight className="flow-arrow" size={24} />
              <div className="flow-item"><strong>Event</strong>{selectedEvent.eventType}</div>
              <ArrowRight className="flow-arrow" size={24} />
              <div className="flow-item risk"><strong>Risk Score</strong><span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{selectedEvent.riskScore}</span></div>
            </div>

            <div className="modal-details-grid">
              <p><strong>Timestamp</strong> {new Date(selectedEvent.timestamp).toLocaleString()}</p>
              <p><strong>Severity</strong> <span className={`badge ${selectedEvent.severity.toLowerCase()}`}>{selectedEvent.severity}</span></p>
              <p><strong>Status</strong> {selectedEvent.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}