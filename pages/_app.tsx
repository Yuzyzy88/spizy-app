import { BaseLayout } from "../layouts/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../state/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Provider>
  );
}

export default MyApp;
