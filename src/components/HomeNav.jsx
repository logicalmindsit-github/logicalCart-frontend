import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Image } from "@chakra-ui/react";

const HomeNav = () => {
  return (
    <Box backgroundColor={"#E9F4E3"} width={"95%"} margin="auto" >
      <br />
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#330066', fontSize: '22px', paddingLeft: '20px' }}>Explore By Categories</h2>
      <br />
      <Flex justifyContent="center"flexWrap="wrap">
        <Link to="/grocery">
          <Box
            w="121px"
            h="121px"
            border="2px solid #E0F0E3"
            borderRadius="50%"
            margin="10px"
            display="flex"
            justifyContent="center"
            alignItems="center" 
            _hover={{ borderColor: "#00c04b" }} 
          >
              <Image
              w="120px"
              h="120px"
              src="https://i.postimg.cc/c1pVttP8/Healthy-Fresh-Vegetables-120-x-120-px-5.jpg"
              borderRadius="50%"
            />
          </Box>
          <Text fontSize="20px" fontWeight={500}>
            MEAT
          </Text>
        </Link>

        <Link to="/mobile">
          <Box
            w="121px"
            h="121px"
            border="2px solid #E0F0E3"
            borderRadius="50%"
            margin="10px"
            display="flex"
            justifyContent="center"
            alignItems="center" // Center the content vertically
            _hover={{ borderColor: "#00c04b" }} // Change border color on hover
          >
            <Image
              w="120px"
              h="120px"
              src="https://i.postimg.cc/PJMyhypZ/Healthy-Fresh-Vegetables-120-x-120-px-11.jpg"
              borderRadius="50%"
            />
            
          </Box>
          <Text fontSize="20px" fontWeight={500}>
            GREENS
          </Text>
        </Link>
        <Link to="/mobile">
          <Box
            w="121px"
            h="121px"
            border="2px solid #EACAFF"
            borderRadius="50%"
            margin="10px"
            display="flex"
            justifyContent="center"
            alignItems="center" // Center the content vertically
            _hover={{ borderColor: "#00c04b" }} // Change border color on hover
          >
          <Image
              w="120px"
              h="120px"
              src="https://i.postimg.cc/BQMP0k6N/Healthy-Fresh-Vegetables-120-x-120-px-9.jpg"
              borderRadius="50%"
            />
            
          </Box>
          <Text fontSize="20px" fontWeight={500}>
          VEGETABLES
          </Text>
        </Link>
        <Link to="/electronic">
          <Box
            w="121px"
            h="121px"
            border="2px solid #EACAFF"
            borderRadius="50%"
            margin="10px"
            display="flex"
            justifyContent="center"
            alignItems="center" // Center the content vertically
            _hover={{ borderColor: "#00c04b" }} // Change border color on hover
          >
            <Image
              w="120px"
              h="120px"
              src="https://i.postimg.cc/L5QkfP8g/Healthy-Fresh-Vegetables-120-x-120-px-6.jpg"
              borderRadius="50%"
            />
          </Box>
          <Text fontSize="20px" fontWeight={500}>
            EGGS
          </Text>
        </Link>

        <Link to="/electronic">
          <Box
            w="121px"
            h="121px"
            border="2px solid #EACAFF"
            borderRadius="50%"
            margin="10px"
            display="flex"
            justifyContent="center"
            alignItems="center" // Center the content vertically
            _hover={{ borderColor: "#00c04b" }} // Change border color on hover
          >
            <Image
              w="120px"
              h="120px"
              src="https://i.postimg.cc/W1QMVr3X/Healthy-Fresh-Vegetables-120-x-120-px-7.jpg"
              borderRadius="50%"
            />
            
          </Box>
          <Text fontSize="20px" fontWeight={500}>
           NUTS        </Text>
        </Link>
        <Link to="/home">
          <Box
            w="121px"
            h="121px"
            border="2px solid #EACAFF"
            borderRadius="50%"
            margin="10px"
            display="flex"
            justifyContent="center"
            alignItems="center" // Center the content vertically
            _hover={{ borderColor: "#00c04b" }} // Change border color on hover
          >
             <Image
              w="120px"
              h="120px"
              src="https://i.postimg.cc/RFs29vk4/Healthy-Fresh-Vegetables-120-x-120-px-10.jpg"
              borderRadius="50%"
            />
            
          </Box>
          <Text fontSize="20px" fontWeight={500}>
            RICE
          </Text>
        </Link>
      </Flex>
      <br />
    </Box>
  );
};

export default HomeNav;
