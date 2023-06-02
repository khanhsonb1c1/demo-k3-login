import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle
} from "mdb-react-ui-kit";
import {
  PropsWithChildren,
  useEffect
} from "react";
import "./styles.css"

import { ToastContainer, toast } from 'react-toastify';
import ReactCodeInput from "react-verification-code-input";
import CountDownComponent from "./CountDown";
import 'react-toastify/dist/ReactToastify.css';


type PropsType = PropsWithChildren<{
  title: string;
  isShow: boolean;
  code: string;
  onUpdate: any;
  onSuccess: any;
}>;

function ModalComponent({ title, isShow, code, onUpdate, onSuccess }: PropsType) {

  const onChangeInput = (e: any) => {
    if (e == code) {
      onSuccess()
    } else {
      toast.error("Code invalid!");
    }
  };
  return (
    <>
      <MDBModal show={isShow} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={onUpdate}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {/* input code  */}
              <div className=" row">
                <div className="col-12 d-flex justify-content-around">
                  <ReactCodeInput onComplete={onChangeInput} />
                </div>
                <div className="col-12 mt-3 d-flex justify-content-around">
                  <CountDownComponent onCountDown={onUpdate} />
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer />
    </>
  );
}

export default ModalComponent;
