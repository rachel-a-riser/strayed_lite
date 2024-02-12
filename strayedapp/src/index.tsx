import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render( <MantineProvider

>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </MantineProvider>);
