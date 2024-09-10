import React, { useState, useEffect } from "react";

const LocationApi = ({ onLocationSelect, closeDrawer }) => {
  const [locationData, setLocationData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(
    JSON.parse(localStorage.getItem("selectedLocation")) || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const API_KEY = "pk.44751ab97d1c02b694611cb9af83689a";

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`
      );
      if (!response.ok) {
        console.error("Response status:", response.status);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLocationData(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowSuggestions(false);
  };

  const handleSelectLocation = (selected) => {
    const displayNameParts = selected.display_name.split(",");
    // Take the first two parts (words) and join them back with a comma
    const shortenedDisplayName = displayNameParts.slice(0, 1).join(",");
    setSelectedLocation({ ...selected, display_name: shortenedDisplayName });
    setSearchQuery(shortenedDisplayName);
    setShowSuggestions(false);
    //localStorage.setItem("selectedLocation", JSON.stringify(selected));
    // Call the onLocationSelect function from props to pass the selected location back to Navbar
    onLocationSelect({ ...selected, display_name: shortenedDisplayName });
  };

  useEffect(() => {
    if (selectedLocation) {
      console.log("Selected location:", selectedLocation);
    }
  }, [selectedLocation]);

  const handleSubmit = () => {
 
    if (selectedLocation) {
 
      onLocationSelect(selectedLocation);
      closeDrawer();
      alert("Your location has been added, Now Purchase our product");
    } else {
 
      console.log("No location selected");
    }
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#F8F8FF" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder=" Search .."
          style={{ width: "300px", margin: "20px" }}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#ff3269",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Search
        </button>
        {showSuggestions && locationData && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "#F8F8FF",
              border: "1px solid #ccc",
              maxHeight: "300px",
              overflowY: "auto",
              width: "400px",
            }}
          >
            {locationData.map((location) => (
              <p
                key={location.place_id}
                onClick={() => handleSelectLocation(location)}
                style={{
                  cursor: "pointer",
                  padding: "5px",
                  borderBottom: "1px solid black",
                }}
              >
                {location.display_name}
              </p>
            ))}
          </div>
        )}
      </div>
      {selectedLocation && (
        <div>
          <h2>Selected Location on Map:</h2>
          {/* Adjusted map size */}
          <iframe
            title="Selected Location Map"
            width="400"
            height="200"
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lon}&z=15&output=embed`}
            style={{ display: "block", margin: "auto" }}
          ></iframe>

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#ff3269",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "16px",
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationApi;
