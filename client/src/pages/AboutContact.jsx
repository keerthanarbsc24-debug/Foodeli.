
import { Component, useState } from "react";

// Class Component: displays information about Foodeli
class AboutSection extends Component {
  render() {
    return (
      <section className="about-hero">
        <span className="about-tag">OUR STORY</span>
        <h1>Good food. Good mood.</h1>
        <p className="about-intro">
          Welcome to Foodeli, your simple and convenient food
          ordering companion. We bring your favourite meals
          closer to you with an easy ordering experience.
        </p>

        <div className="about-mission">
          <div>
            <h2>Our Mission</h2>
            <p>
              To make ordering delicious food easy, convenient,
              and enjoyable for everyone, especially students.
            </p>
          </div>

          <div>
            <h2>Our Values</h2>
            <p>
              Quality, convenience, affordability, and a
              delightful experience with every order.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

// Functional Component: handles the contact form
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <section className="contact-section">
      <div className="contact-info">
        <span className="about-tag">GET IN TOUCH</span>
        <h2>We'd love to hear from you.</h2>
        <p>
          Have a question, suggestion, or feedback?
          Send us a message using the form.
        </p>

        <div className="contact-detail">
          <strong>Our Email</strong>
          <p>hello@foodeli.example</p>
        </div>

        <div className="contact-detail">
          <strong>Our Promise</strong>
          <p>We value your feedback and ideas.</p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send us a message</h3>

        <label htmlFor="contact-name">Your Name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact-email">Email Address</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact-message">Your Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Write your message here..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="contact-submit">
          Send Message
        </button>

        {submitted && (
          <p className="contact-success" role="status">
            Thank you, your message has been submitted successfully!
          </p>
        )}
      </form>
    </section>
  );
}

// Main page combines the class and functional components
function AboutContact() {
  return (
    <main className="about-contact-page">
      <AboutSection />
      <ContactForm />
    </main>
  );
}

export default AboutContact;