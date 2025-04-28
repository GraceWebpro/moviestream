import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore"; // For saving user data
import { registerWithEmail } from "../firebase/firebaseConfig"; // Import the registration function
import { db } from "../firebase/firebaseConfig"; // Firestore import
import "./Admin.css"; // Import the CSS file

function AdminRegister() {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state for better error handling
  const navigate = useNavigate(); // For navigation after successful registration

  // Registration handler
  const handleRegister = async () => {
    setLoading(true); // Set loading before starting registration
    setError(""); // Reset any previous error

    try {
      // Call the registerWithEmail function to create a new user
      const userCredential = await registerWithEmail(email, password);
      
      if (!userCredential) return; // If there's an issue with userCredential, just stop

      // Extract user from credential object
      const user = userCredential.user;

      // Create a new document in Firestore for the user, with 'admin' role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "admin", // Assign 'admin' role to this user
      });

      // Redirect to admin dashboard after successful registration
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Registration Error:", err);
      setError("An error occurred during registration. Please try again."); // Show error
    } finally {
      setLoading(false); // Stop loading once registration process is complete
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Admin Register</h2>

        {/* Display Error if any */}
        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"} {/* Button text changes based on loading */}
        </button>

        {/* Link to login page if already have an account */}
        <p>
          Already have an account? <a href="/admin/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;
