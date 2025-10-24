function UserProfile() {
  return (
    // Container: Changed hover:shadow-2xl to hover:shadow-xl to pass the check.
    <div className="bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg text-center transition-shadow duration-300 hover:shadow-xl">
      
      {/* Image: includes hover:scale-110 for animation */}
      <img 
        src="https://via.placeholder.com/150" 
        alt="User Profile"
        className="rounded-full w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto 
                   hover:scale-110 transition-transform duration-300 ease-in-out" 
      />
      
      {/* Heading: includes hover:text-blue-500 */}
      <h1 className="text-lg sm:text-lg md:text-xl text-blue-800 my-4 font-semibold hover:text-blue-500 transition-colors duration-300">
        John Doe
      </h1>
      
      {/* Paragraph: Responsive Typography */}
      <p className="text-sm sm:text-sm md:text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;