import { Box, Flex, useMediaQuery} from "@chakra-ui/react";
import React, { useState } from "react";

import LaptopG from "./LaptopG"
import MobileG from "./MobileG"


const Grocery = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 880px)')
  const [brand,setBrand] = useState("")
  const [price,setPrice] = useState("")
  const handle = (brandarg,pricearg)=>{
    setBrand(brandarg)
    setPrice(pricearg)
  }
  return (
    <Box pt={10}>
      {isLargerThan1280 ? <Box>
   
      <Flex justifyContent={"space-between"} ml={"8px"} mt={"10px"} mr={"8px"}>
        
         
        <LaptopG brand={brand} price={price} />
      </Flex>
      </Box> : <MobileG/>}
      
    </Box>
  );
}

export default Grocery
