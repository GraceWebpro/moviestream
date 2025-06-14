import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase/firebaseConfig'
import UserSettings from "./UserSettings";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Admin.css";
import UploadMovie from "./UploadMovie";
import UploadEpisode from "./UploadEpisode";
import EditMovie from "./EditMovie";
import DeleteMovie from "./DeleteMovie";
import { Link } from "react-router-dom";
import AnalyticsPage from "./Analytics";
import MusicUpload from "./UploadMusic";
import EditContent from "./EditMovie";
import DeleteContent from "./DeleteMovie";
import UploadContent from "./UploadMovie";
import UploadBlog from "./UploadBlog";


const AdminDashboard = () => {
  const [role, setRole] = useState(null); // State to store the user's role
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();


  // Listen for user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/admin/login");
      } else {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const fetchedRole = userDoc.data().role;
            setRole(fetchedRole);
  
            if (fetchedRole === "admin") {
              setLoading(true);
              const querySnapshot = await getDocs(collection(db, "movies"));
              const movieList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setMovies(movieList);
              console.log("Fetched Movies:", movieList);
              setLoading(false);
            } else {
              navigate("/");
            }
          } else {
            console.error("User not found in Firestore");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user role or projects:", error);
          setLoading(false);
        }
      }
    });
  
    return () => unsubscribe();
  }, [auth, db, navigate]);
  
  // Define the logout function
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Loading state until role is fetched
  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
    {/* Sidebar */}
    <div className={`dashboard-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <button className="admin-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isSidebarOpen && (
        <div className="sidebar-content">
          <h2 style={{ marginTop: '40px' }}>Admin Panel</h2>
         
          {user && <p className="admin-email">Welcome, {user.email}</p>}
          <ul>
            <li onClick={() => setActiveTab("dashboard")} className={activeTab === "dashboard" ? "active" : ""}>📊 Dashboard</li>
            <li onClick={() => setActiveTab("upload")} className={activeTab === "upload" ? "active" : ""}>📤 Upload</li>
            <li onClick={() => setActiveTab("uploadBlog")} className={activeTab === "uploadBlog" ? "active" : ""}>📤 Upload Blog</li>

            <li onClick={() => setActiveTab("edit")} className={activeTab === "edit" ? "active" : ""}>✏️ Edit </li>
            <li onClick={() => setActiveTab("delete")} className={activeTab === "delete" ? "active" : ""}>🗑️ Delete </li>
            <li onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? "active" : ""}>⚙️ User Settings</li>
          </ul>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      )}
    </div>

    {/* Main Content */}
    <div className="dashboard-content">
      {activeTab === "dashboard" && (
        <div className="content-container">
            <div className="content-header">
                <h2>Dashboard</h2>
                <p className="ana-btn"><li onClick={() => setActiveTab("analytics")} className={activeTab === "analytics" ? "active" : ""}>
                    Analytics
                </li>
                </p>
            </div>
          <table className="dashboard-table">
            <thead>
              <tr>
              <th>ID</th>
            <th>Movie Name</th>
            <th>Description</th>
            <th>Release Year</th>
            <th>Featured</th>
            <th>Top Pick</th>
            <th>New Release</th>
              </tr>
            </thead>
            <tbody>
                {movies.length > 0 ? (
                    movies.map((movie) => {
                        console.log(movie); // Log the movie object to inspect its structure
                        return (
                            <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.description}</td>
                            <td>{movie.releaseYear}</td>
                            <td>{movie.isFeatured ? "Yes" : "No"}</td>
                            <td>{movie.topPick ? "Yes" : "No"}</td>
                            <td>{movie.newRelease ? "Yes" : "No"}</td>
                          </tr>
                        );
                    })
                    ) : (
                    <tr>
                        <td colSpan="3">No movies found</td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "upload" && <UploadContent/>}
      {activeTab === "uploadBlog" && <UploadBlog/>}

      {activeTab === "edit" && <EditContent movies={movies}/>} {/* Pass projects */}
      {activeTab === "delete" && <DeleteContent movies={movies} />} {/* Pass projects */}
      {activeTab === "analytics" && <AnalyticsPage />}
      {activeTab === "settings" && <UserSettings />}
    </div>
  </div>
  )
}

export default AdminDashboard
