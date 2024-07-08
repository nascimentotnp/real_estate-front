import { useNavigate } from "react-router-dom";

const withNavigation = (Component: any) => {
  return (props: any) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigation;
