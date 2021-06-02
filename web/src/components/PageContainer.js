// Components
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function PageContainer(props) {
  return (
    <div className="d-flex container-full">
      <SideBar index={props.index} chat={{ ...props.chat }} />
      <div className="contain-side-bar">
        <Header {...props.search} chat={{ ...props.chat }} />
        {props.children}
      </div>
    </div>
  );
}
