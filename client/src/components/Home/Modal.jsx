import React, {useState} from "react";
import styled from "styled-components";

export default function Modal({
  state,
  setStateModal,
  title,
  label1,
  label2,
  label3,
  label4,
  modalContainerBox,
  modalDispatch,
  id,
}) {
  // const dispatch=useDispatch();
  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-x-square-fill"
      viewBox="0 0 16 16"
    >
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
    </svg>
  );

  const[inputMod1, setInputMod1] = useState({
    name:"",
    user:"",
    pass:"",
  })

  const[inputMod2, setInputMod2] = useState({
    name:"",
    location:"",
  })

  const[inputMod3, setInputMod3] = useState({
    name:"",
    description:"",
    price:"",
    type:""
  })
  

  const conditionalForm = () => {
    if (id === 1) {
      return (
        <form >
          <label>{label1}</label>
          <br />
          <input type="text" name="name" value={inputMod1.name} onChange={handleChange}/>
          <label>{label2}</label>
          <br />
          <input type="text" />
          <label>{label3}</label>
          <br />
          <input type="text" />
        </form>
      );
    }
    if (id === 2) {
      return (
        <form>
          <label>{label1}</label>
          <br />
          <input type="text" />
          <label>{label2}</label>
          <br />
          <input type="text" />
        </form>
      );
    }
    if (id === 3) {
      return (
        <form>
          <label>{label1}</label>
          <br />
          <input type="text" />
          <label>{label2}</label>
          <br />
          <input type="text" />
          <label>{label3}</label>
          <br />
          <input type="text" />
          <label>{label4}</label>
          <br />
          <input type="text" />
        </form>
      );
    }
    // if ("Modal4") {
    //   return (
    //     <form>
    //       <label>{label1}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label2}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label3}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label4}</label>
    //       <br />
    //       <input type="text" />
    //     </form>
    //   );
    // }
    // if ("Modal5") {
    //   return (
    //     <form>
    //       <label>{label1}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label2}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label3}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label4}</label>
    //       <br />
    //       <input type="text" />
    //     </form>
    //   );
    // }
    // if ("Modal6") {
    //   return (
    //     <form>
    //       <label>{label1}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label2}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label3}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label4}</label>
    //       <br />
    //       <input type="text" />
    //     </form>
    //   );
    // }
    // if ("Modal7") {
    //   return (
    //     <form>
    //       <label>{label1}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label2}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label3}</label>
    //       <br />
    //       <input type="text" />
    //       <label>{label4}</label>
    //       <br />
    //       <input type="text" />
    //     </form>
    //   );
    // }
  };

  function handleSubmit(e) {
    // e.preventDefault();
    alert("acepté el formulario");
  }

  return (
    <>
      {state && (
        <Overlay>
          <ModalContainer modalContainerBox={modalContainerBox}>
            <HeaderModal>
              <h2>{title}</h2>
            </HeaderModal>
            <CloseButton onClick={() => setStateModal(!state)}>
              {closeIcon}
            </CloseButton>
            {conditionalForm(label3, label2)}
            <button onClick={(e)=> handleSubmit(e)}>Aceptar</button>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.form`
  width: 500px;
  height: ${(props) => (props.modalContainerBox ? "520px" : "430px")};
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: 5px -5px 10px 2px rgba(0, 0, 0, 0.25),
    -5px 5px 10px 2px rgba(0, 0, 0, 0.25);

  input {
    width: 400px;
    height: 35px;
    left: 50px;
    right: 50px;
    margin: 10px 50px;
    border-radius: 12px;
  }

  label {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    left: 50px;
    right: 50px;
    margin: 10px 50px;
  }

  button {
    position: absolute;
    margin: 50px 0px 0px 180px;

    padding: 10px 30px;
    border-radius: 5px;
    color: #ffffff;
    border: none;
    background: #00c2ff;
    cursor: pointer;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-weight: bold;

    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;

    &:hover {
      background-color: #1766dc;
      color: #ffffff;
      font-weight: bolder;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
    }
  }
`;

const HeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;

  h2 {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #000000;
    margin: 30px 0px 0px 50px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #00c2ff;

  &:hover {
    color: #ff0000;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
