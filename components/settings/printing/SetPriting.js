import styled from "styled-components";

import localState from "@libs/localState";
import { ExplainSuccess } from "@shared/SharedStyle";
import { fontStylesA } from "@shared/Typography";
import Checkbox from "@components/Checkbox";

const ExplainBox = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  flex-basis: fit-content;
  padding: "1rem";
  ${ExplainSuccess};
`;

const PrintingModeLabel = styled.label`
  ${fontStylesA}
  color: ${(props) => props.theme.color.text.formLabel};
  transition: color 0.05s;
  width: 100%;
  display: block;
`;

const PrintingModeWrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
`;

const AutomaticPrintingWrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
`;

const SetPrinting = () => {
  const [printingMode, setPringingMode] = localState("@printingMode", "A4");
  const [automaticPrinting, setAutomaticPrinting] = localState(
    "@automaticPrinting",
    "no"
  );

  const handlePrintingModeChange = (e) => {
    console.log("got here");
    setPringingMode(e.target.value);
  };

  const handleAutomaticPrintingChange = (e) => {
    setAutomaticPrinting(e.target.value);
  };

  return (
    <>
      <ExplainBox className="col col-md col-sm col-12">
        <p>
          Zgjidhni modelin e printimit qe deshironi per faturat. Gjithashtu ju
          mund te zgjidhni printimin direkt pasi behet fatura, ne kete modalitet
          dialogu i printimit ne paisjen tuaj do te shfaqet menjehere pasi
          fatura te jete fiskaliziar
        </p>
      </ExplainBox>
      <div className="col col-md col-sm col-12">
        <PrintingModeLabel>Formati i printimit</PrintingModeLabel>
        <PrintingModeWrapper
          onChange={handlePrintingModeChange}
          style={{ marginTop: "10px", marginBottom: "13px" }}
        >
          <Checkbox
            name="printingMode"
            type="radio"
            label="Standard A4"
            value="A4"
            defaultChecked={printingMode === "A4"}
          />
          <Checkbox
            name="printingMode"
            type="radio"
            label="Printer Termik (shirit)"
            value="thermal"
            defaultChecked={printingMode === "thermal"}
          />
        </PrintingModeWrapper>
      </div>

      {/* <div className="col col-md col-sm col-12">
        <PrintingModeLabel>Deshironi printim automatik?</PrintingModeLabel>
        <AutomaticPrintingWrapper
          onChange={handleAutomaticPrintingChange}
          style={{ marginTop: "10px", marginBottom: "13px" }}
        >
          <Checkbox
            name="automaticPrinting"
            type="radio"
            label="Po"
            value="yes"
            defaultChecked={automaticPrinting === "yes"}
          />
          <Checkbox
            name="automaticPrinting"
            type="radio"
            label="Jo, nuk eshte nevoja"
            value="no"
            defaultChecked={automaticPrinting === "no"}
          />
        </AutomaticPrintingWrapper>
      </div> */}
    </>
  );
};

export default SetPrinting;
