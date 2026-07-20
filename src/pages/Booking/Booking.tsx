import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Booking.css";
function Booking() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
     budget: "",
     preferredDate: "",
     preferredTime: "",
     meetingMethod: "",
     additionalNotes: "",
});
const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "",
    preferredDate: "",
    preferredTime: "",
    meetingMethod: "",
});
const navigate = useNavigate();
const [isSubmitted, setIsSubmitted] = useState(false);
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
if (formData.meetingMethod === "") {
    newErrors.meetingMethod = "Please choose a meeting method.";
}
    // Validation logic will go here

    return newErrors;
};
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  console.log("Form Submitted Successfully");

navigate("/thank-you");
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
                  {isSubmitted && (
    <div className="success-message">
        🎉 Your discovery call request has been submitted successfully!
    </div>
)}
   <form onSubmit={handleSubmit}>
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
<input
    type="date"
    id="preferredDate"
    value={formData.preferredDate}
    min={new Date().toISOString().split("T")[0]}
   onChange={(event) => {
    setFormData({
        ...formData,
        preferredDate: event.target.value,
    });

    setErrors({
        ...errors,
        preferredDate: "",
    });
}}
/>
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
<input
    type="time"
    id="preferredTime"
    value={formData.preferredTime}
    min="09:00"
    max="18:00"
    onChange={(event) => {
    setFormData({
        ...formData,
        preferredTime: event.target.value,
    });

    setErrors({
        ...errors,
        preferredTime: "",
    });
}}
/>
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
<button type="submit" className="submit-button">
    Book Discovery Call
</button>
    </form>
</div>
            </div>
        </section>
    );
}

export default Booking;