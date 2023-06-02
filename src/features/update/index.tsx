import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLayoutEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { account } from "../../axiosconfig";
import "./styles.css";
import { useNavigate } from "react-router-dom";

type Inputs = {
  full_name: string;
  address: string;
};

function UpdateUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>(); // react hook form

  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dionk3ia2/image/upload/v1681227135/blogger/song/sseihiy9wg0urcyoxzbh.jpg?fbclid=IwAR38LcqAwgTuCNB3LX7PoKVnopxPMwHCLMbv2bDNCC5wyglPmDxqgt_lZlM"
  );
  
  const navigate = useNavigate();

  // lấy id trong localStorage
  const id = localStorage.getItem("id_account");

  // open camera
  const [isOpenCamera, setOpenCamera] = useState(false);

  let videoRef = useRef(null as any);
  let canvasRef = useRef(null as any);
  const streamRef = useRef<MediaStream | null>(null);

  //$ methods

  useLayoutEffect(() => {
    handleFetch();
  }, []);


  const handleFetch = () => {
    account.get(`/account/${id}`).then(({ data }) => {
      console.log(data, "data fetch");
      setAvatar(data.avata_url)
      setEmail(data.email);
    }).catch((err)=> {
      // thêm lỗi
    });
  };

  

  // choose file from computer
  const handleUpload = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setAvatar(selectedFile);

      // xử lý hiển thị ảnh (preview)
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCaptureImage = () => {
    const video = videoRef.current;

    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedImageURL = canvas.toDataURL("image/png") as any;
    setAvatar(capturedImageURL);
    //   console.log(URL.createObjectURL(capturedImageURL))
    handleStopCamera();
  };

  const handleOpenCamera = async () => {
    setOpenCamera(true);

    // xử lý bật camera
    try {
      const constraints = { video: true };

      // của trình duyệt
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleStopCamera = () => {
    if (streamRef.current) {
      const stream = streamRef.current;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
      setOpenCamera(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // setForm(JSON.parse(JSON.stringify(data)));
    account.put(`/account/${id}`, {
      full_name: data.full_name,
      address: data.address,
      avata_url: avatar,
    }).then((res) => {
      navigate("/")
    }).catch((err) => {
      //
    });
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <span className="text-primary mb-3 ms-2">
                  Hello <span className="text-danger">{email}</span>, You must
                  be update your information !
                </span>

                <div className="avatar">
                  <img src={avatar} alt="" />
                  <div className="btn-group mb-5 mt-3">
                    <input
                      type="file"
                      id="upload"
                      hidden
                      onChange={handleUpload}
                    />
                    <label htmlFor="upload" id="btn-up">
                      Choose file
                    </label>
                    <button className=" btn-open" onClick={handleOpenCamera}>
                      Capture
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-floating mb-4 w-100">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      {...register("full_name", {
                        required: true,
                        maxLength: 50,
                        minLength: 3,
                        pattern: {
                          value: /^[^\d]+$/,
                          message: 'Input should not contain numbers',
                        },
                      })}
                    />
                    <label htmlFor="formControlLg" className="form-label">
                      Full name
                    </label>
                    {errors.full_name && (
                      <span className="text-danger fs-small">
                        Invalid full name
                      </span>
                    )}
                  </div>
                  <div className="form-floating mb-4 w-100">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      {...register("address", {
                        required: true,
                        maxLength: 100,
                        minLength: 3,
                      })}
                    />
                    <label htmlFor="formControlLg" className="form-label">
                      Address
                    </label>
                    {errors.address && (
                      <span className="text-danger fs-small">
                        Invalid address
                      </span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 p-2">
                    Submit
                  </button>
                </form>

                {isOpenCamera && (
                  <div className="wrap-video">
                    <div className="video">
                      <video ref={videoRef} autoPlay playsInline />
                      <canvas ref={canvasRef} className="d-none" />
                      <div className="d-flex justify-content-evenly">
                        <button
                          className="btn btn-success"
                          onClick={handleCaptureImage}
                        >
                          Capture
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={handleStopCamera}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <hr className="my-4" />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default UpdateUser;
