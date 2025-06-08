import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';
import logo from '../ecom_logo.png';

const initialData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  gender: "",            // Added gender field
  password: "",
  showPassword: false,
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

function Form() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const countries = {
    India: ["Pune", "Mumbai", "Delhi"],
    USA: ["New York", "San Francisco", "Los Angeles"],
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.gender) newErrors.gender = "Select gender";  // Gender validation
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.country) newErrors.country = "Select a country";
    if (!formData.city) newErrors.city = "Select a city";
    if (!formData.pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)) newErrors.pan = "Invalid PAN";
    if (!formData.aadhar.match(/^\d{12}$/)) newErrors.aadhar = "Invalid Aadhar";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="logo">
        <img src={logo} alt="E-Shop Logo" />
      </div>
      <h2>Sign Up</h2>

      <div>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>

      <div>
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>

      <div>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>

      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      {/* Added Gender dropdown */}
      <div>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span>{errors.gender}</span>}
      </div>

      <div>
        <input
          name="phone"
          placeholder="Phone Number (10 digits)"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div>
        <input
          name="pan"
          placeholder="PAN Number"
          value={formData.pan}
          onChange={handleChange}
        />
        {errors.pan && <span>{errors.pan}</span>}
      </div>

      <div>
        <input
          name="aadhar"
          placeholder="Aadhar Number"
          value={formData.aadhar}
          onChange={handleChange}
        />
        {errors.aadhar && <span>{errors.aadhar}</span>}
      </div>

      <div className="full-width">
        <input
          name="password"
          type={formData.showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countries).map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        {errors.country && <span>{errors.country}</span>}
      </div>

      <div>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.country}
        >
          <option value="">Select City</option>
          {formData.country &&
            countries[formData.country].map((city) => (
              <option key={city}>{city}</option>
            ))}
        </select>
        {errors.city && <span>{errors.city}</span>}
      </div>

      <button type="submit">Create Account</button>

      <div className="login-link">
        Already have an account? <a href="#">Login</a>
      </div>
    </form>
  );
}

export default Form;
