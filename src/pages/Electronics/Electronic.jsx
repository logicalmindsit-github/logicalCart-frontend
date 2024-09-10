import { Box, Flex, useMediaQuery} from "@chakra-ui/react";
import React, { useState } from "react";

import LaptopElec from "./LaptopE";
import MobileElec from "./MobileE";


const Electronic = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 880px)')
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")

  const handle=(categoryArg,priceArg) =>{
    setCategory(categoryArg)
    setPrice(priceArg)
  }
  return (
    <Box pt={10}>
      {isLargerThan1280 ? <Box>

      <Flex justifyContent={"space-between"} ml={"8px"} mt={"10px"} mr={"8px"}>
        
          {/* < /> */}
        {/* Products  */}
        <LaptopElec price={price} category={category} />
      </Flex>
      </Box> : <MobileElec/>}
      
    </Box>
  );
}

export default Electronic
