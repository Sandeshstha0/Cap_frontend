/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Layout from "@/Components/globalComponent/Landingpage/MainLayout";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let tempErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }
    if (!formData.message) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      try {
        // Replace with your backend endpoint
        const response = await axios.post("/api/contact", formData);
        alert("Message sent successfully!");

        // Clear the form after successful submission
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        alert("Error sending message. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Layout>
      {/* Main Container */}
      <div className="flex flex-col mt-16 md:flex-row justify-between items-center bg-white px-6 md:px-16 py-10 gap-8">
        {/* Contact Form Section */}
        <div className="w-full md:w-2/5">
          <h2 className="text-4xl font-bold text-black text-center mb-8">
            Contact Us
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="flex items-center space-x-4">
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                className="w-full"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center space-x-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                className="w-full"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>

            {/* Message Input */}
            <TextField
              id="message"
              name="message"
              label="Your Message"
              variant="outlined"
              className="w-full"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              error={!!errors.message}
              helperText={errors.message}
            />

            {/* Send Message Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-xl w-full text-white font-semibold rounded-full px-8 py-3 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-8">
          <img
            src="/16.png"
            className="rounded-lg w-full max-w-md h-auto"
            alt="Contact Us"
          />
        </div>
      </div>
    </Layout>
  );
}
