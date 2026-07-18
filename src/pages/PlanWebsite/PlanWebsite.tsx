import { useState } from "react";
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
  const [fullName, setFullName] = useState("");
const [businessName, setBusinessName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [websiteSize, setWebsiteSize] = useState("");
const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
const [hosting, setHosting] = useState("");
const [maintenance, setMaintenance] = useState("");
const [seo, setSeo] = useState("");
const handleFeatureChange = (feature: string) => {
  if (selectedFeatures.includes(feature)) {
    setSelectedFeatures(
      selectedFeatures.filter((item) => item !== feature)
    );
  } else {
    setSelectedFeatures([...selectedFeatures, feature]);
  }
};
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

      <div className="plan-card">

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
      onChange={(e) => setFullName(e.target.value)}
    />
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
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label htmlFor="phone">Phone Number</label>
    <input
      id="phone"
      type="tel"
      placeholder="Enter your phone number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
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

</div>

      </div>

    </section>
  );
}

export default PlanWebsite;