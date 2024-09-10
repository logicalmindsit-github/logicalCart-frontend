import React, { useState, useEffect } from "react";
import { Box, Text, Button, Spinner, Image, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { site } from "../../components/backend";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";

const LaptopElec = ({ price, category }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { isAuth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const [cart, setCart] = useState({});


  useEffect(() => {
    handleTheFetch();
  }, [price, category]);



  const getData = async ({ price, category }) => {
    const res = await axios.get(
      `${site}/products/electronic&appliances?brand=${category}&price=${price}`
    );
    return res.data.reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});
  };

  const handleTheFetch = async () => {
    setLoading(true);
    const fetchedData = await getData({ price, category });
    setData(fetchedData);
    setLoading(false);
  };

  const handleQuantityChange = async (prodId, quantityChange) => {
    let toki = localStorage.getItem("token");
    const updatedData = { ...data };
    updatedData[prodId].quantity += quantityChange;
    
    // Update the local state with the new quantity
    setData(updatedData);
    
    try {
      const res = await axios.patch(
        `${site}/carts/${prodId}`,
        {
          quantity: updatedData[prodId].quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${toki}`,
          },
        }
      );
      console.log(res.data);
  
      // Dispatch action to update cart count
      dispatch(addToCart(updatedData[prodId]));
  
      // Update cart quantity locally
      const updatedCart = { ...cart };
      updatedCart[prodId].quantity = updatedData[prodId].quantity;
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Handle error here
    }
  };
  
  const postCart = async (productData) => {
    let toki = localStorage.getItem("token");

    const res = await axios.post(`${site}/carts`, productData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${toki}`,
      },
    });
    console.log(res.data);
  };
  const handleTheCarts = (productData) => {
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
      {Object.values(data).map((post) => (
        <Box
          key={post._id}
          m={2} // Add margin for the gap
          p={4}
          border="1px solid #ddd"
          borderRadius="md"
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          textAlign="center"
          width="200px"
        >
          <Link
            to={`/singlepage/${post._id}`}
            style={{ textDecoration: "none" }}
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
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Text
              textAlign="left"
              noOfLines={1}
              fontSize="16px"
              fontWeight="500"
              color={"#ff3269"}
            >
              {post.price}
            </Text>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                color={"white"}
                bgColor={"purple.500"}
                _hover={{}}
                borderRadius={100}
                isDisabled={post.quantity === 1}
                size="sm"
                onClick={() => handleQuantityChange(post._id, -1)}
              >
                -
              </Button>
              <Text mx={2} fontWeight={500}>
                {post.quantity}
              </Text>
              <Button
                color={"white"}
                bgColor={"purple.500"}
                _hover={{}}
                borderRadius={100}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuantityChange(post._id, 1);
                  handleTheCarts(post);
                }}
              >
                +
              </Button>
            </div>
          </div>
        </Box>
      ))}
    </Box>
  );
};

export default LaptopElec;
