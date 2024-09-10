import axios from "axios";
import {
  Box,
  Center,
  Flex,
  Image,
  Spinner,
  Text,
  Button,
  useToast 
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { site } from "../../components/backend";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const getData = async () => {
  const res = await axios.get(`${site}/products/electronic&appliances`);
  console.log(res.data);
  return res.data;
};
const getMobileData = async () => {
  const res = await axios.get(`${site}/products/mobile`);
  console.log(res.data);
  return res.data;
};

const getGroceryData = async () => {
  const res = await axios.get(`${site}/products/grocery`);
  console.log(res.data);
  return res.data;
};

const getHomeData = async () => {
  const res = await axios.get(`${site}/products/home`);
  console.log(res.data);
  return res.data;
};



const MobileHomeSlider = () => {
  const [data, setData] = useState([]);
  const [mobileData, setMobileData] = useState([]);
  const [groceryData, setGroceryData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(false);



  const { isAuth, token } = useSelector((store) => store.auth);
const toast = useToast();


const postCart = async (data) => {
let toki = localStorage.getItem("token");
console.log({toki})
const res = await axios.post(`${site}/carts`, data, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${toki}`
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
  console.log("data=>", token);
  useEffect(() => {
    handleTheFetch();
  }, []);
  const handleTheFetch = async () => {
    setLoading(true);
    await getData().then((res) => setData(res));
    await getMobileData().then((res) => setMobileData(res));
    await getGroceryData().then((res) => setGroceryData(res));
    await getHomeData().then((res) => setHomeData(res));
    setLoading(false);
  };

  console.log(data);
  return (
    <Box>
      {loading && (
        <div>

         
        <Flex justifyContent={"center"} flexDirection={"column"}>
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
          <Text
            mt={5}
            mb={10}
            fontWeight={500}
            fontSize={"19px"}
            color={"blue.500"}
          >
            Loading ...
          </Text>
        </Flex>
      </div>
    )}

    {/* Mobile  */}
    <h2 style={{ textAlign: 'left', fontWeight: 'bold', color: '#330066', fontSize: '22px', paddingLeft: '20px' }}>Your Favourite Picks</h2>
<br></br>
  
    
    <Flex flexWrap={"wrap"}mt={2} mb={2}>
      {/* <Box
        h={200}
        w={"20%"}
        overflow={"hidden"}
        backgroundImage={`url()`}
        bgSize={"cover"}
      ></Box> */}
      <Box pt={"2px"} border={"0px"} borderColor={"gray.300"} w={"100%"}>
        <Carousel responsive={responsive}>
          {mobileData.length > 0 &&
            mobileData.map((post, index) => (
              <Link to={`/singlepage/${post._id}`}>
                <Box h={200} pl={0} pr={0} key={index} pt={10}>
                  <Center
                    h={"100px"}
                    transition="transform 0.3s"
                    //_hover={{ transform: "scale(1.1)" }}
                  >
                    <Box border={"1px solid #DADBDD"}
               borderRadius={"8%"} 
               padding={"6%"}      
                      backgroundColor={"GhostWhite"}
                      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
                      <Image width={"130px"} h={"80px"} src={post.img[0]} />
                      <Text
                    mt={5}
                    noOfLines={2}
                    fontWeight={500}
                    fontSize={"10px"}
                  >
                    {post.title}
                      </Text>
                      <Text
                    mt={5}
                        noOfLines={2}
                      color={"#ff3269"}
                    fontWeight={500}
                        fontSize={"10px"}
                        pr={"100px"}
                        
                      >
                        {post.price}
                      </Text>
                      <Box position="absolute" bottom={8} right={10}>
                        
                       <Button
                         size="sm"
                        style={{
                          backgroundColor: 'white',
                         color: '#ff3269',
                          border: '1px solid #ff3269',
                          fontSize: '10px',
                          //padding: '10px 20px', 
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTheCart(post);
                        }}
                        >
                          Add
                        </Button>
                           
                      </Box>
                      
                 </Box>
                    
            </Center>
                  
                </Box>
              </Link>
            ))}
        </Carousel>
      </Box>
    </Flex>
   
     

     
    
    {/* <Flex flexWrap={"wrap"} mt={4} mb={2}>
      <Box
        backgroundImage={`url()`}
        bgSize={"cover"}
        h={250}
        w={"0%"}
        pt={10}
      ></Box>
       <Box border={"0px"} borderColor={"gray.300"} w={"100%"}>
        <Carousel responsive={responsive}>
          {groceryData.length > 0 &&
            groceryData.map((post, index) => (
              <Link to={`/singlepage/${post._id}`}key={index}>
                <Box h={200} pl={0} pr={0}  pt={10}>
                  <Center
                    h={"100px"}
                    
                    transition="transform 0.3s"
                    //_hover={{ transform: "scale(1.1)" }}
                  >
                    <Box border={"1px solid #DADBDD"}
               borderRadius={"8%"} 
                      padding={"6%"} 
                      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                     
               backgroundColor={"GhostWhite"}>
                    <Image width={"150px"} h={"100px"} src={post.img[0]} />
                    <Text
                    mt={1}
                    noOfLines={3}
                    fontWeight={500}
                        fontSize={"10px"}
                        
                  >
                        {post.title}
                      </Text>

                      <Text
                    mt={5}
                        noOfLines={2}
                      color={"#ff3269"}
                    fontWeight={500}
                        fontSize={"10px"}
                        pr={"100px"}
                      >
                        {post.price}
                      </Text>
                      <Box position="absolute" bottom={8} right={8}>
                       <Button
                         size="sm"
                        style={{
                          backgroundColor: 'white',
                         color: '#ff3269',
                          border: '1px solid #ff3269',
                          fontSize: '10px',
                          //padding: '10px 20px', 
                        }}
                     
                        onClick={(e) => {
                          e.preventDefault();
                          handleTheCart(post);
                        }}
                          >
                          Add
                            </Button>
                      </Box>
                      </Box>
                  </Center>
                  
                </Box>
              </Link>
            ))}
        </Carousel>
      </Box>
    </Flex>
     */}
    
  

    
    

   
{/*   
    <Flex mt={2} mb={2}>
      {/* <Box
        backgroundImage={`url()`}
        bgSize={"cover"}
        h={200}
        w={"1%"}
      ></Box> 
      <Box border={"0px"} borderColor={"gray.300"} w={"100%"}>
        <Carousel responsive={responsive}>
          {homeData.length > 0 &&
            homeData.map((post, index) => (
              <Link to={`/singlepage/${post._id}`}>
                 <Box
            h={200}
            pl={2}
                  pr={0}
                  key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Center
              h={"160px"}
              transition="transform 0.3s"
             // _hover={{ transform: "scale(1.1)" }}
            >
              <Box border={"0px solid #DADBDD"}
               borderRadius={"8%"} 
               padding={"6%"}      
                backgroundColor={"GhostWhite"}
                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
                <Image width={"150px"} h={"90px"} src={post.img[0]} />
                
                <Text mt={0} noOfLines={2} fontWeight={500} fontSize={"10px"}pt={"0px"}>
              {post.title}
                </Text>
                <Text
                    mt={5}
                        noOfLines={1}
                      color={"#ff3269"}
                    fontWeight={500}
                        fontSize={"10px"}
                        pr={"100px"}
                      >
                        {post.price}
                </Text>
                <Box position="absolute" bottom={"46px"} right={"42.5px"}>
                       <Button
                         size="sm"
                        style={{
                          backgroundColor: 'white',
                         color: '#ff3269',
                          border: '1px solid #ff3269',
                          fontSize: '10px',
                          //padding: '10px 20px', 
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTheCart(post);
                        }}
                          >
                          Add
                            </Button>
                      </Box>
              </Box>

            </Center>
            
          </Box>
        </Link>
      ))}
  </Carousel>
</Box>
    </Flex> */}
 
    
   
    {/* Electronic  */}
    <Flex>
<Box border={"0px"} borderColor={"gray.300"} w={"100%"} height={"200px"}>
  <Carousel responsive={responsive}>
    {data.length > 0 &&
      data.map((post, index) => (
        <Link to={`/singlepage/${post._id}`} key={index}>
          <Box
            h={200}
            pl={0}
            pr={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Center
              h={"160px"}
              transition="transform 0.3s"
             // _hover={{ transform: "scale(1.1)" }}
            >
              <Box border={"0px solid #DADBDD"}
               borderRadius={"8%"} 
               padding={"6%"}      
                backgroundColor={"GhostWhite"}
                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
                <Image width={"150px"} h={"90px"} src={post.img[0]} />
                
                <Text mt={0} noOfLines={1} fontWeight={500} fontSize={"10px"}pt={"0px"}>
              {post.title}
                </Text>
                <Text
                    mt={5}
                        noOfLines={1}
                      color={"#ff3269"}
                    fontWeight={500}
                        fontSize={"10px"}
                        pr={"100px"}
                      >
                        {post.price}
                </Text>
                <Box position="absolute" bottom={"46px"} right={"42.5px"}>
                <Button
                        size="sm"
                        style={{
                          backgroundColor: 'white',
                          color: '#ff3269',
                          border: '1px solid #ff3269',
                          fontSize: '10px',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTheCart(post);
                        }}
                      >
                        Add
                      </Button>
                      </Box>
              </Box>

            </Center>
            
          </Box>
        </Link>
      ))}
        </Carousel>
        
      </Box>
      
    </Flex>
    
    
</Box>
  );
};

export default MobileHomeSlider;
