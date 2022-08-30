import { React, ReactDOM } from "./whichReact";
import "./index.css";
import SetStatePage from "./pages/SetStatePage";
import DiffPage from "./pages/DiffPage";

// ReactDOM.render(<SetStatePage />, document.getElementById("root"));

ReactDOM.render(<DiffPage />, document.getElementById("root"));

// ReactDOM.createRoot(document.getElementById("root")).render(<DiffPage />);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <UseDeferredValuePage />
// );

// console.log("React", React.version); //sy-log
