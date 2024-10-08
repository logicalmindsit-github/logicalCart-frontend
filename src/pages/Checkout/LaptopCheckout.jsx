import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Input,
  useToast,
  Text,
} from "@chakra-ui/react";

import { Rozarpayment } from "../../Rozar/Rozarpayment";
import axios from "axios";
import { site } from "../../components/backend";
import { useNavigate } from "react-router-dom";
const postOrder = async ({ cart, formstate, totalPrice }) => {
  let toki = localStorage.getItem("token");
  console.log(cart, formstate, "totalprice", totalPrice);
  
  let res = await axios.post(
    `${site}/admin/post_orders`,
    { cart, ...formstate, totalPrice },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${toki}`,
      },
    }
  );
  return res.data;
};

const checkout = async () => {
  let toki = localStorage.getItem("token");
  let res = await axios.delete(`${site}/carts/checkout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${toki}`,
    },
  });
  return res.data;
};
const initState = {
  name: "",
  mobileNumber: "",
  pinCode: "",
  houseNo: "",
  area: "",
  landmark: "",
  state: "",
  date: new Date().toDateString() + " " + new Date().toTimeString(),
};

const LaptopCheckout = ({
  handleTheFetch,
  cart,
  totalPrice,
  isOpen,
  onOpen,
  onClose,
  cancelRef,
}) => {
  const [formstate, setFormstate] = useState(initState);
  const toast = useToast();
  console.log("User cart=>", cart);

  const handleTheChange = (e) => {
    setFormstate({ ...formstate, [e.target.name]: e.target.value });
  };
  const handleTheCheckout = () => {
    if (
      formstate.name &&
      formstate.mobileNumber &&
      formstate.pinCode &&
      formstate.houseNo &&
      formstate.area &&
      formstate.landmark &&
      formstate.state
    ) {
      console.log("formstate", formstate);

      handleTheFetch();
      Rozarpayment(totalPrice, handlepayment);
      onClose();
    } else {
      toast({
        title: "Please Fill The Required Fields",
        position: "top",
        status: "warning",
        duration: 1500,
        isClosable: true,
      });
    }
    handleTheFetch();
  };
  const navigate = useNavigate();
  const handlepayment = () => {
    checkout().then((res) =>
      toast({
        title: res,
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
    );
    postOrder({ cart, formstate, totalPrice }).then((res) => console.log(res));
    navigate("/");
  };
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
  



        <AlertDialogContent>
          <AlertDialogHeader>Checkout</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
         
          <Text style={{ fontStyle: 'Calibri Light', fontWeight: 'bold', fontSize: '10px',paddingLeft: '8px',color:"	#D3D3D3" }}>Name</Text>
            <Input
              mt={1}
              mb={1}
              name="name"
              onChange={handleTheChange}
              placeholder="Name"
              
            />
            <Text style={{ fontStyle: 'Calibri Light', fontWeight: 'bold', fontSize: '10px',paddingLeft: '8px',color:"	#D3D3D3" }}>Mobile Number</Text>
            <Input
              mt={1}
              mb={1}
              name="mobileNumber"
              onChange={handleTheChange}
              placeholder="Mobile Number"
            />
            <Text style={{ fontStyle: 'Calibri Light', fontWeight: 'bold', fontSize: '10px',paddingLeft: '8px',color:"	#D3D3D3" }}>Pincode</Text>
            <Input
              mt={1}
              mb={1}
              name="pinCode"
              onChange={handleTheChange}
              placeholder="Pincode"
            />
           <Text style={{ fontStyle: 'Calibri Light', fontWeight: 'bold', fontSize: '10px',paddingLeft: '8px',color:"	#D3D3D3" }}>Flat, House no., Building, Company, Apartment</Text>
             <Input
              mt={1}
              mb={1}
              name="houseNo"
              onChange={handleTheChange}
              placeholder="Flat, House no., Building, Company, Apartment"
            /> 
            <Text style={{ fontStyle: 'Calibri Light', fontWeight: 'bold', fontSize: '10px',paddingLeft: '8px',color:"	#D3D3D3" }}>Area, Street, Sector, Village</Text>
             <Input
              mt={1}
              mb={1}
              name="area"
              onChange={handleTheChange}
              placeholder="Area, Street, Sector, Village"
            /> 
            <Text style={{ fontStyle: 'Calibri Light', fontWeight: 'bold', fontSize: '10px',paddingLeft: '8px',color:"	#D3D3D3" }}>Landmark</Text>
            <Input
              mt={1}
              mb={1}
              name="landmark"
              onChange={handleTheChange}
              placeholder="Landmark"
            />
            <Text style={{ fontStyle: 'Calibri Light', fontWeight: 'bold', fontSize: '10px',paddingLeft: '8px',color:"	#D3D3D3" }}>State</Text>
            <Input
              mt={1}
              mb={1}
              name="state"
              onChange={handleTheChange}
              placeholder="State"
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={handleTheCheckout}
              bgColor={"purple.400"}
              color={"white"}
              ml={3}
            >
              Proceed to Checkout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LaptopCheckout;
