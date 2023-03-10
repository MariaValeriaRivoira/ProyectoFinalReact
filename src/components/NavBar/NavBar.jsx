import React, { useEffect, useState } from "react";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { auth } from "../../firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import './NavBar.css';

const NavBar = () => {
  const { cartList } = useCartContext();

  useEffect(() => {
    let num = 0;
    cartList.map((e) => {
      num = num + e.cantidad;
    });
    setCount(num);
    onAuthStateChanged(auth, (user) => {
      if (user) setOnline(user);
      else setOnline(null);
    });
  }, [cartList]);

  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(false);
  const [show, setShow] = useState(false);
  const [online, setOnline] = useState("");

  const showNav = () => {
    setCurrent(!current);
  };

  return (
    <div>
      <nav>
        <div className="brand">
          <Link to={"/"}>
            <img className="logo" src="/public/flor.png"></img>
          </Link>
          <h2>Perfumeria Hoy</h2>
          
          
        </div>
        <ul className={current ? "items show" : "items"}>
          
          <li>
            <Link to={"/productos"}>Todos los Productos</Link>
          </li>
          
          <li>
              <Link to={"/categoria/perfumes"}>Perfumes</Link>
          </li>
          <li>
                <Link to={"/categoria/cremas"}>Cremas</Link>
          </li>
          <li>
                <Link to={"/categoria/maquillajes"}>Maquillajes</Link>
          </li>
        </ul>
          
        
        <ul className={current ? "userConfig show" : "userConfig"}>
          
        
          {online ? (
            <li>
              <Link to={online ? `/${online.uid}/perfil` : "/login"}>
                <i className="fa-solid fa-user" />
              </Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to={"/login"}>
              <img src="/public/login.png"></img>
                
              
            </Link>
          </li>
          <CartWidget count={count} />
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
