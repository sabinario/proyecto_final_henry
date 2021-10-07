import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterProductsType, getProducts } from "../../../actions";
import { Select } from "../../../css/Select";
import { Button } from "../../../css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

export default function FilterProductTypes() {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.productsCopy);
  let array;
  if (Array.isArray(products)) {
    products = products.map((e) => e.productType);
    products = new Set(products);
    array = [...products];
  }
  // console.log(array);

  function handleFilterType(e) {
    dispatch(filterProductsType(e.target.value));
  }

  function handleButton(e) {
    dispatch(getProducts());
  }

  return (
    <div className="category_filter">
      <div className="actual_filter">
        <p>Filtrar por categoría</p>
        <Select onChange={(e) => handleFilterType(e)} width="50%" height="2.4rem">
          {array &&
            array.map((e, i) => (
              <option key={i++} value={e}>
                {e}
              </option>
            ))}
        </Select>
      </div>
      <Button
        width="10rem"
        padding="0.8rem"
        justify="space-between"
        buttonColor="rgb(21, 151, 67)"
        type="button"
        onClick={(e) => {
          handleButton(e);
        }}
      >
        Restablecer
        <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
      </Button>
    </div>
  );
}
