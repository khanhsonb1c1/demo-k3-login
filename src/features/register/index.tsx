import emailjs from "@emailjs/browser";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PUBLIC_KEY, SERVICE_ID, THEME_ID } from "../../commons";
import "./styles.css";
import ModalComponent from "../../components/Modal";
import { account } from "../../axiosconfig";
import LoadingComponent from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Inputs = {
  user_email: string;
  password: string;
  retype_password: string;
  accept_term: boolean;
};

function Register() {
  const [isModal, setIsModal] = useState(false);
  const [verifyCode, setCode] = useState("");
  const [form, setForm] = useState({} as Inputs);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isAccept, setAccept] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {

    //JSON.parse(JSON.stringify(data)): ý nghĩa: nó là 1 trong 3 cách clone object

    setForm(JSON.parse(JSON.stringify(data)));

    handleSendEmail(data);

    setIsModal(true);
    console.log(verifyCode, "par code");
  };

  // const handleRamdomVerifyCode = () => {
  //   const min = 100000; // Minimum value (inclusive)
  //   const max = 999999; // Maximum value (inclusive)

  //   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //   // verifyCode = String(randomNumber);
  //   setCode(String(randomNumber));
  // };

  const handleCreateAccount = () => {
    setLoading(true);
    console.log(form, "form data");
    account
      .post("/account", {
        email: form.user_email,
        password: form.password,
        avata_url: "",
        full_name: "",
      })
      .then(({ data }) => {
        console.log(data, "res");
        const id = data.id;
        setLoading(false);
        // lưu vào localStorage 1 cái key id_account
        localStorage.setItem("id_account", id);
        navigate("/update-user");
      })
      .catch((err) => {

        setLoading(false);
      });
  };

  const handleSendEmail = (data: Inputs) => {

    //$ tạo mã verify
    // handleRamdomVerifyCode();
    const min = 100000; // Minimum value (inclusive)
    const max = 999999; // Maximum value (inclusive)

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setCode(String(randomNumber));


    //$ gửi email
    // sử dụng thư viện emailJS
    const sendParams = {
      user_email: data.user_email,
      number_verify: String(randomNumber),
    };

    emailjs.send(SERVICE_ID, THEME_ID, sendParams, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
        setIsModal(true);
        setErr("");
        // toast('thanh cong')
      },
      (error) => {
        console.log(error.text);
        // hãy setup toast error
        // toast.error(error.text)
        setErr(error.text);
      }
    );
  };

  const handleUpdateStatusModal = (e: any) => {
    setIsModal(false);
  };

  return (
    <>
      <ModalComponent
        code={verifyCode}
        title="Verify account"
        isShow={isModal}
        onUpdate={handleUpdateStatusModal}
        onSuccess={handleCreateAccount}
      />
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                <p className="text-white-50 mb-3">
                  Please enter your login and password!
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-floating mb-4 w-100">
                    <input
                      type="email"
                      className="form-control"
                      {...register("user_email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                    <label htmlFor="formControlLg" className="form-label">
                      Email
                    </label>
                    {errors.user_email && (
                      <span className="fs-small text-danger">
                        Invalid email{" "}
                      </span>
                    )}
                  </div>

                  <div className="form-floating mb-4 w-100">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      {...register("password", {
                        required: "Email is required",
                        maxLength: 30,
                        minLength: 6,
                      })}
                    />
                    <label htmlFor="formControlLg" className="form-label">
                      Password
                    </label>
                    {errors.password && (
                      <span className="text-danger fs-small">
                        Invalid password
                      </span>
                    )}
                  </div>
                  <div className="form-floating mb-4 w-100">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      {...register("retype_password", {
                        required: true,
                        maxLength: 30,
                        minLength: 6,
                        validate: (value) =>
                          value === watch("password") ||
                          "Password is not match",
                      })}
                    />
                    <label htmlFor="formControlLg" className="form-label">
                      Retype password
                    </label>
                    {errors.retype_password && (
                      <span className="text-danger fs-small">
                        retype password invalid
                      </span>
                    )}
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      {...register("accept_term", { required: true })}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      I accept with term.
                    </label>
                    {errors.accept_term && (
                      <span className="text-danger fs-small">
                        you must accept term
                      </span>
                    )}
                  </div>

                  {/* <MDBBtn size="lg">Register</MDBBtn> */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 p-2"
                    // onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>

                <hr className="my-4" />

                <button type="button" className="btn btn-danger w-100 p-2 mb-2">
                  Sign in with Google
                </button>
                <button type="button" className="btn btn-primary w-100 p-2">
                  Sign in with facebook
                </button>

                {err && (
                  <span className="text-danger fs-small mt-3">{err}</span>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <ToastContainer />

      </MDBContainer>
      {loading && <LoadingComponent />}
    </>
  );
}

export default Register;
