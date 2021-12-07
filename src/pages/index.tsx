import { useState } from "react";
import { Link } from "../../ssr/components/Link";
import { GetServerSideProps } from "../../ssr/helpers/types";
import Title from "../components/Title";
import "../assets/css/styles.css";
export const getServerSideProps: GetServerSideProps = async () => {
  return { message: "Click here " };
};

type Props = {
  message: string;
};
const Homepage = ({ message }: Props) => {
  const [count, setCount] = useState(0);
  return (
    <div className="body" onClick={() => console.log(message)}>
      <Title title="Home" />

      <button onClick={() => setCount(count + 1)}>{message} </button>
      <p className="description">{count} </p>

      <Link to="/test">Go to test</Link>
    </div>
  );
};

export default Homepage;
