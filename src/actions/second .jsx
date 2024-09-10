import React, { useState, useEffect } from "react";
import { Box, Text, Button, Image, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { site } from "../../components/backend";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";

const LaptopElec = ({ price, category }) => {
  const [data, setData] = useState({});
  const { isAuth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    handleTheFetch();
  }, [price, category]);

  useEffect(() => {
    // Load cart data from localStorage when the component mounts
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setData(JSON.parse(savedCart));
    }
  }, []);
  
  useEffect(() => {
    // Update the local state with the new quantity from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setData(JSON.parse(savedCart));
    }
  }, [data]);
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
    const fetchedData = await getData({ price, category });
    setData(fetchedData);
  };

  const handleQuantityChange = async (prodId, quantityChange) => {
    const updatedData = { ...data };
    if (updatedData[prodId]) {
      updatedData[prodId].quantity += quantityChange;
      setData(updatedData); // Update local state with the new quantity
  
      try {
        // Call the backend to update the quantity
        await axios.patch(
          `${site}/carts/${prodId}`,
          {
            quantity: updatedData[prodId].quantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        // Update cart in local storage
        localStorage.setItem("cart", JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error updating quantity:", error);
        // Handle error here
      }
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
      postCart(productData);
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
      {Object.values(data).map((post) => (
        <Box
          key={post._id}
          m={2}
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
                height="100px"
                objectFit="cover"
                src={post.img[0]}
                alt={post.title}
              />
            </Box>
            <Text textAlign="left" noOfLines={1} fontSize="14px" fontWeight="500">
              {post.title}
            </Text>
            <Text textAlign="left" pt={"2px"} noOfLines={1} fontSize="12px" fontWeight="500" color={"#2B1E35B3"}>
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
            <Text textAlign="left" noOfLines={1} fontSize="16px" fontWeight="500" color={"#ff3269"}>
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
