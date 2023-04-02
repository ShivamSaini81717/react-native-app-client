import Main from './Main';

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const stripeKey ="pk_test_51MMQ2zSC46wSE6HdWntsVN5fdAIZMIb4cSUm3txyAuMGPJApBIAqrRsHxWJOioiWuirNNZawYeI4WPwYc0VTgRS700rAfuh8aV";
export default function App() {
  return (
    <>
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      merchantIdentifier="SAINI-JI"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  
    </>

  );
}


