import styled from "styled-components";
import Form from "./form/Form";
import FormHead from "./form/FormHead";
import Input from "./form/Input";
import Button from "./Button";
import { useGeneralContext } from "../contexts/GeneralContext";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const StyledSearchForm = styled.div`
  min-width: 400px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem auto;
  & input {
    min-width: 250px;
  }
  & button {
    font-size: 0.85rem !important;
  }
`;
function SearchForm({ searchFor }) {
  const { handleCloseModal } = useGeneralContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery === "") {
      setSearchParams({});
    } else {
      setSearchParams({ query: searchQuery });
    }
    handleCloseModal();
  }

  return (
    <StyledSearchForm>
      <Form onSubmit={handleSearch}>
        <FormHead>Search for {searchFor}</FormHead>
        <Div>
          <Input
            placeholder={searchFor}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="secondary">search</Button>
        </Div>
      </Form>
    </StyledSearchForm>
  );
}

export default SearchForm;
