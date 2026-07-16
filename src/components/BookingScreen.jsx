import React, { useState } from 'react';
import { ArrowLeft, CalendarCheck2, Clock, Calendar, CheckCircle2, ChevronRight, User, ShieldCheck } from 'lucide-react';

export default function BookingScreen({ mentor, onBookSlot, onBack, onFinish }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Tomorrow'); // Mock day selection
  const [isConfirmed, setIsConfirmed] = useState(false);

  const mockDays = [
    { id: 'Today', label: 'Today', date: 'Jul 16' },
    { id: 'Tomorrow', label: 'Tomorrow', date: 'Jul 17' },
    { id: 'Next Monday', label: 'Mon', date: 'Jul 20' }
  ];

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    
    // Call parent action
    onBookSlot(`${selectedDay} at ${selectedSlot}`);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="success-wrapper animate-slide-up">
        <div className="success-card card text-center">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={64} className="success-check-icon" />
          </div>

          <h2 className="success-title">You're locked in! ⚡</h2>
          <p className="success-sub">
            Kickoff session scheduled with <strong>{mentor.name}</strong>. An email invite with the video link has been sent.
          </p>

          <div className="booking-summary-box">
            <div className="summary-item">
              <span className="summary-lbl">Mentor:</span>
              <span className="summary-val">{mentor.name}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Topic:</span>
              <span className="summary-val">Skillsync & Goal Kickoff</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Time:</span>
              <span className="summary-val">{selectedDay} at {selectedSlot}</span>
            </div>
          </div>

          <div className="success-tips">
            <h5>💡 GenZ Tip for a Great Session</h5>
            <p>Your mentor has been sent a copy of your skill gap analysis. They will have a drafted agenda ready to review with you. Come ready to speak about your dream projects!</p>
          </div>

          <div className="success-actions">
            <button className="btn btn-primary" onClick={onFinish}>
              <span>Go to Mentor Dashboard</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <style>{`
          .success-wrapper {
            max-width: 580px;
            margin: 3rem auto;
          }

          .success-card {
            padding: 3rem 2.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .success-icon-wrapper {
            width: 90px;
            height: 90px;
            background-color: var(--color-success-light);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            animation: pulseBorder 2s infinite;
          }

          .success-check-icon {
            color: var(--color-success);
          }

          .success-title {
            font-size: 2.25rem;
            font-weight: 850;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--color-success), var(--color-primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .success-sub {
            color: var(--color-text-muted);
            font-size: 1.05rem;
            margin-bottom: 2rem;
          }

          .booking-summary-box {
            width: 100%;
            background-color: var(--bg-secondary);
            border-radius: var(--border-radius-lg);
            padding: 1.25rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 2rem;
            text-align: left;
          }

          .summary-item {
            display: flex;
            justify-content: space-between;
            font-size: 0.95rem;
          }

          .summary-lbl {
            font-weight: 700;
            color: var(--color-text-muted);
          }

          .summary-val {
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            color: var(--color-text-main);
          }

          .success-tips {
            text-align: left;
            border: 1px solid var(--border-color);
            padding: 1.25rem;
            border-radius: var(--border-radius-lg);
            margin-bottom: 2.5rem;
            width: 100%;
          }

          .success-tips h5 {
            font-size: 0.9rem;
            font-weight: 800;
            color: var(--color-primary);
            margin-bottom: 0.25rem;
          }

          .success-tips p {
            font-size: 0.85rem;
            color: var(--color-text-muted);
            line-height: 1.5;
          }

          .success-actions {
            width: 100%;
          }

          .success-actions .btn {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="booking-container animate-slide-up">
      {/* Back button */}
      <button className="btn btn-secondary back-btn-top" onClick={onBack}>
        <ArrowLeft size={16} />
        <span>Back to Matches</span>
      </button>

      <div className="booking-layout-grid">
        {/* Mentor Overview Sidebar */}
        <div className="mentor-summary-sidebar card">
          <div className="mentor-summary-header">
            <div className="mentor-summary-avatar" style={{ background: mentor.gradient }}>
              {mentor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3>{mentor.name}</h3>
            <p className="sidebar-mentor-title">{mentor.role}</p>
            <p className="sidebar-mentor-company">@{mentor.company}</p>
          </div>

          <div className="sidebar-bio">
            <p>"{mentor.bio}"</p>
          </div>

          <div className="sidebar-why-box">
            <div className="why-label">
              <ShieldCheck size={14} />
              <span>AI MATCH EXPLANATION</span>
            </div>
            <p className="why-text">Matches your gap analysis with real-world {mentor.skills[0]} experience.</p>
          </div>
        </div>

        {/* Scheduler main board */}
        <div className="scheduler-board card">
          <h2>Select a kickoff slot</h2>
          <p className="scheduler-subtitle">Pick a time that works for you. All slots are free for matching learners.</p>

          {/* Date Picker Section */}
          <div className="scheduler-section">
            <h4 className="scheduler-sec-title">1. Choose Date</h4>
            <div className="days-grid">
              {mockDays.map((day) => (
                <div 
                  key={day.id}
                  className={`day-card ${selectedDay === day.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDay(day.id)}
                >
                  <span className="day-name">{day.label}</span>
                  <span className="day-date">{day.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="scheduler-section">
            <h4 className="scheduler-sec-title">2. Choose Time</h4>
            <div className="slots-grid">
              {mentor.availability.map((slot) => {
                const timeString = slot.split(" ").slice(1).join(" "); // extract time e.g. "3:00 PM"
                return (
                  <div 
                    key={slot}
                    className={`slot-card ${selectedSlot === timeString ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(timeString)}
                  >
                    <Clock size={16} className="slot-clock-icon" />
                    <span>{timeString}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="scheduler-actions">
            <button 
              className={`btn btn-primary btn-lg confirm-btn ${!selectedSlot ? 'disabled-btn' : ''}`}
              disabled={!selectedSlot}
              onClick={handleConfirmBooking}
            >
              <CalendarCheck2 size={18} />
              <span>Confirm booking details</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .booking-container {
          max-width: 950px;
          margin: 0 auto;
        }

        .back-btn-top {
          margin-bottom: 1.5rem;
        }

        .booking-layout-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2rem;
        }

        /* Sidebar styling */
        .mentor-summary-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2.25rem 1.5rem;
        }

        .mentor-summary-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          padding-bottom: 1.5rem;
          width: 100%;
        }

        .mentor-summary-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.75rem;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .sidebar-mentor-title {
          font-size: 0.9rem;
          color: var(--color-text-main);
          font-weight: 700;
          margin-top: 0.15rem;
        }

        .sidebar-mentor-company {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .sidebar-bio {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        .sidebar-why-box {
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius-lg);
          padding: 0.75rem 1rem;
          text-align: left;
          width: 100%;
        }

        .why-label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 0.65rem;
          color: var(--color-primary);
          letter-spacing: 0.05em;
          margin-bottom: 0.15rem;
        }

        .why-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        /* Scheduler Board styling */
        .scheduler-board {
          text-align: left;
          padding: 2.5rem;
        }

        .scheduler-board h2 {
          font-size: 1.8rem;
          font-weight: 850;
        }

        .scheduler-subtitle {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .scheduler-section {
          margin-bottom: 2rem;
        }

        .scheduler-sec-title {
          font-size: 1rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin-bottom: 1rem;
        }

        /* Days horizontal selector */
        .days-grid {
          display: flex;
          gap: 1rem;
        }

        .day-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background-color: var(--bg-card);
          border: 2px solid rgba(226, 232, 240, 0.8);
          border-radius: var(--border-radius-lg);
          cursor: pointer;
          transition: var(--transition-spring);
        }

        .day-card:hover {
          border-color: var(--color-primary);
          background-color: var(--color-primary-light);
        }

        .day-card.selected {
          border-color: var(--color-primary);
          background-color: var(--color-primary-light);
        }

        .day-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 750;
          font-size: 1rem;
        }

        .day-date {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        /* Time slot selection */
        .slots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 0.75rem;
        }

        .slot-card {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1rem;
          background-color: var(--bg-secondary);
          border: 2px solid transparent;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          transition: var(--transition-smooth);
        }

        .slot-card:hover {
          background-color: #FFFFFF;
          border-color: var(--color-primary);
        }

        .slot-card.selected {
          background-color: var(--color-primary-light);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .slot-clock-icon {
          color: var(--color-text-muted);
        }

        .slot-card.selected .slot-clock-icon {
          color: var(--color-primary);
        }

        .scheduler-actions {
          margin-top: 2.5rem;
          border-top: 1px solid rgba(226, 232, 240, 0.4);
          padding-top: 1.5rem;
        }

        .confirm-btn {
          width: 100%;
        }

        @media (max-width: 768px) {
          .booking-layout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
