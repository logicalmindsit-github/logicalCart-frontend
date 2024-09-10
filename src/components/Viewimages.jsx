import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './compcss/SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsFound, setResultsFound] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = [
    'Class1', 'Class2', 'Class3', 'Class4', 'Class5', 'Class6', 'Class7',
    'Class8', 'Class9', 'Class10', 'Class11', 'Class12', 'ClassLKG', 'ClassUKG',
    'Maths', 'Awards', 'Analytics', 'National Learning Guidelines', 'Home'  ,'Topics' , 'Testimonials','contactus'
  ];

  const handleSearch = () => {
    
    const query = searchQuery.toLowerCase();

    if (query === 'class1') {
                    navigate('/Class1Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                } else if (query === 'class2') {
                    navigate('/Class2Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                } else if (query === 'class3') {
                    navigate('/Class3Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                } else if (query === 'class4') {
                    navigate('/Class4Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                } else if (query === 'class5') {
                    navigate('/Class5Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                }  else if (query === 'class6') {
                    navigate('/Class6Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                 } else if (query === 'class7') {
                    navigate('/Class7Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'class8') {
                    navigate('/Class8Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'class9') {
                    navigate('/Class9Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'class10') {
                    navigate('/Class10Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'class11') {
                    navigate('/Class11Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'class12') {
                    navigate('/Class12Topics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'classlkg') {
                    navigate('/ClassLKGTopics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'classukg') {
                    navigate('/ClassUKGTopics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'maths') {
                    navigate('/Learning');
                    setSearchQuery('');
                    setResultsFound(true);
                  }else if (query === 'awards') {
                    navigate('/AwardsPage');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'analytics') {
                    navigate('/Analytics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } else if (query === 'national learning guidelines') {
                    navigate('/NationalFirstPage');
                    setSearchQuery('');
                    setResultsFound(true);
                  } 
                  else if (query === 'home') {
                    navigate('/Home');
                    setSearchQuery('');
                    setResultsFound(true);
                  } 
                
                  else if (query === 'topics') {
                    navigate('/InnerTopics');
                    setSearchQuery('');
                    setResultsFound(true);
                  } 
                
                   else if (query === 'testimonials') {
                    navigate('/Testimonials');
                    setSearchQuery('');
                    setResultsFound(true);
                  } 

                  else if (query === 'contactus') {
                    navigate('/Contactus');
                    setSearchQuery('');
                    setResultsFound(true);
                  }
                
                 else {
                    setResultsFound(false);
                }; 
            };
            const [show, setShow] = React.useState(false);
            const role = localStorage.getItem("role");
            const name = localStorage.getItem("name");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setResultsFound(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="navbar-search">
      <input
        className='inputsearch'
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        list="suggestions" // Link the datalist
      />
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />

          
        ))}
      </datalist>
      <button className='searchbutton' onClick={handleSearch}>
        <FaSearch style={{ color: 'black', cursor: 'pointer', marginRight: "1px" }} />
      </button>
      {!resultsFound && (
        <div className="no-results-message">
          No matches found. Please attempt another search.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
