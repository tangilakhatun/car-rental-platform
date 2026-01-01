# RentWheels – Car Rental Platform

[Live Site]('https://musical-semifreddo-d13300.netlify.app/')  

RentWheels is a full-stack MERN car rental platform that connects users with local car owners and rental providers. Users can browse available cars, view details, and book rentals for specific dates, while providers can list their vehicles, manage bookings, and update availability.

---

## Main Features

- **Browse Cars:** View all available cars listed by users with car details including name, category, price, provider info, and availability.
- **User Authentication:** Secure login and registration with Email/Password and Google authentication.
- **Add & Manage Cars:** Providers can add new cars, update details, and delete listings from their personal dashboard.
- **Booking System:** Users can book cars, see booking history, and prevent double bookings with real-time availability updates.
- **Dynamic UI & Responsive Design:** Fully responsive layout, modern fonts, uniform car cards, animated sections, and toast notifications for success/error messages.

---

## Pages & Functionality

### Navbar & Footer
- Navbar links: Home, Add Car, My Listings, My Bookings, Browse Cars, Login/Signup.
- Conditional rendering for logged-in users showing profile photo, dropdown with name, email, and logout.
- Footer includes logo, website name, contact info, terms & conditions, and social media links.
- Navbar and footer are present on all pages except the 404 page.

### Home Page
- Hero banner with 3 animated slides showcasing the platform.
- Featured Cars section displays the 6 newest cars from MongoDB.
- "Why Rent With Us" section highlighting platform benefits.
- Extra sections like Top Rated Cars and Customer Testimonials.

### Authentication
- **Login Page:** Email, password, Google login, link to register page.
- **Register Page:** Name, email, photoURL, password, Google login, link to login page.
- Password validation: minimum 6 characters, at least one uppercase and one lowercase letter.
- Toast/SweetAlert notifications for errors and success messages.

### CRUD Operations
- **Add Car:** Fields include Car Name, Description, Category, Rent Price, Location, Image URL, Provider Name/Email.
- **My Listings:** View, update, and delete provider's own cars.
- **My Bookings:** View all booked cars by the user.
- **Browse Cars:** Public page showing all available cars.
- **Car Details:** Private route showing full car information and booking option.

### Extra Functionality
- Loading spinner during data fetches.
- Badges indicating car availability.
- Search functionality to find cars by name.
- Animations using Framer Motion, React Typewriter, React Tooltip, and Lottie React.

---

## Technologies Used

- **Frontend:** React.js, React Router, Tailwind CSS, Framer Motion, React Simple Typewriter, React Tooltip, Lottie React
- **Backend:** Node.js, Express.js, MongoDB, Firebase Authentication
- **Hosting:** Client-side → Netlify / Surge / Firebase, Server-side → Vercel
- **Other:** Axios for API requests, SweetAlert2/React Toastify for notifications

---

## Screenshots

*(Add screenshots of your Home page, Add Car page, My Listings, My Bookings, Browse Cars, and Car Details here)*

---

## GitHub Repositories

- [Client Repository]('https://github.com/tangilakhatun/car-rental-platform.git')  
- [Server Repository]('https://github.com/tangilakhatun/Assignment-Crud-Service.git')

---

## Live Links
https://musical-semifreddo-d13300.netlify.app/
- **Client:
- **Server:**
https://car-rental-server-side.vercel.app/
---

## Notes

- Ensure Firebase authorization is set for Netlify/Surge hosted client.
- All private routes are protected; logged-in users won’t be redirected to login upon reload.
- Car status updates dynamically upon booking to prevent double bookings.
