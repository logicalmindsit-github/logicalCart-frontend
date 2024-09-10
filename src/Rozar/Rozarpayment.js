import axios from "axios";
import { site } from "../components/backend"
export const Rozarpayment = async (amount, handlepayment) => {

     const data = await axios.post(`${site}/rozar-order`, { amount })
     const Name = localStorage.getItem("name");
     var options = {
          key: "rzp_test_Uv6muR6hvdYnv9",
          amount: amount * 100,
          currency: "INR",
          name: Name,
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: data.id,
          handler: function (response) {
               console.log("payment Id:- ", response.razorpay_payment_id);
               console.log("Order Id:- ", response.razorpay_order_id);
               console.log("Signature:- ", response.razorpay_signature);
               handlepayment()

          },
          prefill: {
               name: " ",
               email: " ",
               contact: " ",
          },
          notes: {
               address: "",
          },
          theme: {
               color: "#3399cc",
          },
     };
     var rzp1 = new window.Razorpay(options)
     rzp1.open();
}
