import { Box, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Image } from '@chakra-ui/react';
import HomeNav from "../../components/HomeNav";
//import ImageSlider from "../../components/ImageSlider";
import MobileHomeSlider from "./MobileHomeSlider";
import GrocerySlider from "./GrocerySlider";
import SliderComponent from "../../components/SliderComponent";
//import { Offcatr } from '../../components/Offcatr';





const Home = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1080px)");

  return (
    <Box>
       {isLargerThan1280 ? (
        <Box pt={10}>
       {/* <Offcatr/> */}
          <br></br>
          <SliderComponent/>
          <br></br>
        
        <br></br>
    
          <HomeNav />
          <br></br>
          {/* <ImageSlider />  */}
          <br></br>
          {/* <Viewimages /> */}
          <br></br>
           
          <GrocerySlider />
         
          
          <Box mt={0} mb={0}>

            
           
            
            
          
          </Box>
        </Box>

   
    ) : (
      // Mobile
      <Box pt={10} bgColor={"gray.100"}>
           
            <br></br>
            <br></br>
            <SliderComponent />
            <br></br>
            <HomeNav />
        <Box mt={10} mb={10}>
          <MobileHomeSlider />
        </Box>
      </Box>
    )}
  </Box>
  );
};

export default Home;
