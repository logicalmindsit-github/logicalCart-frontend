import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "https://i.postimg.cc/qBLKR95Y/first.jpg" },
  { url: "https://i.postimg.cc/5NJ2cLL7/main.png" },
  { url: "https://i.postimg.cc/8P1YWzLX/second.pngh" },
  { url: "https://i.postimg.cc/vmN5TsG8/raw-chicken-meat-poultry-broiler-fresh-meal-food-snack-diet-on-the-table-copy-space-photo.jpg" },
  { url: "https://i.postimg.cc/fyBcFxXH/pngtree-autumn-new-rice-mature-listed-rice-fresh-yellow-banner-picture-image-1116539.png" },
  ];

const ImageSliderMob = () => {
  return (
    <div>
      <div>
       <SimpleImageSlider
        width={"100%"}
          height={100}
        images={images}
        // showBullets={true}
        showNavs={true}
        navSize={20}
        autoPlay={true}
        autoPlayDelay={1.5}
      />
    </div>
    </div>
  )
}

export default ImageSliderMob
