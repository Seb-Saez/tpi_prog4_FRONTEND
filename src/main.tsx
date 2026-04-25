import "./index.css"
import App from "./App"
import ReactDOM from "react-dom/client"
// importamos Browser router para que funcionen las rutas
import { BrowserRouter } from "react-router-dom"
// importamos QueryClient y QueryClientProvider para que funcione react-query
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  // el querryclientprvider nos va a permitir usar useQuery y useMutation
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)