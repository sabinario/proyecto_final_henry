import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, changeStatus } from "../../actions/index";
import {
  Table,
  TableHead,
  TableData,
  TableHd,
  TableRow,
} from "../../css/Table";
import { Button } from "../../css";
import { Select } from "../../css/Select";
import {
  Overlay,
  ModalContainer,
  HeaderModal,
  HeaderModalTitle,
  HeaderModalDetails,
  CategoriasPedidos,
  CloseButton,
  FormModal,
  SelectModal,
  InputModal,
  TablesModal,
  TableProductsModal,
  TablePricesModal,
  InputAmount,
  OrderContainer,
} from "../../css/ModalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import FilterProductTypes from "../Settings/components/FilterProductTypes";

export default function UptadeTable({ state, setStateModal, tableNumber }) {
  const token = useSelector((state) => state.userToken);
  const products = useSelector((state) => state.products);
  const ordenes = useSelector((state) => state.orders.salonOrders);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const orderTableNumber = ordenes
    ? ordenes.find(
      (ord) => ord.tableNumber === tableNumber && ord.estado !== "Finalizada"
    )
    : undefined


const [producto, setProducto] = useState({
  name: "",
  amount: "",
  observations: "",
  price: undefined,
});

const [ordenActual, setOrdenActual] = useState({
  id: orderTableNumber._id,
  products: orderTableNumber.products,
  estado: orderTableNumber.estado,
  totalPrice: orderTableNumber.totalPrice,
})


function handleSubmitAddProduct(e) {
  e.preventDefault();
  orderTableNumber.products.push(producto);
  orderTableNumber.totalPrice = orderTableNumber.products.reduce(function (
    prev,
    actual
  ) {
    return prev + actual.price * actual.amount;
  },
    0);

  setProducto({
    name: "",
    amount: "",
    observations: "",
    price: "",
  });
  document.getElementById("selectProduct").value =
    document.getElementById("inputDefault").value;
}

function handleChangeProduct(e) {
  if (e.target.name === "amount") {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  } else {
    setProducto({
      ...producto,
      price: products.find((p) => p.name === e.target.value).price,
      [e.target.name]: e.target.value,
    });
  }
}

function handleInputAmount(e, name) {
  const product = orderTableNumber.products.find((p) => p.name === name);
  product.amount = e.target.value;
  orderTableNumber.totalPrice = orderTableNumber.products.reduce(function (
    prev,
    actual
  ) {
    return prev + actual.price * actual.amount;
  },
    0);
}

function modifcarOrden(id, payload) {
  MySwal.fire({
    title: "¿Estas seguro?",
    text: "Se modificara el pedido del cliente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1ABD53",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(updateOrder(id, payload, token));
      MySwal.fire({
        title: "Pedido editado",
        text: "La orden se modifico correctamente.",
        icon: "success",
        confirmButtonColor: "#00A0D2",
      });
      setTimeout(() => {
        setStateModal(!state);
      }, 600);
    }
  });
}

function handleClose(e) {
  setStateModal(!state);
}

