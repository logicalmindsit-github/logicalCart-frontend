import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Center, Flex, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { site } from "../../components/backend";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items:4  },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4},
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

const GrocerySlider = () => {
  const [mobileData, setMobileData] = useState([]);
  const [groceryData, setGroceryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isAuth } = useSelector((store) => store.auth);
  const toast = useToast();

  useEffect(() => {
    handleTheFetch();
  }, []);

  const handleTheFetch = async () => {
    setLoading(true);
    await getMobileData().then((res) => setMobileData(res));
    await getGroceryData().then((res) => setGroceryData(res));
    setLoading(false);
  };

  const getMobileData = async () => {
    const res = await axios.get(`${site}/products/mobile`);
    return res.data;
  };

  const getGroceryData = async () => {
    const res = await axios.get(`${site}/products/grocery`);
    return res.data;
  };

  const postCart = async (data) => {
    const toki = localStorage.getItem("token");
    try {
      const res = await axios.post(`${site}/carts`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${toki}`,
        },
      });
      console.log(res.data);
      toast({
        position: "top",
        title: `Product is added to your cart`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        position: "top",
        title: `Failed to add product to cart`,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
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
      postCart(productData);
    }
  };

  return (
    <Box
    marginRight="250px"
  marginLeft="250px"
      bgColor={"#F0F8FF"}>
      <div>
      {/* <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#330066', fontSize: '22px', paddingLeft: '20px' }}>Explore By Categories</h2> */}
    {/* <Box
 // border="1px solid "
  //borderColor=""
  marginRight="250px"
  marginLeft="250px"
  bgColor={"#F0F8FF"}
  
> */}
  {loading && (
    <Flex justifyContent="center" flexDirection="column">
            <Center>
              
        <Spinner
          m={10}
          thickness="4px"
          speed="0.75s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
      <Text mt={5} mb={10} fontWeight={500} fontSize="19px" color="blue.500">
        Loading ...
      </Text>
    </Flex>
  )}

  {/* Mobile
  <Flex mt={3} mb={6} flexWrap="wrap">
    <Box pt={0} border={0} h={"100%"} w="100%">
      <Carousel responsive={responsive} itemClass="custom-carousel-item">
      {mobileData.length > 0 &&
              mobileData.map((post, index) => (
          <Link to={`/singlepage/${post._id}`} key={index}>
            <Flex justifyContent="center">
              <Box
                maxW="250px"
                width="90%"
                h={220}
                p={4}
                boxShadow="md"
                borderRadius="0px 30px 0px 30px"
                backgroundColor={"ghostwhite"}
                transition="border-color 0.3s ease"
                _hover={{ border: "1px solid green" }}
              >
                <Center>
                  <Image width="140px" h="140px" src={post.img[0]} />
                </Center>
                <Center>
                  <Text noOfLines={3} fontWeight={500} fontSize="12px" textAlign="center">
                    {post.title}
                  </Text>
                </Center>
                <Flex justifyContent="space-between" alignItems="flex-end">
                  <Text noOfLines={1} color="#ff3269" fontWeight={500} fontSize="12px">
                    {post.price}
                  </Text>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: "white",
                      color: "#ff3269",
                      border: "1px solid #ff3269",
                      fontSize: "10px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTheCart(post);
                    }}
                  >
                    Add
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Link>
              ))}
              
            </Carousel>
            
    </Box>
  </Flex> */}
       
  
  {/* Mobile */}
  {/* <Flex mt={3} mb={6} flexWrap="wrap">
    <Box pt={0} border={0} h={"100%"} w="100%">
      <Carousel responsive={responsive} itemClass="custom-carousel-item">
      {groceryData.length > 0 &&
              groceryData.map((post, index) => (
          <Link to={`/singlepage/${post._id}`} key={index}>
            <Flex justifyContent="center">
              <Box
                maxW="250px"
                width="90%"
                h={220}
                p={4}
                boxShadow="md"
                borderRadius="0px 30px 0px 30px"
                backgroundColor={"ghostwhite"}
                transition="border-color 0.3s ease"
                _hover={{ border: "1px solid green" }}
              >
                <Center>
                  <Image width="140px" h="140px" src={post.img[0]} />
                </Center>
                <Center>
                  <Text noOfLines={3} fontWeight={500} fontSize="12px" textAlign="center">
                    {post.title}
                  </Text>
                </Center>
                <Flex justifyContent="space-between" alignItems="flex-end">
                  <Text noOfLines={1} color="#ff3269" fontWeight={500} fontSize="12px">
                    {post.price}
                  </Text>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: "white",
                      color: "#ff3269",
                      border: "1px solid #ff3269",
                      fontSize: "10px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTheCart(post);
                    }}
                  >
                    Add
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Link>
        ))}
            </Carousel>
            <br/>
          </Box>
         
  </Flex> */}



      </div>
      
    </Box>
  
  );
};

export default GrocerySlider;
