import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/AppLatout';
import AppRoutes from './components/Approutes';
import 'antd/dist/antd.css';
import 'antd/dist/antd.css';
import { CurrentUserProvider } from './context/context';
import { useEffect } from 'react';

function App() {
  return (
    <div >
    <CurrentUserProvider>
    <BrowserRouter>
      <AppLayout children={<AppRoutes/>}/>
    </BrowserRouter>
    </CurrentUserProvider>
    </div>
  );
}

export default App;