function handleCloseOrder(id, payload) {
  MySwal.fire({
    title: "¿Estas seguro?",
    text: "Se cerrara el pedido del cliente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1ABD53",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(updateOrder(id, payload, token));
      dispatch(changeStatus({ isOccupated: false, tableNumber }, token));
      MySwal.fire({
        title: "Pedido cerrado",
        text: "El pedido se cerro correctamente.",
        icon: "success",
        confirmButtonColor: "#00A0D2",
      });
      setStateModal(!state);
    }
  });
}
return (
  <div>
    {orderTableNumber && (
      <Overlay display={state ? "flex" : "none"}>
        <ModalContainer>
          <HeaderModal>
            <img src="https://i.imgur.com/0OF9UWi.png" alt="img not found" />
            <HeaderModalTitle>
              <h3>Orden: {orderTableNumber.orderNumber} </h3>
              <h4>Mesa: {orderTableNumber.tableNumber} </h4>
            </HeaderModalTitle>
            <HeaderModalDetails>
              <p>Hora de pedido: {orderTableNumber.hour}</p>
            </HeaderModalDetails>
          </HeaderModal>
          <CloseButton onClick={(e) => handleClose(e)}>
            <FontAwesomeIcon icon={faWindowClose} />
          </CloseButton>
          <OrderContainer>
            <div>
              <CategoriasPedidos>
                <FilterProductTypes />
              </CategoriasPedidos>

              <SelectModal>
                <FormModal onSubmit={(e) => handleSubmitAddProduct(e)}>
                  <Select
                    id="selectProduct"
                    width="83%"
                    height="2.4rem"
                    border="solid 1px black"
                    fontWeight="bold"
                    onChange={(e) => handleChangeProduct(e)}
                    name="name"
                  >
                    <option
                      id="inputDefault"
                      value="none"
                      selected
                      disabled
                      hidden
                    >
                      Seleccione un producto
                    </option>
                    {products &&
                      products.map((e) => {
                        return (
                          <option key={e._id} value={e.name}>
                            {" "}
                            {e.name}{" "}
                          </option>
                        );
                      })}
                  </Select>
                  <InputModal>
                    <input
                      type="number"
                      placeholder="Cant."
                      onChange={(e) => handleChangeProduct(e)}
                      name="amount"
                      value={producto.amount}
                    />
                  </InputModal>
                  <Button type="submit" width="8%" buttonColor="#00C72C">
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                </FormModal>
              </SelectModal>
              <Table id="productsTable">
                <TableHead>
                  <TableRow>
                    <TableHd width="40%">
                      <span className="productName">
                        <p style={{ margin: 0 }}>Nombre</p>
                      </span>
                    </TableHd>
                    <TableHd width="10%">Precio</TableHd>
                    <TableHd width="10%">Cantidad</TableHd>
                  </TableRow>
                </TableHead>
                <tbody>
                  {orderTableNumber &&
                    orderTableNumber.products.map((product) => {
                      return (
                        <TableRow key={product._id}>
                          <TableData>{product.name}</TableData>
                          <TableData>{product.price}</TableData>
                          <TableData>
                            <input
                              onChange={(e) =>
                                handleInputAmount(e, product.name)
                              }
                              placeholder={product.amount}
                              name="totalAmount"
                            />
                          </TableData>
                          {/* <TableData>
                          <div className="options">
                            <Button
                              onClick={(e) =>
                                handleClick(e, {
                                  name: product.name,
                                  price: product.price,
                                  cantidad: product.cantidad,
                                  _id: el._id,
                                })
                              }
                              width="2rem"
                              height="2rem"
                              buttonColor="rgb(2, 101, 210)"
                            >
                              <FontAwesomeIcon
                                icon={faPenSquare}
                              ></FontAwesomeIcon>
                            </Button>
                            <Button
                              onClick={(e) => handleDelete(el._id)}
                              width="2rem"
                              height="2rem"
                              buttonColor="rgba(255, 0, 0, 1)"
                            >
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </Button>
                          </div>
                        </TableData> */}
                        </TableRow>
                      );
                    })}
                </tbody>
              </Table>
            </div>
            <div style={{ display: "flex" }}>
              <TablePricesModal>
                <p>Monto Total: ${orderTableNumber.totalPrice}</p>
                <Button
                  width="8rem"
                  height="25px"
                  buttonColor="#00C2FF"
                  onClick={() =>
                    handleCloseOrder(orderTableNumber._id, {
                      products: orderTableNumber.products,
                      totalPrice: orderTableNumber.totalPrice,
                      estado: "Finalizada",
                    })
                  }
                >
                  Cerrar
                </Button>
              </TablePricesModal>
            </div>
          </OrderContainer>

          <button
            onClick={() =>
              modifcarOrden(orderTableNumber._id, {
                products: orderTableNumber.products,
                totalPrice: orderTableNumber.totalPrice,
                estado: orderTableNumber.estado,
              })
            }
          >
            Aceptar
          </button>
        </ModalContainer>
      </Overlay>
    )}
  </div>
);
}
