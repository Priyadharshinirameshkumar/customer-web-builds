import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { createBooking } from "../../services/booking.service";
import {
  getAvailableSlots,
  type AvailableSlot,
} from "../../services/slot.service";
import {
  clearWebsitePlanId,
  getWebsitePlanId,
  saveWebsitePlanId,
} from "../../utils/websitePlanStorage";
import "./Booking.css";

const formatSlotDate = (date: string) => date.split("T")[0];

const formatDisplayDate = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const initialFormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  budget: "",
  preferredDate: "",
  preferredTime: "",
  meetingMethod: "",
  additionalNotes: "",
};

function Booking() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "",
    preferredDate: "",
    preferredTime: "",
    meetingMethod: "",
  });
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  
  // Calendar month state
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());

  const navigate = useNavigate();
  const location = useLocation();

  const locationPlanId = location.state?.websitePlanId as number | undefined;
  const websitePlanId = locationPlanId ?? getWebsitePlanId();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (locationPlanId) {
      saveWebsitePlanId(locationPlanId);
    }
  }, [locationPlanId]);

  useEffect(() => {
    if (!websitePlanId) {
      navigate("/plan-website", {
        replace: true,
        state: {
          message: "Please complete your website plan before booking a discovery call.",
        },
      });
    }
  }, [websitePlanId, navigate]);

  const loadAvailableSlots = async () => {
    try {
      setSlotsLoading(true);
      setSlotsError("");
      const availableSlots = await getAvailableSlots();
      setSlots(availableSlots);
    } catch (error) {
      console.error(error);
      setSlotsError("Unable to load available slots. Please refresh the page.");
    } finally {
      setSlotsLoading(false);
    }
  };

  useEffect(() => {
    loadAvailableSlots();
  }, []);

  const timesForSelectedDate = slots
    .filter((slot) => formatSlotDate(slot.date) === formData.preferredDate)
    .map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      budget: "",
      preferredDate: "",
      preferredTime: "",
      meetingMethod: "",
    };

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Full Name is required.";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (formData.budget === "") {
      newErrors.budget = "Please select your budget.";
    }

    if (formData.preferredDate === "") {
      newErrors.preferredDate = "Please select a date from the calendar.";
    }

    if (formData.preferredTime === "") {
      newErrors.preferredTime = "Please select a preferred time.";
    }

    if (!selectedSlotId) {
      newErrors.preferredTime = "Please select a valid available time slot.";
    }

    if (formData.meetingMethod === "") {
      newErrors.meetingMethod = "Please choose a meeting method.";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      return;
    }

    if (!websitePlanId) {
      setSubmitError(
        "Your website plan session has expired. Please complete the plan form again."
      );
      return;
    }

    if (!selectedSlotId) {
      setSubmitError("Please select an available time slot.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await createBooking({
        websitePlanId,
        slotId: selectedSlotId,
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        meetingMethod: formData.meetingMethod,
        additionalNotes: formData.additionalNotes,
      });

      setFormData(initialFormData);

      setErrors({
        fullName: "",
        email: "",
        phone: "",
        budget: "",
        preferredDate: "",
        preferredTime: "",
        meetingMethod: "",
      });

      clearWebsitePlanId();
      navigate("/thank-you");
    } catch (error) {
      console.error(error);

      const axiosError = error as AxiosError<{ message?: string }>;
      const apiMessage = axiosError.response?.data?.message ?? "";

      if (
        apiMessage.toLowerCase().includes("slot") ||
        apiMessage.toLowerCase().includes("booked")
      ) {
        setSubmitError(
          "This time slot was just booked by someone else. Please choose another available slot."
        );
        setFormData((prev) => ({
          ...prev,
          preferredDate: "",
          preferredTime: "",
        }));
        setSelectedSlotId(null);
        await loadAvailableSlots();
      } else {
        setSubmitError(apiMessage || "Booking failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // CALENDAR GENERATION LOGIC
  // ==========================================

  const formatToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compare = new Date(date);
    compare.setHours(0, 0, 0, 0);
    return compare.getTime() < today.getTime();
  };

  const prevMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const currentYear = currentMonthDate.getFullYear();
  const currentMonth = currentMonthDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 6 = Sat
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  // Empty offset cells
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ type: "empty" as const, id: `empty-${i}` });
  }

  // Day cells
  const todayStr = formatToYMD(new Date());

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(currentYear, currentMonth, d);
    const dayOfWeek = dateObj.getDay(); // 0 = Sun, 6 = Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPast = isBeforeToday(dateObj);
    const dateStr = formatToYMD(dateObj);
    const isSelected = formData.preferredDate === dateStr;
    const isToday = todayStr === dateStr;

    // Disabled if Weekend (Saturday or Sunday) or Past Date
    const isDisabled = isWeekend || isPast;

    calendarDays.push({
      type: "day" as const,
      id: dateStr,
      dayNum: d,
      dateStr,
      isWeekend,
      isPast,
      isDisabled,
      isSelected,
      isToday,
    });
  }

  const handleDateClick = (dateStr: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDate: dateStr,
      preferredTime: "",
    }));
    setSelectedSlotId(null);
    setSubmitError("");
    setErrors((prev) => ({
      ...prev,
      preferredDate: "",
      preferredTime: "",
    }));
  };

  const handleTimeSelect = (startTime: string, slotId: number) => {
    setFormData((prev) => ({
      ...prev,
      preferredTime: startTime,
    }));
    setSelectedSlotId(slotId);
    setSubmitError("");
    setErrors((prev) => ({
      ...prev,
      preferredTime: "",
    }));
  };

  // Check if prev month button should be disabled
  const isCurrentOrPastMonth = () => {
    const now = new Date();
    return (
      currentYear < now.getFullYear() ||
      (currentYear === now.getFullYear() && currentMonth <= now.getMonth())
    );
  };

  return (
    <section className="booking-page">
      <div className="booking-container">
        <h1>Book Your Discovery Call</h1>
        <p>
          Select a date on the calendar (Mondays–Fridays) and pick a time slot for your call.
        </p>

        <div className="booking-card">
          <form onSubmit={handleSubmit}>
            {submitError && (
              <p className="error-banner" role="alert">
                {submitError}
              </p>
            )}

            <h2>Customer Information</h2>

            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(event) => {
                  setFormData({ ...formData, fullName: event.target.value });
                  setErrors({ ...errors, fullName: "" });
                }}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="error-message">{errors.fullName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(event) =>
                  setFormData({ ...formData, companyName: event.target.value })
                }
                placeholder="Enter your company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(event) => {
                  setFormData({ ...formData, email: event.target.value });
                  setErrors({ ...errors, email: "" });
                }}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="error-message">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(event) => {
                  setFormData({ ...formData, phone: event.target.value });
                  setErrors({ ...errors, phone: "" });
                }}
                placeholder="Enter your 10-digit phone number"
              />
              {errors.phone && (
                <p className="error-message">{errors.phone}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget *</label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(event) => {
                  setFormData({ ...formData, budget: event.target.value });
                  setErrors({ ...errors, budget: "" });
                }}
              >
                <option value="">Select your budget</option>
                <option value="under-25000">Under ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                <option value="above-100000">Above ₹1,00,000</option>
              </select>
              {errors.budget && (
                <p className="error-message">{errors.budget}</p>
              )}
            </div>

            <h2>Select Date & Time</h2>

            {/* CALENDAR PICKER SECTION */}
            <div className="form-group">
              <label>Select Date (Mon – Fri) *</label>

              <div className="calendar-card">
                <div className="calendar-header">
                  <button
                    type="button"
                    className="calendar-nav-btn"
                    onClick={prevMonth}
                    disabled={isCurrentOrPastMonth()}
                    title="Previous Month"
                  >
                    ‹
                  </button>
                  <div className="calendar-month-title">
                    {monthNames[currentMonth]} {currentYear}
                  </div>
                  <button
                    type="button"
                    className="calendar-nav-btn"
                    onClick={nextMonth}
                    title="Next Month"
                  >
                    ›
                  </button>
                </div>

                <div className="calendar-weekdays-row">
                  <div className="weekday-header weekend-header">Sun</div>
                  <div className="weekday-header">Mon</div>
                  <div className="weekday-header">Tue</div>
                  <div className="weekday-header">Wed</div>
                  <div className="weekday-header">Thu</div>
                  <div className="weekday-header">Fri</div>
                  <div className="weekday-header weekend-header">Sat</div>
                </div>

                <div className="calendar-grid">
                  {calendarDays.map((cell) => {
                    if (cell.type === "empty") {
                      return <div key={cell.id} className="calendar-day-empty" />;
                    }

                    return (
                      <button
                        key={cell.id}
                        type="button"
                        disabled={cell.isDisabled}
                        onClick={() => handleDateClick(cell.dateStr)}
                        className={`calendar-day-btn ${
                          cell.isDisabled
                            ? `disabled ${cell.isWeekend ? "weekend" : "past"}`
                            : "available"
                        } ${cell.isSelected ? "selected" : ""} ${
                          cell.isToday ? "today" : ""
                        }`}
                        title={
                          cell.isWeekend
                            ? "Weekend (Closed)"
                            : cell.isPast
                            ? "Past date"
                            : `Select ${cell.dateStr}`
                        }
                      >
                        <span>{cell.dayNum}</span>
                        {cell.isWeekend && (
                          <span className="weekend-tag">Off</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="calendar-legend">
                  <div className="legend-item">
                    <span className="legend-dot available" />
                    <span>Available Weekday</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot selected" />
                    <span>Selected Date</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot weekend" />
                    <span>Saturday & Sunday (Closed)</span>
                  </div>
                </div>
              </div>

              {formData.preferredDate && (
                <div className="selected-date-badge">
                  <span>📅 Selected Date:</span>
                  <span>{formatDisplayDate(formData.preferredDate)}</span>
                </div>
              )}

              {slotsError && (
                <p className="error-message">{slotsError}</p>
              )}
              {errors.preferredDate && (
                <p className="error-message">{errors.preferredDate}</p>
              )}
            </div>

            {/* TIME SLOTS SECTION */}
            <div className="form-group">
              <label>Select Preferred Time *</label>
              {!formData.preferredDate ? (
                <div className="no-slots-info">
                  Please select an available weekday on the calendar above to view available time slots.
                </div>
              ) : slotsLoading ? (
                <div className="no-slots-info">Loading time slots...</div>
              ) : timesForSelectedDate.length === 0 ? (
                <div className="no-slots-info">
                  No available time slots on {formatDisplayDate(formData.preferredDate)}. Please select another date.
                </div>
              ) : (
                <div className="time-slots-grid">
                  {timesForSelectedDate.map((slot) => {
                    const isTimeSelected = formData.preferredTime === slot.startTime;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        className={`time-slot-btn ${isTimeSelected ? "selected" : ""}`}
                        onClick={() => handleTimeSelect(slot.startTime, slot.id)}
                      >
                        {slot.startTime} - {slot.endTime}
                      </button>
                    );
                  })}
                </div>
              )}
              {errors.preferredTime && (
                <p className="error-message">{errors.preferredTime}</p>
              )}
            </div>

            <div className="form-group">
              <label>Meeting Method *</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="meetingMethod"
                    value="Google Meet"
                    checked={formData.meetingMethod === "Google Meet"}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        meetingMethod: event.target.value,
                      });
                      setErrors({ ...errors, meetingMethod: "" });
                    }}
                  />
                  Google Meet
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="meetingMethod"
                    value="Zoom"
                    checked={formData.meetingMethod === "Zoom"}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        meetingMethod: event.target.value,
                      });
                      setErrors({ ...errors, meetingMethod: "" });
                    }}
                  />
                  Zoom
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="meetingMethod"
                    value="Microsoft Teams"
                    checked={formData.meetingMethod === "Microsoft Teams"}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        meetingMethod: event.target.value,
                      });
                      setErrors({ ...errors, meetingMethod: "" });
                    }}
                  />
                  Microsoft Teams
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="meetingMethod"
                    value="Phone Call"
                    checked={formData.meetingMethod === "Phone Call"}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        meetingMethod: event.target.value,
                      });
                      setErrors({ ...errors, meetingMethod: "" });
                    }}
                  />
                  Phone Call
                </label>
              </div>
              {errors.meetingMethod && (
                <p className="error-message">{errors.meetingMethod}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="additionalNotes">Additional Notes</label>
              <textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    additionalNotes: event.target.value,
                  })
                }
                placeholder="Tell us anything else about your project or meeting preferences..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Discovery Call"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Booking;