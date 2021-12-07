import { Link } from "../../ssr/components/Link";
import Title from "../components/Title";
import "../assets/css/styles.css";

const Test = () => {
  return (
    <div className="body">
      <Title title="Test" />

      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Test;
