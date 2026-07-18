import { useState } from "react";
import "./PlanWebsite.css";

function PlanWebsite() {
  const [fullName, setFullName] = useState("");
const [businessName, setBusinessName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
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

</div>

      </div>

    </section>
  );
}

export default PlanWebsite;