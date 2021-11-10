import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import DropdownOption from "./DropdownOption";
import { Heading4 } from "../shared/Headings";

const Header = styled.button`
  width: max-content;
  height: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;

  img {
    transition: transform 0.05s;
  }

  :focus-visible {
    outline: 2px dotted #7c5dfa;
  }
`;

const Heading = styled(Heading4)`
  margin-right: 0.75rem;

  span {
    display: none;
  }

  @media only screen and (min-width: 550px) {
    margin-right: 1rem;

    span {
      display: initial;
    }
  }
`;

const Options = styled.div`
  position: absolute;
  bottom: -9rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 12rem;
  border-radius: 8px;
  box-shadow: 0px 10px 20px ${(props) => props.theme.color.dropdown.shadow};
  padding: 1.5rem;
  background: ${(props) => props.theme.color.dropdown.bg};

  transition: box-shadow 0.05s, background 0.05s;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;

  ${Header} {
    img {
      transform: ${(props) => (props.open ? "rotate(-180deg)" : "rotate(0)")};
    }
  }

  ${Options} {
    display: flex;

    ${(props) =>
      !props.open &&
      css`
        position: absolute;
        width: 1px;
        height: 1px;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        overflow: hidden;
      `}
  }
`;

export default function Dropdown({ setFilter }) {
  const dropdown = useRef();
  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState([
    {
      id: 0,
      value: "paid",
      label: "Paguar",
      checked: false,
    },
    {
      id: 1,
      value: "pending",
      label: "Ne Pritje",
      checked: false,
    },
    {
      id: 2,
      value: "draft",
      label: "Draft",
      checked: false,
    },
  ]);

  function handleClick(id) {
    setOptions(
      options.map((option) => {
        if (id === option.id) {
          setFilter(option.checked ? null : option.value);
          return { ...option, checked: !option.checked };
        }
        return { ...option, checked: false };
      })
    );
  }

  function handleClickOutside(e) {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <Wrapper ref={dropdown} open={open}>
      <Header
        id="dropdown-filter-header"
        aria-controls="dropdown-filter-options"
        onClick={() => setOpen(!open)}
      >
        <Heading as="span">
          Filtro <span>me status</span>
        </Heading>
        <img src="/images/icon-arrow-down.svg" alt="" />
      </Header>
      <Options
        id="dropdown-filter-options"
        aria-labelledby="dropdown-filter-header"
      >
        {options.map((option) => {
          return (
            <DropdownOption
              key={option.id}
              id={option.id}
              checked={option.checked}
              handleClick={handleClick}
            >
              {option.label}
            </DropdownOption>
          );
        })}
      </Options>
    </Wrapper>
  );
}
