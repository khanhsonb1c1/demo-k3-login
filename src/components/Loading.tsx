import { MDBSpinner } from "mdb-react-ui-kit";
import "./styles.css";

export default function LoadingComponent() {
  return (
    <div className="loading">
      <MDBSpinner role="status" className="loading-icon">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
}
