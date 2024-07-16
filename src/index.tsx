import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import './assets/css/tailwind.output.css'
import { AuthProvider } from './context/AuthContext'
import { PersistGate } from 'redux-persist/integration/react'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
    // <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Provider>
    </PersistGate>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
