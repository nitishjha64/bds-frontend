import './assets/bootstrap.min.css'
import './assets/index.css'
import './assets/custom.css'
import './assets/main.css'
import './assets/structure.css'
import './assets/pdf.css'
import './assets/landing.css'

import App from './App'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
