import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchBox = ({ data ,onSelect}) => {
  const { _id, title, img } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      document.getElementById("searchInput").value = title;
      navigate(`/singlepage/${_id}`);
    } catch (error) {
      console.error("Error occurred during navigation:", error);
    }
  };
  const handleProductSelect = () => {
    onSelect(data.title); // Call the onSelect function with the selected product name
  };

  console.log("searchBox", data);
  return (
    <Link to={`/singlepage/${_id}`} onClick={handleClick}>
      <Flex m={2} gap={4}>
        <Box w={"10%"}>
          <Image src={data.img[0]} width={9} />
        </Box>
        <Box w={"80%"} mt={1}>
          <Text
            textAlign={"left"}
            fontWeight={500}
            color={"gray.600"}
            fontSize={"12px"}
            noOfLines={1}
            onClick={handleProductSelect} 
          >
            {data.title}
          </Text>
          <Text
            textAlign={"left"}
            color={"blue.400"}
            fontWeight={500}
            fontSize={"10px"}
          ></Text>
        </Box>
         
      </Flex>
    </Link>
  );
};

export default SearchBox;
