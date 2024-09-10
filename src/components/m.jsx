import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Icon,
    useMediaQuery,
    Collapse,
    useToast,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { FcSearch } from "react-icons/fc";
  import { FaLeaf, FaSearchLocation } from "react-icons/fa";
  import { HiShoppingCart } from "react-icons/hi";
  import { BsEgg, BsList } from "react-icons/bs";
  import { GiBowlOfRice, GiMeat } from "react-icons/gi";
  import { ImCross, ImSearch } from "react-icons/im";
  import SearchBox from "./SearchBox";
  import logo from "../../src/logo.png";
  import axios from "axios";
  import { useDispatch, useSelector } from "react-redux";
  import { SearchIcon } from "@chakra-ui/icons";
  import { Link, useNavigate } from "react-router-dom";
  import { site } from "./backend";
  import { logout } from "../redux/auth/auth.action";
  
  const Sec = [
    {
      id: 1,
      txt: "Meat",
      links: "/grocery",
      icon: GiMeat,
    },
    {
      id: 2,
      txt: "Greens",
      links: "/mobile",
      icon: FaLeaf,
    },
    {
      id: 4,
      txt: "Eggs & Nuts",
      links: "/electronic",
      icon: BsEgg,
    },
    {
      id: 5,
      txt: "Rice",
      links: "/home",
      icon: GiBowlOfRice,
    },
  ];
  
  const Navbar = () => {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [isLargerThan1280] = useMediaQuery("(min-width: 1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const { isAuth, token } = useSelector((store) => store.auth);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
  
    const GoToCart = () => {
      if (isAuth) {
        return navigate("/cart");
      } else {
        return toast({
          title: "Required Login",
          position: "top",
          status: "warning",
          duration: 1500,
          isClosable: true,
        });
      }
      console.log("cart");
    };
    const handleTheLogout = () => {
      dispatch(logout());
      console.log("logout");
    };
    const handleTheAdmin = () => {
      console.log("welcome admin");
    };
  
    const handleTheSearch = (e) => {
      setText(e.target.value);
      getData(e.target.value)
        .then((res) => setData(res))
        .catch((e) => console.log(e));
    };
  
    const getData = async (text) => {
        const res = await axios.get(`${site}/products/title?search=${text}`);
        const data = res.data;
        return data;
      };
    const handleTheKeyPress = (e) => {
      if (e.key === "Enter") {
        navigate(`${site}/products/title?search=${text} /singlepage/${data._id}`);
        setText("");
      }
    };
  
    const handleTheEmpty = () => {
      setData([]);
    };
  
    const handleClick = () => {};
  
    return (
      <Box>
        {isLargerThan1280 ? (
          //   Laptop
          <Box
            zIndex={3}
            bgColor={"purple.600"}
            position={"fixed"}
            width={"100%"}
            height={"50px"}
            background={`url()center/cover no-repeat`}
          >
            <Flex
              p={1}
              justifyContent={"space-between"}
              alignItems={"center"}
              mr={10}
              ml={10}
            >
              {/* Box 1 */}
              <Flex gap={100}>
                <Box pr={"30px"}>
                  <Link to={"/"}>
                    <Image width={{ base: "60px", md: "80px", lg: "185px" }} src={logo} />
                  </Link>
                </Box>
  
                <Box mr={13}>
                  <InputGroup mt={1} size="xs" bgColor={"white"} borderRadius={"20px"}>
                    <Input
                      value={text}
                      w={"420px"}
                      h={"7vh"}
                      fontSize={"16px"}
                      color={"#67AD00"}
                      placeholder="Search Products"
                      onChange={handleTheSearch}
                      onKeyPress={(e) => handleTheKeyPress(e)}
                      borderRadius={"20px"}
                      _hover={{ borderColor: "#67AD00" }}
                      focusBorderColor="transparent" // Remove blue hover effect
                      border={"2px solid"}
                      borderColor={"#67AD00"}
                    />
                    <InputRightElement>
                      <Button
                        size="sm"
                        mt={3}
                        mr={3}
                        onClick={handleClick}
                        borderRadius={"50%"}
                        bg="#FFFFFF"
                        _hover={{ bg: "#FFFFFF" }} // Change the color value to desired color on hover#F8F8FF
                      >
                        {data.length === 0 && <Icon as={SearchIcon} w={4} h={4} color={"#67AD00"} />}
                        {data.length !== 0 && (
                          <Icon onClick={handleTheEmpty} as={ImCross} w={4} h={4} color={"#67AD00"} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {/* Search Box  */}
                  {data == "No Products found" && (
                    <Box
                      border={"px solid"}
                      borderColor={"gray.300"}
                      overflowX={"hidden"}
                      maxH={"390px"}
                      position={"absolute"}
                      bgColor={"white"}
                      w={"420px"}
                      borderBottomRadius={10}
                    >
                      <Flex flexDirection={"column"} alignItems={"center"}>
                        <Image w={250} src="https://i.postimg.cc/P55nPzSH/no-result.gif" />
                        <Text fontWeight={500} fontSize={"18px"} mb={5}>
                          No products found
                        </Text>
                      </Flex>
                    </Box>
                  )}
                  {data !== "No Products found" && (
                    <Box
                      borderBottomRadius={10}
                      overflow={"scroll"}
                      overflowX={"hidden"}
                      border={"px solid"}
                      borderColor={"gray.300"}
                      maxH={"390px"}
                      position={"absolute"}
                      bgColor={"white"}
                      w={"420px"}
                    >
                      {data.map((post, i) => (
                        <SearchBox data={post} i={i} key={i} />
                      ))}
                    </Box>
                  )}
                </Box>
              </Flex>
  
              {/* Box 3  */}
              <Box>
                <Flex gap={"10px"} pr={"20px"}>
                  <Button size={"sm"} bg={"none"} _hover={{}} color={"#67AD00"}>
                    <Link to={"/login"}>
                      {!isAuth && <Text fontSize={"13px"}>Login</Text>}
                    </Link>
                    {isAuth && <Text onClick={handleTheLogout} fontSize={"13px"}>Logout</Text>}
                  </Button>
                  <Button size={"sm"} bg={"none"} _hover={{}} color={"#67AD00"}>
                    <Link to={"/admin"}>
                      {role == "Admin" && <Text onClick={handleTheAdmin} fontSize={"13px"}>Admin</Text>}
                    </Link>
                    {role == "User" && <Text fontSize={"13px"}></Text>}
                    <Link to={"/signin"}>
                      {!role && <Text fontSize={"13px"}>Sign-In</Text>}
                    </Link>
                  </Button>
                  <Button onClick={GoToCart} size={"sm"} bg={"none"} _hover={{}} color={"#67AD00"}>
                    <Icon as={HiShoppingCart} />
                    <Text fontSize={"13px"}>Cart</Text>
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        ) : (
          //   Mobile
          <Box
            background={`url()center/cover no-repeat`}
            zIndex={3}
            position={"fixed"}
            width={"100%"}
            bgColor={""}
          >
            <Flex justifyContent={"space-between"}>
              {/* box 1  */}
              <Flex>
                <Box mt={"7px"} ml={"5px"} mr={"0px"}>
                  <Icon onClick={onOpen} as={BsList} color={"#67AD00"} w={6} h={6} />
                </Box>
                <Link to={"/"}>
                  <Box>
                    <Image mt={2.5} width={"80px"} src={logo} />
                  </Box>
                </Link>
              </Flex>
              {/* Box 2 */}
              <Flex>
                <Button _hover={{}} bg={"none"}>
                  <Icon onClick={() => setShow(!show)} as={ImSearch} color={"#67AD00"} />
                </Button>
                <Link to={"/login"}>
                  <Button size={"md"} bg={"none"} _hover={{}} color={"#67AD00"}>
                    <Link to={"/login"}>
                      {!isAuth && <Text fontSize={"13px"}>Login</Text>}
                    </Link>
                    {isAuth && <Text onClick={handleTheLogout} fontSize={"13px"}>Logout</Text>}
                  </Button>
                </Link>
                {/* Admin  */}
                <Button mt={1} size={"sm"} bg={"none"} _hover={{}} color={"#67AD00"}>
                  <Link to={"/admin"}>
                    {role == "Admin" && <Text onClick={handleTheAdmin} fontSize={"13px"}>Admin</Text>}
                  </Link>
                  {role == "User" && <Text fontSize={"13px"}></Text>}
                  <Link to={"/signin"}>
                    {!role && <Text fontSize={"13px"}>Sign-up</Text>}
                  </Link>
                </Button>
                {/* Drawer  */}
                <Button
                  size={"md"}
                  onClick={GoToCart}
                  bg={"none"}
                  mt={"2px"}
                  _hover={{}}
                  color={"#67AD00"}
                >
                  <Icon as={HiShoppingCart} w={6} h={6} />
                </Button>
              </Flex>
            </Flex>
          </Box>
        )}
        <Collapse in={show} animateOpacity>
          <Box
            ml={0}
            zIndex={4}
            position={"absolute"}
            mt={10}
            color="white"
            rounded="md"
            shadow="md"
          >
            <Box>
              <InputGroup mt={0} size="md" bgColor={"white"} borderRadius={"10px"}>
                <Input
                  value={text}
                  w={"350px"}
                  color={"black"}
                  placeholder="Search Product"
                  onChange={handleTheSearch}
                  onKeyPress={(e) => handleTheKeyPress(e)}
                />
                <InputRightElement>
                  <Button bg={"none"} size="sm" _hover={{}} onClick={handleClick}>
                    {data.length == 0 && <Icon as={SearchIcon} w={4} h={4} color={"#67AD00"} />}
                    {data.length !== 0 && <Icon onClick={handleTheEmpty} color={"black"} as={ImCross} w={4} h={4} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* Search Box  */}
              {data == "No Products found" && (
                <Box
                  border={"3px solid"}
                  borderColor={"gray.300"}
                  overflowX={"hidden"}
                  maxH={"390px"}
                  position={"absolute"}
                  bgColor={"white"}
                  w={"400px"}
                  borderBottomRadius={10}
                >
                  <Flex flexDirection={"column"} alignItems={"center"}>
                    <Image w={250} src="https://i.postimg.cc/P55nPzSH/no-result.gif" />
                    <Text fontWeight={500} fontSize={"18px"} mb={5}>
                      No products found
                    </Text>
                  </Flex>
                </Box>
              )}
              {data !== "No Products found" && (
                <Box
                  borderBottomRadius={10}
                  overflow={"scroll"}
                  overflowX={"hidden"}
                  border={"px solid"}
                  borderColor={"gray.300"}
                  maxH={"390px"}
                  position={"absolute"}
                  bgColor={"white"}
                  w={"400px"}
                >
                  {data.map((post, i) => (
                    <SearchBox data={post} i={i} key={i} />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Collapse>
      </Box>
    );
  };
  
  export default Navbar;
  