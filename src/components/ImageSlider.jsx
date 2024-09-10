import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import { Box } from "@chakra-ui/react";

const images = [
    { url: "" },
    { url: "" },
    { url: "" },
    { url: "" },
    { url: "" },
  ];


const ImageSlider = () => {
  return (
    <div>
      <Box>

      
       <SimpleImageSlider
        width={"100%"}
        height={300}
        images={images}
        
        
        // showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={1.5}
        style={{
          backgroundImage: `url(${images[0].url})`,
          backgroundSize: '50% 50%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}


        />
        </Box>
    </div>
  )
}

export default ImageSlider
