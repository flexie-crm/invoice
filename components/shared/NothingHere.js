import styled, { css } from "styled-components";
import { Heading2 } from "@shared/Headings";
import { fontStylesA } from "@shared/Typography";
import Link from "next/link";

const StyledLink = styled.a`
  width: ${(props) => (props.wide ? "100%" : "initial")};
  border: none;
  border-radius: 10rem;
  padding: 1rem 1.5rem;
  background: #7c5dfa;

  color: white;
  font-family: "Spartan", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.25;
  -webkit-font-smoothing: antialiased;

  transition: background 0.05s, color 0.05s;
  outline: none;

  :hover {
    background: #9277ff;
  }

  display: inline-block;
  margin-top: 40px;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  min-height: calc(100vh - 80px);

  .illustration-wrapper {
    padding-bottom: 4rem;
  }
`;

const Image = styled.img`
  margin-bottom: 1.5rem;
`;

const Heading = styled(Heading2)`
  margin-bottom: 0.5rem;
`;

const Paragraph = styled.p`
  ${fontStylesA}
  line-height: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const NothingHere = ({ className }) => {
  return (
    <Wrapper className={className}>
      <div className="illustration-wrapper">
        <Image src="/images/illustration-empty.svg" alt="" />
        <Heading>Gabim - Nuk u Gjet!</Heading>
        <Paragraph>
          Kjo faqe nuk ekziston ose nuk është akoma gati, duhet te shkosh në
          fillim.
        </Paragraph>
        <Link href={`/`} passHref={true} scroll={true}>
          <StyledLink>Shko ne fillim</StyledLink>
        </Link>
      </div>
    </Wrapper>
  );
};

export default NothingHere;
