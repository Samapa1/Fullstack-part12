import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./store.js";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
