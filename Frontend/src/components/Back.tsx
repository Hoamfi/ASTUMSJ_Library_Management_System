import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
  path: string;
}

const Back = ({ path }: Props) => {
  return (
    <div>
      <Link to={path}>
        <span className="mr-5">
          <FaArrowLeft className="inline mx-3" />
          Back
        </span>
      </Link>
    </div>
  );
};

export default Back;
