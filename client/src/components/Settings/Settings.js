import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header, Title, Button, StyledLink, Body } from "../../css";
import {
  AjustesIzquierda,
  OpcionesIzquierda,
  TituloIzquierda,
  AjustesDerecha,
} from "../../css/SettingStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import Products from "./views/Products";
import Generals from "./views/Generals";
// import Comercios from "./views/Comercios";
import Contabilidad from "./views/Contabilidad/Contabilidad";
// import Users from "./views/Users";
import Categorias from "./views/Categorias";
import { changeSettings, getCategories, getUserId } from "../../actions";
import Error403 from "../Home/views/Error403";

export default function Settings() {
  const settings = useSelector((state) => state.settings);
  const token = useSelector((state) => state.userToken);
  const userId = useSelector((state) => state.userId);
  console.log(userId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserId(token));
    setTimeout(() => {
      dispatch(getCategories(token, userId));
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  function handleOptions(e, opt) {
    e.preventDefault();
    dispatch(changeSettings({ show: opt }));
  }

  function renderSwitch(param) {
    switch (param) {
      case "products":
        return <Products />;
      /* case "users":
        return <Users />;
      case "commerce":
        return <Comercios />; */
      case "categorias":
        return <Categorias />;
      case "generales":
        return <Generals />;
      case "contabilidad":
        return <Contabilidad />;
      default:
        return <Generals />;
    }
  }

  if (!token) {
    return <Error403 />;
  }

  return (
    <div>
      <Header>
        <Title>Ajustes</Title>
        <StyledLink to="/home">
          <Button width="11.5rem" height="2.5rem" padding="0.5rem">
            Regresar a Home
          </Button>
        </StyledLink>
      </Header>
      <Body display="flex" padding="4rem 4rem" justifycontent="space-between">
        <AjustesIzquierda>
          <TituloIzquierda>Opciones</TituloIzquierda>
          <OpcionesIzquierda onClick={(e) => handleOptions(e, "generales")}>
            <FontAwesomeIcon icon={faWrench} size="lg" />
            <p>Generales</p>
          </OpcionesIzquierda>

          <OpcionesIzquierda onClick={(e) => handleOptions(e, "products")}>
            <FontAwesomeIcon icon={faWrench} size="lg" />
            <p>Productos</p>
          </OpcionesIzquierda>

          <OpcionesIzquierda onClick={(e) => handleOptions(e, "contabilidad")}>
            <FontAwesomeIcon icon={faWrench} size="lg" />
            <p>Informes Contables</p>
          </OpcionesIzquierda>

          <OpcionesIzquierda onClick={(e) => handleOptions(e, "categorias")}>
            <FontAwesomeIcon icon={faWrench} size="lg" />
            <p>Categorías</p>
          </OpcionesIzquierda>
        </AjustesIzquierda>
        <AjustesDerecha>{settings && renderSwitch(settings.show)}</AjustesDerecha>
      </Body>
    </div>
  );
}
