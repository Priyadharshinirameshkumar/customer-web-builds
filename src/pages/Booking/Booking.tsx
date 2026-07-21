
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

const availableDates = [
  ...new Set(slots.map((slot) => formatSlotDate(slot.date))),
];

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
    newErrors.preferredDate = "Please select a preferred date.";
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
    // Validation logic will go here

    return newErrors;
};
const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
console.log("Submit button clicked");
    const validationErrors = validateForm();
    console.log(validationErrors);
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

  console.log("Form Submitted Successfully");
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
    return (
        <section className="booking-page">
            <div className="booking-container">
                <h1>Book Your Discovery Call</h1>

                <p>
                    Let's discuss your website requirements and schedule a
                    convenient time to talk.
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
<label htmlFor="fullName">
    Full Name
</label>
<input
    type="text"
    id="fullName"
    value={formData.fullName}
    onChange={(event) => {
    setFormData({
        ...formData,
        fullName: event.target.value,
    });

    setErrors({
        ...errors,
        fullName: "",
    });
}}
    placeholder="Enter your full name"
/>
{errors.fullName && (
    <p className="error-message">
        {errors.fullName}
    </p>
)}
</div>
<div className="form-group">
<label htmlFor="companyName">
    Company Name
</label>
<input
    type="text"
    id="companyName"
    value={formData.companyName}
    onChange={(event) =>
        setFormData({
            ...formData,
            companyName: event.target.value,
        })
    }
    placeholder="Enter your company name"
/>
</div>
<div className="form-group">
<label htmlFor="email">
    Email Address
</label>
<input
    type="email"
    id="email"
    value={formData.email}
    onChange={(event) => {
    setFormData({
        ...formData,
        email: event.target.value,
    });

    setErrors({
        ...errors,
        email: "",
    });
}}
    placeholder="Enter your email address"
/>
{errors.email && (
    <p className="error-message">
        {errors.email}
    </p>
)}
</div>
<div className="form-group">
<label htmlFor="phone">
    Phone Number
</label>
<input
    type="tel"
    id="phone"
    value={formData.phone}
    onChange={(event) => {
    setFormData({
        ...formData,
        phone: event.target.value,
    });

    setErrors({
        ...errors,
        phone: "",
    });
}}
    placeholder="Enter your phone number"
/>
{errors.phone && (
    <p className="error-message">
        {errors.phone}
    </p>
)}
</div>
<div className="form-group">
<label htmlFor="budget">
    Budget
</label>
<select
    id="budget"
    value={formData.budget}
    onChange={(event) => {
    setFormData({
        ...formData,
        budget: event.target.value,
    });

    setErrors({
        ...errors,
        budget: "",
    });
}}
>
    <option value="">Select your budget</option>

    <option value="under-25000">
        Under ₹25,000
    </option>

    <option value="25000-50000">
        ₹25,000 - ₹50,000
    </option>

    <option value="50000-100000">
        ₹50,000 - ₹1,00,000
    </option>

    <option value="above-100000">
        Above ₹1,00,000
    </option>
</select>
{errors.budget && (
    <p className="error-message">
        {errors.budget}
    </p>
)}
</div>
<div className="form-group">
<label htmlFor="preferredDate">
    Preferred Date
</label>
<select
    id="preferredDate"
    value={formData.preferredDate}
    disabled={slotsLoading || availableDates.length === 0}
   onChange={(event) => {
    setFormData({
        ...formData,
        preferredDate: event.target.value,
        preferredTime: "",
    });
    setSelectedSlotId(null);
    setSubmitError("");

    setErrors({
        ...errors,
        preferredDate: "",
        preferredTime: "",
    });
}}
>
    <option value="">
        {slotsLoading
            ? "Loading available dates..."
            : availableDates.length === 0
              ? "No available dates"
              : "Select a date"}
    </option>
    {availableDates.map((date) => (
        <option key={date} value={date}>
            {date}
        </option>
    ))}
</select>
{slotsError && (
    <p className="error-message">
        {slotsError}
    </p>
)}
{errors.preferredDate && (
    <p className="error-message">
        {errors.preferredDate}
    </p>
)}
</div>
<div className="form-group">
<label htmlFor="preferredTime">
    Preferred Time
</label>
<select
    id="preferredTime"
    value={formData.preferredTime}
    disabled={!formData.preferredDate || timesForSelectedDate.length === 0}
    onChange={(event) => {
    const selectedTime = event.target.value;
    const selectedSlot = timesForSelectedDate.find(
      (slot) => slot.startTime === selectedTime
    );

    setSelectedSlotId(selectedSlot?.id ?? null);
    setFormData({
        ...formData,
        preferredTime: selectedTime,
    });
    setSubmitError("");

    setErrors({
        ...errors,
        preferredTime: "",
    });
}}
>
    <option value="">
        {!formData.preferredDate
            ? "Select a date first"
            : timesForSelectedDate.length === 0
              ? "No available times"
              : "Select a time"}
    </option>
    {timesForSelectedDate.map((slot) => (
        <option key={`${slot.startTime}-${slot.endTime}`} value={slot.startTime}>
            {slot.startTime} - {slot.endTime}
        </option>
    ))}
</select>
{errors.preferredTime && (
    <p className="error-message">
        {errors.preferredTime}
    </p>
)}
</div>
<div className="form-group">
<label>Meeting Method</label>
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

    setErrors({
        ...errors,
        meetingMethod: "",
    });
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

    setErrors({
        ...errors,
        meetingMethod: "",
    });
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

    setErrors({
        ...errors,
        meetingMethod: "",
    });
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

    setErrors({
        ...errors,
        meetingMethod: "",
    });
}}
    />

    Phone Call
</label>
</div>
{errors.meetingMethod && (
    <p className="error-message">
        {errors.meetingMethod}
    </p>
)}
</div>

<div className="form-group">
<label htmlFor="additionalNotes">
    Additional Notes
</label>
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
    rows={5}
/>
</div>
<button
    type="submit"
    className="submit-button"
    disabled={isSubmitting}
>
    {isSubmitting
        ? "Submitting..."
        : "Book Discovery Call"}
</button>
    </form>
</div>
            </div>
        </section>
    );
}

export default Booking;