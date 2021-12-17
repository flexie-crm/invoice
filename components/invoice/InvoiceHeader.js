import styled from "styled-components";

import InvoiceStatus from "@shared/InvoiceStatus";
import { ButtonPlus } from "@shared/Buttons";
import { fontStylesA } from "@shared/Typography";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 1rem;
  background: ${(props) => props.theme.color.invoiceItem.bg};
`;

const Status = styled.span`
  ${fontStylesA}
  margin-right: auto;
  display: none;

  @media only screen and (min-width: 650px) {
    margin-right: 1rem;
    display: inherit;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const Button = styled(ButtonPlus)`
  @media only screen and (min-width: 550px) {
    .btn-plus-invoice {
      display: initial;
    }
  }
`;

export default function InvoiceHeader({
  className,
  status,
  setPopupIsOpen,
  setFormIsOpen,
  printHandler,
  handlePaid,
}) {
  return (
    <Wrapper className={className}>
      <Status>Status</Status>
      <InvoiceStatus status={status} />
      <Buttons>
        <Button hidePlus alert onClick={() => {}}>
          Anullo
        </Button>
        <Button
          hidePlus
          onClick={printHandler}
          style={{ display: "flex", alignItems: "center" }}
        >
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 490 490"
            style={{
              fill: "#fff",
              width: "20px",
              marginLeft: "6px",
              marginRight: "6px",
            }}
          >
            <path
              strokeWidth="20"
              stroke="#fff"
              d="M420.931,104.275h-44.166V0H113.236v104.275H69.069C30.982,104.275,0,136.499,0,176.104v123.732
		c0,39.615,30.982,71.839,69.069,71.839h33.506V490h284.839V371.675h33.516c38.089,0,69.069-32.224,69.069-71.839V176.104
		C490,136.499,459.02,104.275,420.931,104.275z M134.087,20.852h221.827v83.424H134.087V20.852z M366.564,469.149H123.427V290.204
		h243.137V469.149z M469.149,299.836c0,28.109-21.635,50.987-48.218,50.987h-33.516v-81.47H102.576v81.47H69.069
		c-26.583,0-48.218-22.878-48.218-50.987V176.104c0-28.11,21.635-50.978,48.218-50.978h351.862
		c26.583,0,48.218,22.867,48.218,50.978V299.836z"
            />
            <rect
              x="173.997"
              y="337.975"
              width="141.997"
              height="20.852"
              strokeWidth="20"
            />
            <rect
              x="173.997"
              y="395.508"
              width="141.997"
              height="20.852"
              strokeWidth="20"
            />
            <rect
              x="366.34"
              y="173.354"
              width="31.124"
              height="20.852"
              strokeWidth="20"
            />
          </svg>
          <span className="btn-plus-invoice">Printo</span>
        </Button>
      </Buttons>
    </Wrapper>
  );
}
