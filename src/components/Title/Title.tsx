import "./style.css";
type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return <div className="title">{title}</div>;
};

export default Title;
