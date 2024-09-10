import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NormalNav = () => {
  return (
    <div>
      
      <Box  boxShadow={"md"} pb={2} pt={4} mt="10px">
     
        <Flex justifyContent={"space-between"} ml={{base : 10,md:10,lg:100}} mr={{base : 10,md:10,lg:100}}>
        <Link to={"/grocery"}>
          <Box>
            <Text fontSize={"14px"} _hover={{color:"tomato"}} fontWeight={500}>
              Chicken
            </Text>
          </Box>
          </Link>
          
          <Link to={"/mobile"}>
            <Box>
              <Text fontSize={"14px"}  _hover={{color:"tomato"}} fontWeight={500}>
                GREENS
              </Text>
            </Box>
          </Link>
          <Link to={"/fashion"}>
          <Box>
            <Text fontSize={"14px"} _hover={{color:"tomato"}} fontWeight={500}>
              
            </Text>
          </Box>
          </Link>
        <Link to={"/electronic"}>
          <Box>
            <Text fontSize={"14px"} _hover={{color:"tomato"}} fontWeight={500}>
              EGG & NUTS
            </Text>
          </Box>
          </Link>
          <Link to={"/home"}>
          <Box>
            <Text fontSize={"14px"} _hover={{color:"tomato"}} fontWeight={500}>
              Rice
            </Text>
          </Box>
          </Link>
        </Flex>
      </Box>
     
      
    </div>
  );
};

export default NormalNav;
