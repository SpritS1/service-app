import React from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";

interface Props {}

const Logo = (props: Props) => {
  return (
    <Link to="/" className="logo">
      YourService
    </Link>
  );
};

export default Logo;
