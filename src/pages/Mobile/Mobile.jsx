import { Box, Flex, useMediaQuery} from "@chakra-ui/react";
import React, { useState } from "react";


import MobileProduct from "./MobileProduct";
import SmallMobile from "./SmallMobile";

const Mobile = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 880px)')
  let [filter,setFilter] = useState("")
  let [priceFilter,setPriceFilter] = useState("")

  const handle = (argu,price)=>{
    console.log("argument",argu)
    setFilter(argu)
    setPriceFilter(price)
  }

  console.log("filter",filter)
  console.log("priceFili",priceFilter)
  return (
    <Box pt={10}>
      {isLargerThan1280 ? <Box>
      
      <Flex justifyContent={"space-between"} ml={"8px"} mt={"10px"} mr={"8px"}>
      
        <MobileProduct brand={filter} price={priceFilter} />
      </Flex>
      </Box> : <SmallMobile/>}
      
    </Box>
  );
};

export default Mobile;