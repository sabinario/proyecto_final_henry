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
    : undefined;

  const [producto, setProducto] = useState({
    name: "",
    amount: "",
    observations: "",
    price: undefined,
  });

  const [ordenActual, setOrdenActual] = useState({
    id: orderTableNumber._id,
    orderNumber: orderTableNumber.orderNumber,
    date: orderTableNumber.date,
    hour: orderTableNumber.hour,
    tableNumber: orderTableNumber.tableNumber,
    products: orderTableNumber.products.map((prod) => {
      return { ...prod };
    }),
    estado: orderTableNumber.estado,
    totalPrice: orderTableNumber.totalPrice,
  });

  function handleSubmitAddProduct(e) {
    e.preventDefault();
    setOrdenActual((prev) => {
      return {
        ...prev,
        products: [...prev.products, producto],
      };
    });
    setOrdenActual((prev) => {
      return {
        ...prev,
        totalPrice: prev.products.reduce(function (prev, actual) {
          return prev + actual.price * actual.amount;
        }, 0),
      };
    });

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
    setOrdenActual((prev) => {
      const product = prev.products.find((p) => p.name === name);
      product.amount = e.target.value;
      return {
        ...prev,
      };
    });
    setOrdenActual((prev) => {
      return {
        ...prev,
        totalPrice: prev.products.reduce(function (prev, actual) {
          return prev + actual.price * actual.amount;
        }, 0),
      };
    });
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
    setOrdenActual({
      id: orderTableNumber._id,
      orderNumber: orderTableNumber.orderNumber,
      date: orderTableNumber.date,
      hour: orderTableNumber.hour,
      tableNumber: orderTableNumber.tableNumber,
      products: orderTableNumber.products,
      estado: orderTableNumber.estado,
      totalPrice: orderTableNumber.totalPrice,
    });
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
              <img
                src="https://i.imgur.com/vM38VRe.png?1"
                alt="img not found"
              />
              <HeaderModalTitle>
                <h3>Orden: {ordenActual.orderNumber} </h3>
              </HeaderModalTitle>
              <HeaderModalDetails>
                <p>Hora de pedido: {ordenActual.hour}</p>
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
                              {e.name}
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
                    {ordenActual &&
                      ordenActual.products.map((product) => {
                        return (
                          <TableRow key={product.name}>
                            <TableData>{product.name}</TableData>
                            <TableData>{product.price}</TableData>
                            <TableData>
                              <input
                                onChange={(e) =>
                                  handleInputAmount(e, product.name)
                                }
                                placeholder={product.amount}
                              />
                            </TableData>
                          </TableRow>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
              <div style={{ display: "flex" }}>
                <TablePricesModal>
                  <p>Monto Total: ${ordenActual.totalPrice}</p>
                  <Button
                    width="8rem"
                    height="25px"
                    buttonColor="#00C2FF"
                    onClick={() =>
                      handleCloseOrder(ordenActual.id, {
                        products: ordenActual.products,
                        totalPrice: ordenActual.totalPrice,
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
                modifcarOrden(ordenActual.id, {
                  products: ordenActual.products,
                  totalPrice: ordenActual.totalPrice,
                  estado: ordenActual.estado,
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