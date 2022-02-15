import React from "react";
import "./ValidationError.scss";

const ValidationError = ({ message }: { message: string }) => {
  return <div className="validation-error">{message}</div>;
};

export default ValidationError;
