import {
  Box,
  Flex,
  Image,
  Text,
  Icon,
  Spinner,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,

  DrawerBody,
  
  useDisclosure,
} from "@chakra-ui/react";
import { GoStar } from "react-icons/go";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { site } from "../../components/backend";
import { Link } from "react-router-dom";
import { FaRegDotCircle } from "react-icons/fa";


const getData = async ({ price, brand }) => {
  const res = await axios.get(
    `${site}/products/electronic&appliances?brand=${brand}&price=${price}`
  );
  console.log(res.data);
  return res.data;
};

const MobileElec = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const btnRef = React.useRef();

  useEffect(() => {
    handleTheFetch();
  }, [price, brand]);

  const handleTheFetch = async () => {
    setLoading(true);
    const append = await getData({ price, brand }).then((res) =>
      setData(res)
    );
    setLoading(false);
  };
  return (
    <Box>
      {/* Filter  */}
      <Flex
        gap={3}
        onClick={onOpen}
        justifyContent={"center"}
        borderBottom={"1px solid"}
        borderColor={"gray.300"}
      >
        
        <Drawer
          isOpen={isOpen}
          placement="top"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Flex justifyContent={"space-around"}>
                {/* Price  */}
                <Box
                  borderBottom={"1px"}
                  borderColor={"gray.300"}
                  pt={2}
                  pb={2}
                >
                  <Text
                    fontSize={"14px"}
                    textAlign={"left"}
                    pl={1}
                    color={"black"}
                    fontWeight={500}
                  >
                    Price
                  </Text>
                  <Text
                    color={"black"}
                    fontWeight={500}
                    fontSize={"11px"}
                    letterSpacing={1}
                    m={1}
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    textAlign={"left"}
                    onClick={() => setPrice("")}
                  >
                    All price Range
                  </Text>
                  <Text
                    color={"black"}
                    fontWeight={500}
                    fontSize={"11px"}
                    letterSpacing={1}
                    m={1}
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    textAlign={"left"}
                    onClick={() => setPrice("0-4000")}
                  >
                    ₹0 - ₹4,OOO
                  </Text>
                  <Text
                    color={"black"}
                    fontWeight={500}
                    fontSize={"11px"}
                    letterSpacing={1}
                    m={1}
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    onClick={() => setPrice("4000-30000")}
                    textAlign={"left"}
                  >
                    ₹4,OOO - ₹30,000
                  </Text>
                  <Text
                    color={"black"}
                    fontWeight={500}
                    fontSize={"11px"}
                    letterSpacing={1}
                    m={1}
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    textAlign={"left"}
                    onClick={() => setPrice("30000-50000")}
                  >
                    ₹30,OOO - ₹50,OOO
                  </Text>
                  <Text
                    color={"black"}
                    fontWeight={500}
                    fontSize={"11px"}
                    letterSpacing={1}
                    m={1}
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    textAlign={"left"}
                    onClick={() => setPrice("morethan50000")}
                  >
                    Over ₹50,OOO
                  </Text>
                </Box>
                {/* Brand  */}
                <Box
                  borderBottom={"1px"}
                  borderColor={"gray.300"}
                  pt={2}
                  pb={2}
                >
                  <Text
                    fontSize={"14px"}
                    textAlign={"left"}
                    pl={1}
                    color={"black"}
                    fontWeight={500}
                  >
                    Category
                  </Text>
                  {/* Option  */}
                  <Flex
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    ml={1}
                    gap={1}
                  >
                    <Icon as={FaRegDotCircle} mt={"6px"} w={3} h={3} />
                    <Text
                      fontWeight={500}
                      fontSize={"11px"}
                      letterSpacing={1}
                      m={1}
                      textAlign={"left"}
                      onClick={() => setBrand("")}
                    >
                      All brand
                    </Text>
                  </Flex>
                  <Flex
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    ml={1}
                    gap={1}
                  >
                    <Icon as={FaRegDotCircle} mt={"6px"} w={3} h={3} />
                    <Text
                      fontWeight={500}
                      fontSize={"11px"}
                      letterSpacing={1}
                      m={1}
                      textAlign={"left"}
                      onClick={() => setBrand("Android TV")}
                    >
                      Android TV
                    </Text>
                  </Flex>
                  <Flex
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    ml={1}
                    gap={1}
                  >
                    <Icon as={FaRegDotCircle} mt={"6px"} w={3} h={3} />
                    <Text
                      fontWeight={500}
                      fontSize={"11px"}
                      letterSpacing={1}
                      m={1}
                      textAlign={"left"}
                      onClick={() => setBrand("Washing Machine")}
                    >
                      Washing Machine
                    </Text>
                  </Flex>
                  <Flex
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    ml={1}
                    gap={1}
                  >
                    <Icon as={FaRegDotCircle} mt={"6px"} w={3} h={3} />
                    <Text
                      fontWeight={500}
                      fontSize={"11px"}
                      letterSpacing={1}
                      m={1}
                      textAlign={"left"}
                      onClick={() => setBrand("Kitchen Appliances")}
                    >
                      Kitchen Appliances
                    </Text>
                  </Flex>
                  <Flex
                    _hover={{
                      color: "rgb(200,136,240)",
                      transition: ".3s",
                      cursor: "pointer",
                    }}
                    ml={1}
                    gap={1}
                  >
                    <Icon as={FaRegDotCircle} mt={"6px"} w={3} h={3} />
                    <Text
                      fontWeight={500}
                      fontSize={"11px"}
                      letterSpacing={1}
                      m={1}
                      textAlign={"left"}
                      onClick={() => setBrand("Iron")}
                    >
                      Iron
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
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
          <Text fontWeight={500} color={"rgb(107,70,193)"} mt={10}>
            Loading...
          </Text>
        </Box>
      )}
      {data &&
        data.map((post, index) => (
          <Link key={index} to={`/singlepage/${post._id}`}>
            <Flex
              gap={5}
              pt={5}
              pb={5}
              borderBottom={"1px"}
              borderColor={"gray.300"}
              ml={3}
            >
              {/* Image  */}
              <Box mt={2} width={"30%"}>
                <Center>
                  <Image width={"100px"} src={post.img[0]} />
                </Center>
              </Box>
              {/* Desc  */}
              <Box width={"70%"}>
                <Text
                  textAlign={"left"}
                  noOfLines={1}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {post.title}
                </Text>
                {/* Rating & strike */}
                <Flex mt={1} mb={1}>
                  {/* Box 1 */}
                  <Flex
                    pl={"3px"}
                    pr={"3px"}
                    borderRadius={3}
                    bgColor={"green"}
                    gap={1}
                    pb={-2}
                  >
                    <Text fontSize={"10px"} fontWeight={500} color={"white"}>
                      {post.rating}
                    </Text>
                    <Icon
                      as={GoStar}
                      w={"10px"}
                      h={"10px"}
                      mt={"2px"}
                      color="white"
                    />
                  </Flex>
                </Flex>
                {/* price */}
                <Flex gap={2}>
                  <Text fontWeight={500} fontSize={"14px"}>
                    <strike>{post.strik}</strike>
                  </Text>
                  <Text fontWeight={500} fontSize={"14px"}>
                    {post.price}
                  </Text>
                  <Text fontWeight={500} color={"green"} fontSize={"14px"}>
                    {post.off}
                  </Text>
                </Flex>
                {/* delivery */}
                <Text textAlign={"left"} fontWeight={400} fontSize={"12px"}>
                  
                </Text>
                <Text textAlign={"left"} fontWeight={400} fontSize={"12px"}>
                  
                </Text>
                <Text
                  mt={1}
                  mb={1}
                  fontWeight={500}
                  color={"green"}
                  textAlign={"left"}
                  fontSize={"13px"}
                >
                 
                </Text>
              </Box>
            </Flex>
          </Link>
        ))}
      <Box></Box>
    </Box>
  );
};

export default MobileElec;
