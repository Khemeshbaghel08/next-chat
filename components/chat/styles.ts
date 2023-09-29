import styled from "styled-components";
import { colors } from "../../global/colors";
import { borderRadius } from "../../global/borders";
import { shadows } from "../../global/shadows";
import * as mixins from "../../global/mixins";

interface chatContainerProps {
  show: boolean;
}

export const ChatContainer = styled.div<chatContainerProps>`
  ${mixins.dimensions("60%", "100%")}
  min-width : 300px;

  background-color: ${colors.HOME_BACKGROUND_DARK};

  position: relative;

  transform-origin: left;
  transition: all 0.2s ease-in-out;
  ${(props) => (props.show ? "transform: scaleX(1);" : "transform: scaleX(0);")}

  @media (max-width: 599px) {
    ${mixins.dimensions("100%", "100%")}

    position: absolute;
    top: 0;
    left: 0;
    z-index: 60;

    ${(props) =>
      props.show
        ? "transform: translateX(0);"
        : "transform: translateX(-100%);"}
  }
`;

export const ChatNavbarContainer = styled.nav`
  ${mixins.dimensions("100%", "60px")}
  ${mixins.flexBox("center")}

  background-color : ${colors.NAV_BACKGROUND_DARK};
  color: ${colors.NAV_ICONS_COLOR};

  ul {
    ${mixins.flexBox("center", "center")}
    ${mixins.dimensions("100%", "60px")}

    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export const BackButton = styled.li`
  ${mixins.flexBox("center", "center")}
  ${mixins.dimensions(undefined, "100%")}

  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const NavbarProfile = styled.li`
  ${mixins.flexBox("center", "center")}
  ${mixins.dimensions(undefined, "60px")}

  padding: 0 10px 0 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const NavbarProfilePicture = styled.div`
  ${mixins.dimensions("40px", "40px")}

  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const NavbarName = styled.li`
  ${mixins.flexBox("center", "start")}
  ${mixins.dimensions("calc(100% - 120px)")}

  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NavbarIconAdd = styled.li`
  ${mixins.flexBox("end", "end")}
  ${mixins.dimensions("50px")}

  cursor: pointer;
`;

export const NavbarIconDropdown = styled.li`
  ${mixins.flexBox("center", "center")}
  ${mixins.dimensions("40px")}

  cursor: pointer;
`;
