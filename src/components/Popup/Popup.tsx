import "./Popup.scss";

interface Props {
  content: string;
  type?: "default" | "error";
}

const Popup = ({ content, type = "default" }: Props) => {
  return (
    <div className={`popup ${type ? `popup--${type}` : ""}`}>{content}</div>
  );
};

export default Popup;
