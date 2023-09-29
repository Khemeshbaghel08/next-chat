import styled from "styled-components";
import { colors } from "../../global/colors";
import * as mixins from "../../global/mixins";

export const HomeContainer = styled.div`
  ${mixins.dimensions("100%", "100%")}
  background-color: ${colors.HOME_BACKGROUND_DARK};
  display: flex;
  overflow: auto;

  @media (max-width: 599px) {
    display: block;
  }
`;
