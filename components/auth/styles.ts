import styled from "styled-components";
import { Button } from "reactstrap";

import * as mixins from "../../global/mixins";
import { borderRadius } from "../../global/borders";
import { colors } from "../../global/colors";
import { shadows } from "../../global/shadows";

export const AuthContainer = styled.div`
  ${mixins.dimensions("100%", "100%")}
  ${mixins.flexBox("center", "center")}

  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    ${mixins.dimensions("100%", "30%")}
    background: ${colors.TEAL_GREEN_LIGHT};
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    ${mixins.dimensions("100%", "70%")}
    background: ${colors.BACKGROUND_DARK};
    z-index: -1;
  }
`;

export const AuthForm = styled.div`
  ${mixins.dimensions("60%", "75%")}
  ${mixins.flexBox("center", "center")}

  background-color: ${colors.BACKGROUND_LIGHT};
  box-shadow: ${shadows.SHADOW_NORMAL};
  border-radius: ${borderRadius.ROUNDED_NORMAL};

  @media (max-width: 768px) {
    ${mixins.dimensions("95%")}
  }
`;

export const LoginButton = styled(Button)`
  box-shadow: ${shadows.SHADOW_NORMAL};
`;

export const Logo = styled.img`
  ${mixins.dimensions(undefined, "50px")}
  border-radius: 5px;
`;
