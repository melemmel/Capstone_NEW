
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCaSHRLbIRWW8COl5iwHb19dMDYYLJ2DIk",          
  authDomain: "centralcomm-248a9.firebaseapp.com",            
  databaseURL: "https://centralcomm-248a9-default-rtdb.firebaseio.com",  
  projectId: "centralcomm-248a9",                             
  storageBucket: "centralcomm-248a9.firebasestorage.app",     
  messagingSenderId: "796912003621",                          
  appId: "1:796912003621:web:0d6fd82e43399871a9edcc"         
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    // If no user is logged in, redirect to login page
    if (!user) {
      window.location.href = '../auth/select-user-type.html';
      return;
    }
    
    // Get user type from session storage (set during login)
    const userType = sessionStorage.getItem('userType');
    // Get the current page filename from the URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if user is staff and restrict access to specific pages
    if (userType === 'staff') {
      // List of pages that staff members are allowed to access
      const allowedStaffPages = [
        'Receiving-Section-Staff.html',
        'Receiving-Dashboard.html'
      ];
      
      // If staff tries to access unauthorized page, redirect them
      if (!allowedStaffPages.includes(currentPage)) {
        window.location.href = '../receiving/Receiving-Section-Staff.html';
        return;
      }
    }
    
    // Set up logout button functionality if the button exists on the page
    const logoutBtn = document.getElementById('logoutButton');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
  });
});

// Function to handle user logout
async function handleLogout() {
  try {
    // Sign out the user from Firebase authentication
    await auth.signOut();
    // Clear all session storage data
    sessionStorage.clear();
    // Redirect to login page after logout
    window.location.href = '../auth/select-user-type.html';
  } catch (error) {
    // Log any errors that occur during logout
    console.error("Logout error:", error);
  }
}