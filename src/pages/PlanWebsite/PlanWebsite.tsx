import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWebsitePlan } from "../../services/websitePlan.service";
import "./PlanWebsite.css";
const websiteFeatures = [
  "Contact Form",
  "Appointment Booking",
  "Automated Email Notifications",
  "Live Chat",
  "WhatsApp Integration",
  "Blog",
  "E-Commerce Store",
];
function PlanWebsite() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
const [businessName, setBusinessName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [websiteSize, setWebsiteSize] = useState("");
const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
const [hosting, setHosting] = useState("");
const [maintenance, setMaintenance] = useState("");
const [seo, setSeo] = useState("");
const [additionalRequirements, setAdditionalRequirements] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [needsConsultation, setNeedsConsultation] = useState(false);
const handleFeatureChange = (feature: string) => {
  if (selectedFeatures.includes(feature)) {
    setSelectedFeatures(
      selectedFeatures.filter((item) => item !== feature)
    );
  } else {
    setSelectedFeatures([...selectedFeatures, feature]);
  }
};
const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = {
    fullName: "",
    email: "",
    phone: ""
};
if (fullName.trim() === "") {
    validationErrors.fullName = "Full Name is required";
}
if (email.trim() === "") {
    validationErrors.email = "Email is required";
}
if (phone.trim() === "") {
    validationErrors.phone = "Phone Number is required";
}
setErrors(validationErrors);

const hasErrors = Object.values(validationErrors).some(
    (error) => error !== ""
);
if (hasErrors) {
    return;
}
setIsSubmitting(true);

try {
console.log({
    fullName,
    businessName,
    email,
    phone,
    websiteSize,
    selectedFeatures,
    hosting,
    maintenance,
    seo,
    additionalRequirements
});
    const response = await createWebsitePlan({
        fullName,
        businessName,
        email,
        phone,

        websiteSize,

        // Since your form doesn't have these fields yet,
        // send empty strings for now.
        businessType: "Business Website",
        targetAudience: "",

        // Convert array of selected features to a string
        features: selectedFeatures.join(", "),

        hosting,
        maintenance,

        seoRequirement: seo,

        additionalRequirements,
    });
    const websitePlanId = response.data.id;
console.log(websitePlanId);
    // Clear the form
    setFullName("");
    setBusinessName("");
    setEmail("");
    setPhone("");
    setWebsiteSize("");
    setSelectedFeatures([]);
    setHosting("");
    setMaintenance("");
    setSeo("");
    setAdditionalRequirements("");
    setNeedsConsultation(false);

   navigate("/booking", {
  state: {
    websitePlanId,
  },
});

} catch (error) {

    console.error(error);

    alert("Failed to submit website plan.");

}
finally {
    setIsSubmitting(false);
}
   
};
const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: ""
});
  return (
    <section className="plan-page">

      <div className="plan-header">

        <h1>Plan My Website</h1>

        <p>
          Tell us about your business and website requirements.
          We'll recommend the best solution and prepare for your
          discovery call.
        </p>

      </div>

      <form className="plan-card"
      onSubmit={handleSubmit}>

        <h2>Website Requirements</h2>
        <div className="form-section">

  <h3>Customer Information</h3>

  <div className="form-group">
    <label htmlFor="fullName">Full Name</label>
    <input
      id="fullName"
      type="text"
      placeholder="Enter your full name"
      value={fullName}
      onChange={(e) => {
        setFullName(e.target.value);

        setErrors({
            ...errors,
            fullName: ""
        });
    }}
    />
    {errors.fullName && (
    <p className="error-message">
        {errors.fullName}
    </p>
)}
  </div>

  <div className="form-group">
    <label htmlFor="businessName">Business Name</label>
    <input
      id="businessName"
      type="text"
      placeholder="Enter your business name"
      value={businessName}
      onChange={(e) => setBusinessName(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => {
    setEmail(e.target.value);

    setErrors({
        ...errors,
        email: ""
    });
}}
    />
    {errors.email && (
    <p className="error-message">
        {errors.email}
    </p>
)}
  </div>

  <div className="form-group">
    <label htmlFor="phone">Phone Number</label>
    <input
      id="phone"
      type="tel"
      placeholder="Enter your phone number"
      value={phone}
    onChange={(e) => {
    setPhone(e.target.value);

    setErrors({
        ...errors,
        phone: ""
    });
}}
    />
    {errors.phone && (
    <p className="error-message">
        {errors.phone}
    </p>
)}
  </div>
  <fieldset className="form-section">
  <legend>Website Size</legend>

  <label className="radio-option">
    <input
      type="radio"
      name="websiteSize"
      value="1-5"
      checked={websiteSize === "1-5"}
      onChange={(e) => setWebsiteSize(e.target.value)}
    />
    <span>1–5 Pages (Small Website)</span>
  </label>

  <label className="radio-option">
    <input
      type="radio"
      name="websiteSize"
      value="6-10"
      checked={websiteSize === "6-10"}
      onChange={(e) => setWebsiteSize(e.target.value)}
    />
    <span>6–10 Pages (Business Website)</span>
  </label>

  <label className="radio-option">
    <input
      type="radio"
      name="websiteSize"
      value="11-20"
      checked={websiteSize === "11-20"}
      onChange={(e) => setWebsiteSize(e.target.value)}
    />
    <span>11–20 Pages (Large Website)</span>
  </label>

  <label className="radio-option">
    <input
      type="radio"
      name="websiteSize"
      value="20+"
      checked={websiteSize === "20+"}
      onChange={(e) => setWebsiteSize(e.target.value)}
    />
    <span>More than 20 Pages</span>
  </label>
</fieldset>
<fieldset className="form-section">
  <legend>Website Features</legend>

  {websiteFeatures.map((feature) => (
    <label key={feature} className="checkbox-option">

      <input
        type="checkbox"
        checked={selectedFeatures.includes(feature)}
        onChange={() => handleFeatureChange(feature)}
      />

      <span>{feature}</span>

    </label>
  ))}

</fieldset>
<fieldset className="form-section">

    <legend>Support Requirements</legend>

    <div className="form-group">

        <label htmlFor="hosting">
            Hosting
        </label>

        <select
            id="hosting"
            value={hosting}
            onChange={(e) => setHosting(e.target.value)}
        >

            <option value="">
                Select Hosting Option
            </option>

            <option value="Need Hosting">
                Need Hosting
            </option>

            <option value="Already Have Hosting">
                Already Have Hosting
            </option>

            <option value="Not Sure">
                Not Sure
            </option>

        </select>

    </div>

    <div className="form-group">

        <label htmlFor="maintenance">
            Maintenance
        </label>

        <select
            id="maintenance"
            value={maintenance}
            onChange={(e) => setMaintenance(e.target.value)}
        >

            <option value="">
                Select Maintenance Frequency
            </option>

            <option value="Monthly">
                Monthly
            </option>

            <option value="Quarterly">
                Quarterly
            </option>

            <option value="Yearly">
                Yearly
            </option>

            <option value="No Maintenance">
                No Maintenance
            </option>

        </select>

    </div>

    <div className="form-group">

        <label htmlFor="seo">
            SEO Requirement
        </label>

        <select
            id="seo"
            value={seo}
            onChange={(e) => setSeo(e.target.value)}
        >

            <option value="">
                Select SEO Requirement
            </option>

            <option value="Basic SEO">
                Basic SEO
            </option>

            <option value="Advanced SEO">
                Advanced SEO
            </option>

            <option value="No SEO">
                No SEO
            </option>

            <option value="Not Sure">
                Not Sure
            </option>

        </select>

    </div>

</fieldset>
<fieldset className="form-section">

  <legend>Additional Requirements</legend>

  <div className="form-group">

    <label htmlFor="additionalRequirements">
      Tell us anything else about your project
    </label>

    <textarea
      id="additionalRequirements"
      rows={5}
      placeholder="Example: I already have a logo, I need multilingual support, I have an existing website..."
      value={additionalRequirements}
      onChange={(e) => setAdditionalRequirements(e.target.value)}
    />

  </div>

  <label className="checkbox-option">

    <input
      type="checkbox"
      checked={needsConsultation}
      onChange={(e) =>
        setNeedsConsultation(e.target.checked)
      }
    />

    <span>
      I don't know where to start. Please help me choose the right solution.
    </span>

  </label>

</fieldset>

</div>
<div className="submit-section">
<button
    type="submit"
    disabled={isSubmitting}
>
    {isSubmitting ? "Submitting..." : "Continue →"}
</button>
</div>
</form>

    </section>
  );
}

export default PlanWebsite;