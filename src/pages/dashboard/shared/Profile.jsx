// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../../provider/AuthProvider";
// import { updateProfile } from "firebase/auth";
// import { auth } from "../../../firebase/firebase.config";
// import api from "../../../api/api";

// const Profile = () => {
//   const { user, refreshUser } = useContext(AuthContext);
//   const [isEditing, setIsEditing] = useState(false);

//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     photo: "",
//     phone: "",
//     address: "",
//   });

//   // Sync Auth user with state
//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         name: user.displayName || "",
//         email: user.email || "",
//         photo: user.photoURL || "",
//         phone: user.phone || "",
//         address: user.address || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setProfileData({
//       ...profileData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     try {
//       // 1️⃣ Firebase update
//       await updateProfile(auth.currentUser, {
//         displayName: profileData.name,
//         photoURL: profileData.photo,
//       });

//       // 2️⃣ Backend update
//       await api.put("/users/profile", profileData, {
//         headers: {
//           Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
//         },
//       });

//       // 3️⃣ Refresh context user → Navbar auto update
//       await refreshUser();

//       setIsEditing(false);
//       alert("Profile updated successfully ✅");
//     } catch (error) {
//       console.error(error);
//       alert("Profile update failed ❌");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 transition-colors duration-300">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 transition-colors duration-300">
//         My Profile
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center gap-4">
//           <img
//             src={profileData.photo || "https://i.ibb.co/2Fx7r2J/avatar.png"}
//             alt="Profile"
//             className="w-40 h-40 rounded-full border-4 border-orange-500 object-cover transition-colors duration-300"
//           />
//           {isEditing && (
//             <input
//               type="text"
//               name="photo"
//               value={profileData.photo}
//               onChange={handleChange}
//               placeholder="Photo URL"
//               className="input input-bordered w-full bg-white transition-colors duration-300"
//             />
//           )}
//         </div>

//         {/* Profile Info */}
//         <div className="md:col-span-2 space-y-4">
//           {/* Name */}
//           <div>
//             <label className="font-semibold text-gray-700 transition-colors duration-300">
//               Full Name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={profileData.name}
//                 onChange={handleChange}
//                 className="input input-bordered w-full mt-1 bg-white transition-colors duration-300"
//               />
//             ) : (
//               <p className="mt-1 text-gray-800 transition-colors duration-300">
//                 {profileData.name}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="font-semibold text-gray-700 transition-colors duration-300">
//               Email
//             </label>
//             <p className="mt-1 text-gray-800 transition-colors duration-300">
//               {profileData.email}
//             </p>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="font-semibold text-gray-700 transition-colors duration-300">
//               Phone
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleChange}
//                 className="input input-bordered w-full mt-1 bg-white transition-colors duration-300"
//               />
//             ) : (
//               <p className="mt-1 text-gray-800 transition-colors duration-300">
//                 {profileData.phone || "Not added"}
//               </p>
//             )}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="font-semibold text-gray-700 transition-colors duration-300">
//               Address
//             </label>
//             {isEditing ? (
//               <textarea
//                 name="address"
//                 value={profileData.address}
//                 onChange={handleChange}
//                 className="textarea textarea-bordered w-full mt-1 bg-white transition-colors duration-300"
//               />
//             ) : (
//               <p className="mt-1 text-gray-800 transition-colors duration-300">
//                 {profileData.address || "Not added"}
//               </p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 pt-4">
//             {isEditing ? (
//               <>
//                 <button
//                   onClick={handleSave}
//                   className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import api from "../../../api/api";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: profileData.name,
        photoURL: profileData.photo,
      });

      await api.put("/users/profile", profileData, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
        },
      });

      await refreshUser();
      setIsEditing(false);
      toast("Profile updated successfully ✅");
    } catch (error) {
      console.error(error);
      toast("Profile update failed ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Welcome */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello, {profileData.name || "User"} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your profile information below
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 transition hover:shadow-2xl duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={profileData.photo || "https://i.ibb.co/2Fx7r2J/avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-orange-500 object-cover transition duration-300"
            />
            {isEditing && (
              <input
                type="text"
                name="photo"
                value={profileData.photo}
                onChange={handleChange}
                placeholder="Photo URL"
                className="input input-bordered w-full bg-white mt-2"
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2 space-y-4">
            {/* Name */}
            <div className="flex items-center gap-3">
              <FaUser className="text-orange-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Full Name"
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.name || "Not added"}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-orange-500" />
              <p className="text-gray-700">{profileData.email}</p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <FaPhone className="text-orange-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Phone"
                />
              ) : (
                <p className="text-gray-800">{profileData.phone || "Not added"}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <FaHome className="text-orange-500 mt-1" />
              {isEditing ? (
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Address"
                />
              ) : (
                <p className="text-gray-800">{profileData.address || "Not added"}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
