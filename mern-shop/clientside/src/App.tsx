import { FC, memo, useState, useEffect } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ResetPassword } from "./Components/ResetPassword/ResetPassword";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { EnterNewPassword } from "./Components/EnterNewPassword/EnterNewPassword";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import { allProducts } from "./Actions";
import { PaymentComplete } from "./Components/PaymentComplete/PaymentComplete";
import { Form } from "./Components/Form/Form";
import ProductList from "./Components/ProductList/ProductList";
import Cookies from "universal-cookie";
import Navbar from "./Components/Navbar/Navbar";
import { fetchData } from "./Services/api";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";

const App: FC<AppProps> = () => {
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const cookies = new Cookies("AccessToken");

  const fetchProductApi = async () => {
    setLoader(false);
    try {
      const products = await fetchData();
      dispatch(allProducts(products));
      setLoader(true);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setIsAuth(false);
    fetchProductApi();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/reset-password/:id/:token" element={<EnterNewPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter >
  );
};

const mapStateToProps = (state: any) => {
  return {
  };
};

const connector = connect(mapStateToProps);
type AppProps = ConnectedProps<typeof connector>;
export default connector(memo(App));