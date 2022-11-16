import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";

function AsesoriasApp() {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default AsesoriasApp;
