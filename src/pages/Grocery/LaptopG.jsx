import { Box, Button,Center, Flex, Image, Spinner, Text,useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { site } from "../../components/backend";
import { useSelector } from "react-redux";

const getData = async ({ brand, price }) => {
  const res = await axios.get(
    `${site}/products/grocery?brand=${brand}&price=${price}`
  );
  console.log(res.data);
  return res.data;
};


const LaptopG = ({ brand, price }) => {
  console.log("price", price);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleTheFetch();
  }, [brand, price]);

  const { isAuth, token } = useSelector((store) => store.auth);
const toast = useToast();


const postCart = async (data) => {
let toki = localStorage.getItem("token");

const res = await axios.post(`${site}/carts`, data, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${toki}`,
  },
});
console.log(res.data);
};
const handleTheCart = (productData) => {
  if (!isAuth) {
    toast({
      position: "top",
      title: `Login to add the product in the cart`,
      status: "warning",
      duration: 1500,
      isClosable: true,
    });
  } else {
    postCart(productData); // Pass the specific product data to postCart
    toast({
      position: "top",
      title: `Product is added to your cart`,
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  }
};

console.log("datasdfdf-", data);


  const handleTheFetch = async () => {
    setLoading(true);
    const append = await getData({ brand, price }).then((res) => setData(res));
    setLoading(false);
  };
  console.log(data);
  return (
    
<Box
  display="flex"
  flexDirection="row"
  flexWrap="wrap"
  bgColor="rgb(267, 260, 262)"
  pl={"90px"}
>
  {loading && (
    <Box>
      <Spinner
        mt={10}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text fontWeight={500} color="rgb(107, 70, 193)" mt={10}>
        Loading...
      </Text>
    </Box>
  )}
  {data &&
    data.map((post, index) => (
      <Link key={index} to={`/singlepage/${post._id}`} style={{ textDecoration: 'none' }}>
        <Box
          m={2} // Add margin for the gap
          p={4}
          border="1px solid #ddd"
          
          borderRadius="0px 30px 0px 30px"
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          textAlign="center"
          width="200px"
        >
          <Box mb={2}>
            <Image
              width="100%"
              height="100px" /* Adjust the height as needed */
              objectFit="cover"
              src={post.img[0]}
              alt={post.title}
            />
          </Box>
          <Text
            textAlign="left"
            noOfLines={1}
            fontSize="14px"
            fontWeight="500"
          >
            {post.title}
          </Text>
          <Text
            textAlign="left"
            pt={"2px"}
            noOfLines={1}
            fontSize="12px"
            fontFamily={"Helvetica"}
            fontWeight="500"
            color={"#2B1E35B3"}
          >
            {post.desc1}
          </Text>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Text
    textAlign="left"
    pt={"25px"}
    noOfLines={1}
    fontSize="16px"
    fontWeight="500"
    pl={"5px"}
    color={"#ff3269"}
  >
    {post.price}
 
            </Text>
            <Button style={{ alignSelf: 'flex-end' }} right={0} m={0} border="1px solid #ff3269" bgColor="white" color={"#ff3269"}
            onClick={(e) => {
              e.preventDefault();
              handleTheCart(post);
            }}
            >
    Add
  </Button>
  
</div>

          
        </Box>
      </Link>
    ))}
</Box>


  );
};
             
   

export default LaptopG;
