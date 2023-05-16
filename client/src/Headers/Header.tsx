import React, { useEffect, useState } from "react";
import "./Header.css";
import Style from "../App.module.css";
import { useNavigate } from "react-router-dom";
import logoimage from "../MainPage/MainImgs/amuse_logo.png";
import Concierge from "../SubPages/Concierge/Concierge";
import { Link } from "react-router-dom";
import MyPagelist from "../MyPages/MyPageList";
import MyPageMenu from "../MyPages/MyPageMenu";
import axios from "axios";

interface CategoryMenuProps {
  hashtagName: string;
  handleClick: () => void;
}

function Header() {
  const movePage = useNavigate();
  const navigateToHome = () => {
    movePage("/");
  };
  // const navigateToConcierge = () => {
  //   movePage("/Concierge");
  // };
  // const navigateToChildCare = () => {
  //   movePage("/ChildCare");
  // };
  // const navigateToSeniorCare = () => {
  //   movePage("/SeniorCare");
  // };
  // const navigateToOnlineTour = () => {
  //   movePage("/OnlineTour");
  // };
  const navigateToLogIn = () => {
    movePage("/LogIn");
  };
  const navigateToSignUP = () => {
    movePage("/SignUP");
  };

  const searchKeywordStyle = {
    border: "none",
    padding: "14px",
    marginRight: "10px",
    width: "250px",
    backgroundColor: "rgb(235, 235, 235)",
  };

  const CategoryMenu: React.FC<CategoryMenuProps> = ({ hashtagName, handleClick }) => (
    <div className="menu-item" onClick={handleClick}>
      {hashtagName}
    </div>
  );

  const [hashtag, setHashtag] = useState([]);

  useEffect(() => {
    axios
      .get("https://ammuse.store/main/category")
      .then((response) => {
        const hashtagAll = response.data.data.categories;
        const categoryNames = hashtagAll.map((id: any) => id.categoryName);
        setHashtag(categoryNames);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("해시태그 연결 실패");
      });
  }, []);

  return (
    <div>
      <div className={Style["App"]}>
        <div className="top">
          <img className="logo" src={logoimage} alt="Amuse Travel Logo" onClick={navigateToHome} />
          <div className="search-box">
            <input style={searchKeywordStyle} type="text" placeholder="🔍 여행 키워드를 검색해보세요!" />
            <button className="searchBtn">검색</button>
          </div>
          <div className="whiteSquare"></div>
          <button className="loginBtn" onClick={navigateToLogIn}>
            로그인
          </button>
          <button className="signInBtn" onClick={navigateToSignUP}>
            회원가입
          </button>
          <MyPageMenu />
        </div>
        <div className="menu">
          {hashtag.length <= 4
            ? hashtag.map((id: any) => <CategoryMenu key={id} hashtagName={id} handleClick={() => {}} />)
            : hashtag.slice(0, 4).map((id: any) => <CategoryMenu key={id} hashtagName={id} handleClick={() => {}} />)}
          <div className="menu-item"> </div>
          <div className="menu-item">회사 소개</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
