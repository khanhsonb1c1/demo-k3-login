import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../axiosconfig";
import AccountType from "../../type/AccountType";

function Login() {
  const [accountList, setAccountList] = useState(Array<AccountType>);

  const [email, setEmail] = useState(""); 
  const [pass, setPass] = useState(""); 

  const navigate = useNavigate()


  useLayoutEffect(() => {
    handleFetchData();
  }, []);



  const handleFetchData = () => {
    account.get("/account").then(({ data }) => {
      setAccountList(data);
    });
  };

  const handleSubmit = () => {
  const fin_acc =  accountList.find((acc) => {
      return  acc.email === email;
    })

    if(fin_acc) {
        if(fin_acc.password === pass){
            // login thanh cong
            navigate("/")
        } else {
            // sai mat khau

            // Xử lý lỗi: hiển thị thông báo lỗi ( dùng toastify)
        }
    } else {
        // can not find account
    }
  }




  return <div>login page

    <input type="text" value={email}  onChange={(e) => setEmail(e.target.value) }/>
    <input type="password"  value={pass} onChange={(e) => setPass(e.target.value) }/>

    <button>Chuyến đến đăng ký</button>

    <button onClick={handleSubmit}>Submit</button>
  </div>;
}

export default Login;
