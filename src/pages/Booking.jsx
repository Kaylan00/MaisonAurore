import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { rooms, getAvailableRooms } from '../data/hotel';
import AnimatedSection from '../components/AnimatedSection';
import s from './Booking.module.scss';

const COUNTRIES = [
  'France', 'United Kingdom', 'United States', 'Germany', 'Italy',
  'Spain', 'Switzerland', 'Japan', 'Australia', 'Canada',
  'Brazil', 'China', 'Netherlands', 'Portugal', 'Other',
];

const TAX_RATE = 0.15;

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return format(new Date(dateStr + 'T12:00:00'), 'MMMM d, yyyy');
  } catch {
    return dateStr;
  }
}

function toInputDate(date) {
  if (!date) return '';
  try {
    return format(new Date(date), 'yyyy-MM-dd');
  } catch {
    return '';
  }
}

function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'MA-';
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export default function Booking() {
  const [searchParams] = useSearchParams();

  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Step 1: Dates & Room
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(
    parseInt(searchParams.get('guests'), 10) || 2
  );
  const [selectedRoomId, setSelectedRoomId] = useState(
    searchParams.get('roomType')
      ? rooms.find((r) => r.slug === searchParams.get('roomType'))?.id || null
      : null
  );

  // Step 2: Guest details
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    requests: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Derived values
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = differenceInDays(new Date(checkOut + 'T12:00:00'), new Date(checkIn + 'T12:00:00'));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const availableRooms = useMemo(
    () => getAvailableRooms(checkIn, checkOut, guests),
    [checkIn, checkOut, guests]
  );

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === selectedRoomId) || null,
    [selectedRoomId]
  );

  const roomTotal = selectedRoom ? selectedRoom.price * nights : 0;
  const taxes = roomTotal * TAX_RATE;
  const grandTotal = roomTotal + taxes;

  // Min dates
  const today = toInputDate(new Date());
  const minCheckOut = checkIn
    ? toInputDate(addDays(new Date(checkIn + 'T12:00:00'), 1))
    : today;

  // Handlers
  const handleGuestChange = (field, value) => {
    setGuestDetails((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep2 = () => {
    const errors = {};
    if (!guestDetails.firstName.trim()) errors.firstName = 'Required';
    if (!guestDetails.lastName.trim()) errors.lastName = 'Required';
    if (!guestDetails.email.trim()) errors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestDetails.email))
      errors.email = 'Invalid email';
    if (!guestDetails.phone.trim()) errors.phone = 'Required';
    if (!guestDetails.country) errors.country = 'Required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToStep = (step) => {
    if (step === 2 && (!selectedRoomId || nights < 1)) return;
    if (step === 3 && !validateStep2()) return;
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = () => {
    setBookingRef(generateBookingRef());
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step indicator labels
  const steps = [
    { num: 1, label: 'Select Room' },
    { num: 2, label: 'Guest Details' },
    { num: 3, label: 'Confirmation' },
  ];

  return (
    <div className={s.booking}>
      {/* Hero */}
      <section className={s.hero}>
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
          alt="Reserve your stay at Maison Aurore"
          className={s.heroImage}
        />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>Reserve Your Stay</h1>
          <nav className={s.breadcrumb}>
            <Link to="/">Home</Link>
            <span className={s.breadcrumbSep}>/</span>
            <span>Booking</span>
          </nav>
        </div>
      </section>

      {/* Main content */}
      <section className={s.main}>
        <div className={s.container}>
          {!confirmed ? (
            <>
              {/* Step Indicator */}
              <div className={s.stepper}>
                {steps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`${s.step} ${currentStep >= step.num ? s.stepActive : ''} ${currentStep > step.num ? s.stepCompleted : ''}`}
                  >
                    <div className={s.stepCircle}>
                      {currentStep > step.num ? (
                        <span className={s.stepCheck}>&#10003;</span>
                      ) : (
                        <span>{step.num}</span>
                      )}
                    </div>
                    <span className={s.stepLabel}>{step.label}</span>
                    {i < steps.length - 1 && <div className={s.stepLine} />}
                  </div>
                ))}
              </div>

              {/* Step 1: Dates & Room */}
              {currentStep === 1 && (
                <AnimatedSection animation="fadeUp">
                  <div className={s.stepContent}>
                    <h2 className={s.stepTitle}>Select Your Dates &amp; Room</h2>

                    <div className={s.dateRow}>
                      <div className={s.field}>
                        <label className={s.fieldLabel}>Check-in</label>
                        <input
                          type="date"
                          className={s.fieldInput}
                          value={checkIn}
                          min={today}
                          onChange={(e) => {
                            setCheckIn(e.target.value);
                            if (checkOut && e.target.value >= checkOut) {
                              setCheckOut(
                                toInputDate(
                                  addDays(new Date(e.target.value + 'T12:00:00'), 1)
                                )
                              );
                            }
                          }}
                        />
                      </div>
                      <div className={s.field}>
                        <label className={s.fieldLabel}>Check-out</label>
                        <input
                          type="date"
                          className={s.fieldInput}
                          value={checkOut}
                          min={minCheckOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                        />
                      </div>
                      <div className={s.field}>
                        <label className={s.fieldLabel}>Guests</label>
                        <select
                          className={s.fieldInput}
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {nights > 0 && (
                      <p className={s.nightsSummary}>
                        {nights} {nights === 1 ? 'night' : 'nights'} &middot;{' '}
                        {formatDate(checkIn)} &mdash; {formatDate(checkOut)}
                      </p>
                    )}

                    <h3 className={s.roomsHeading}>Available Rooms</h3>
                    <div className={s.roomsGrid}>
                      {availableRooms.map((room) => (
                        <div
                          key={room.id}
                          className={`${s.roomCard} ${selectedRoomId === room.id ? s.roomSelected : ''}`}
                          onClick={() => setSelectedRoomId(room.id)}
                        >
                          <div className={s.roomImageWrap}>
                            <img
                              src={room.image}
                              alt={room.name}
                              className={s.roomImage}
                            />
                            {selectedRoomId === room.id && (
                              <div className={s.roomBadge}>Selected</div>
                            )}
                          </div>
                          <div className={s.roomInfo}>
                            <h4 className={s.roomName}>{room.name}</h4>
                            <p className={s.roomSize}>{room.size} m&sup2;</p>
                            <p className={s.roomDesc}>{room.shortDescription}</p>
                            <div className={s.roomBottom}>
                              <span className={s.roomPrice}>
                                &euro;{room.price}
                                <span className={s.roomPriceUnit}> / night</span>
                              </span>
                              <div
                                className={`${s.roomRadio} ${selectedRoomId === room.id ? s.roomRadioActive : ''}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedRoom && nights > 0 && (
                      <div className={s.pricePreview}>
                        <span>
                          {nights} {nights === 1 ? 'night' : 'nights'} &times;{' '}
                          &euro;{selectedRoom.price}
                        </span>
                        <span className={s.pricePreviewTotal}>
                          &euro;{roomTotal.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className={s.actions}>
                      <button
                        className={s.btnPrimary}
                        disabled={!selectedRoomId || nights < 1}
                        onClick={() => goToStep(2)}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 2: Guest Details */}
              {currentStep === 2 && (
                <AnimatedSection animation="fadeUp">
                  <div className={s.stepContent}>
                    <h2 className={s.stepTitle}>Guest Information</h2>

                    <div className={s.formGrid}>
                      <div className={s.field}>
                        <label className={s.fieldLabel}>First Name *</label>
                        <input
                          type="text"
                          className={`${s.fieldInput} ${formErrors.firstName ? s.fieldError : ''}`}
                          value={guestDetails.firstName}
                          onChange={(e) =>
                            handleGuestChange('firstName', e.target.value)
                          }
                          placeholder="Enter your first name"
                        />
                        {formErrors.firstName && (
                          <span className={s.errorMsg}>{formErrors.firstName}</span>
                        )}
                      </div>

                      <div className={s.field}>
                        <label className={s.fieldLabel}>Last Name *</label>
                        <input
                          type="text"
                          className={`${s.fieldInput} ${formErrors.lastName ? s.fieldError : ''}`}
                          value={guestDetails.lastName}
                          onChange={(e) =>
                            handleGuestChange('lastName', e.target.value)
                          }
                          placeholder="Enter your last name"
                        />
                        {formErrors.lastName && (
                          <span className={s.errorMsg}>{formErrors.lastName}</span>
                        )}
                      </div>

                      <div className={s.field}>
                        <label className={s.fieldLabel}>Email Address *</label>
                        <input
                          type="email"
                          className={`${s.fieldInput} ${formErrors.email ? s.fieldError : ''}`}
                          value={guestDetails.email}
                          onChange={(e) =>
                            handleGuestChange('email', e.target.value)
                          }
                          placeholder="your@email.com"
                        />
                        {formErrors.email && (
                          <span className={s.errorMsg}>{formErrors.email}</span>
                        )}
                      </div>

                      <div className={s.field}>
                        <label className={s.fieldLabel}>Phone *</label>
                        <input
                          type="tel"
                          className={`${s.fieldInput} ${formErrors.phone ? s.fieldError : ''}`}
                          value={guestDetails.phone}
                          onChange={(e) =>
                            handleGuestChange('phone', e.target.value)
                          }
                          placeholder="+33 1 42 68 00 00"
                        />
                        {formErrors.phone && (
                          <span className={s.errorMsg}>{formErrors.phone}</span>
                        )}
                      </div>

                      <div className={s.field}>
                        <label className={s.fieldLabel}>Country *</label>
                        <select
                          className={`${s.fieldInput} ${formErrors.country ? s.fieldError : ''}`}
                          value={guestDetails.country}
                          onChange={(e) =>
                            handleGuestChange('country', e.target.value)
                          }
                        >
                          <option value="">Select your country</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {formErrors.country && (
                          <span className={s.errorMsg}>{formErrors.country}</span>
                        )}
                      </div>

                      <div className={`${s.field} ${s.fieldFull}`}>
                        <label className={s.fieldLabel}>Special Requests</label>
                        <textarea
                          className={s.fieldTextarea}
                          rows={4}
                          value={guestDetails.requests}
                          onChange={(e) =>
                            handleGuestChange('requests', e.target.value)
                          }
                          placeholder="Any special requests or dietary requirements..."
                        />
                      </div>
                    </div>

                    <div className={s.actions}>
                      <button
                        className={s.btnOutline}
                        onClick={() => goToStep(1)}
                      >
                        Back
                      </button>
                      <button
                        className={s.btnPrimary}
                        onClick={() => goToStep(3)}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <AnimatedSection animation="fadeUp">
                  <div className={s.stepContent}>
                    <h2 className={s.stepTitle}>Review &amp; Confirm</h2>

                    <div className={s.summaryCard}>
                      {selectedRoom && (
                        <>
                          <div className={s.summaryHeader}>
                            <img
                              src={selectedRoom.image}
                              alt={selectedRoom.name}
                              className={s.summaryImage}
                            />
                            <div className={s.summaryHeaderInfo}>
                              <h3 className={s.summaryRoomName}>
                                {selectedRoom.name}
                              </h3>
                              <p className={s.summaryRoomSize}>
                                {selectedRoom.size} m&sup2; &middot;{' '}
                                {selectedRoom.category}
                              </p>
                            </div>
                          </div>

                          <div className={s.summaryGrid}>
                            <div className={s.summaryItem}>
                              <span className={s.summaryLabel}>Check-in</span>
                              <span className={s.summaryValue}>
                                {formatDate(checkIn)}
                              </span>
                            </div>
                            <div className={s.summaryItem}>
                              <span className={s.summaryLabel}>Check-out</span>
                              <span className={s.summaryValue}>
                                {formatDate(checkOut)}
                              </span>
                            </div>
                            <div className={s.summaryItem}>
                              <span className={s.summaryLabel}>Duration</span>
                              <span className={s.summaryValue}>
                                {nights} {nights === 1 ? 'night' : 'nights'}
                              </span>
                            </div>
                            <div className={s.summaryItem}>
                              <span className={s.summaryLabel}>Guests</span>
                              <span className={s.summaryValue}>{guests}</span>
                            </div>
                          </div>

                          <div className={s.summaryDivider} />

                          <div className={s.summaryGrid}>
                            <div className={s.summaryItem}>
                              <span className={s.summaryLabel}>Guest</span>
                              <span className={s.summaryValue}>
                                {guestDetails.firstName} {guestDetails.lastName}
                              </span>
                            </div>
                            <div className={s.summaryItem}>
                              <span className={s.summaryLabel}>Email</span>
                              <span className={s.summaryValue}>
                                {guestDetails.email}
                              </span>
                            </div>
                          </div>

                          <div className={s.summaryDivider} />

                          <div className={s.priceBreakdown}>
                            <div className={s.priceLine}>
                              <span>
                                Room rate ({nights}{' '}
                                {nights === 1 ? 'night' : 'nights'} &times;
                                &euro;{selectedRoom.price})
                              </span>
                              <span>&euro;{roomTotal.toLocaleString()}</span>
                            </div>
                            <div className={s.priceLine}>
                              <span>Taxes &amp; fees (15%)</span>
                              <span>&euro;{taxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className={`${s.priceLine} ${s.priceTotal}`}>
                              <span>Total</span>
                              <span>&euro;{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className={s.actions}>
                      <button
                        className={s.btnOutline}
                        onClick={() => goToStep(2)}
                      >
                        Back
                      </button>
                      <button
                        className={s.btnPrimary}
                        onClick={handleConfirm}
                      >
                        Confirm Reservation
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </>
          ) : (
            /* Success State */
            <AnimatedSection animation="fadeUp">
              <div className={s.success}>
                <div className={s.successCheck}>&#10003;</div>
                <h2 className={s.successTitle}>Your Reservation is Confirmed</h2>
                <p className={s.successSubtitle}>
                  Thank you, {guestDetails.firstName}. We look forward to
                  welcoming you to Maison Aurore.
                </p>

                <div className={s.successCard}>
                  <div className={s.successRow}>
                    <span className={s.successLabel}>Booking Reference</span>
                    <span className={s.successRef}>{bookingRef}</span>
                  </div>
                  <div className={s.summaryDivider} />
                  <div className={s.successRow}>
                    <span className={s.successLabel}>Room</span>
                    <span>{selectedRoom?.name}</span>
                  </div>
                  <div className={s.successRow}>
                    <span className={s.successLabel}>Dates</span>
                    <span>
                      {formatDate(checkIn)} &mdash; {formatDate(checkOut)}
                    </span>
                  </div>
                  <div className={s.successRow}>
                    <span className={s.successLabel}>Guests</span>
                    <span>{guests}</span>
                  </div>
                  <div className={s.successRow}>
                    <span className={s.successLabel}>Total</span>
                    <span className={s.successRef}>
                      &euro;{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <p className={s.successNote}>
                  A confirmation email has been sent to{' '}
                  <strong>{guestDetails.email}</strong>
                </p>

                <Link to="/" className={s.btnPrimary}>
                  Return to Home
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}
