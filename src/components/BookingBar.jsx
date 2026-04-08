import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './BookingBar.module.scss';

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return { day, month, year };
}

function Counter({ value, onChange, min = 0, max = 10 }) {
  return (
    <div className={s.counter}>
      <button
        type="button"
        className={s.counterBtn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease"
      >
        −
      </button>
      <span className={s.counterValue}>{value}</span>
      <button
        type="button"
        className={s.counterBtn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

export default function BookingBar({ variant = 'hero' }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef(null);

  const checkInDate = formatDisplayDate(checkIn);
  const checkOutDate = formatDisplayDate(checkOut);

  // Close guests dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target)) {
        setGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', adults + children);
    params.set('adults', adults);
    params.set('children', children);
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <form
      className={`${s.bar} ${variant === 'sticky' ? s.barSticky : ''}`}
      onSubmit={handleSubmit}
    >
      {/* Check-in */}
      <div className={s.field}>
        <label className={s.label}>Check-in</label>
        <div className={s.dateDisplay}>
          {checkInDate ? (
            <div className={s.dateFormatted}>
              <span className={s.dateDay}>{checkInDate.day}</span>
              <span className={s.dateMonth}>{checkInDate.month} {checkInDate.year}</span>
            </div>
          ) : (
            <span className={s.datePlaceholder}>Select Date</span>
          )}
          <input
            type="date"
            className={s.dateInput}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) setCheckOut('');
            }}
            min={getTodayString()}
            required
          />
        </div>
      </div>

      <div className={s.divider} />

      {/* Check-out */}
      <div className={s.field}>
        <label className={s.label}>Check-out</label>
        <div className={s.dateDisplay}>
          {checkOutDate ? (
            <div className={s.dateFormatted}>
              <span className={s.dateDay}>{checkOutDate.day}</span>
              <span className={s.dateMonth}>{checkOutDate.month} {checkOutDate.year}</span>
            </div>
          ) : (
            <span className={s.datePlaceholder}>Select Date</span>
          )}
          <input
            type="date"
            className={s.dateInput}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || getTodayString()}
            required
          />
        </div>
      </div>

      <div className={s.divider} />

      {/* Adults */}
      <div className={s.field} ref={guestsRef}>
        <label className={s.label}>Adults</label>
        <div className={s.guestsDisplay} onClick={() => setGuestsOpen(!guestsOpen)}>
          <span className={s.guestsValue}>{adults}</span>
          <svg className={s.chevron} viewBox="0 0 12 8" width="12" height="8">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
          </svg>
        </div>

        {guestsOpen && (
          <div className={s.guestsDropdown}>
            <div className={s.guestsRow}>
              <div>
                <span className={s.guestsRowLabel}>Adults</span>
                <span className={s.guestsRowSub}>Ages 13+</span>
              </div>
              <Counter value={adults} onChange={setAdults} min={1} max={6} />
            </div>
            <div className={s.guestsRow}>
              <div>
                <span className={s.guestsRowLabel}>Children</span>
                <span className={s.guestsRowSub}>Ages 0-12</span>
              </div>
              <Counter value={children} onChange={setChildren} min={0} max={4} />
            </div>
            <button
              type="button"
              className={s.guestsDone}
              onClick={() => setGuestsOpen(false)}
            >
              Done
            </button>
          </div>
        )}
      </div>

      <div className={s.divider} />

      {/* Children (visible summary) */}
      <div className={s.field}>
        <label className={s.label}>Children</label>
        <span className={s.guestsValue}>{children}</span>
      </div>

      {/* Submit */}
      <button type="submit" className={s.submit}>
        <span>Check Availability</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
