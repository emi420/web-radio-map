import { Outlet } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import NavHeader from './NavHeader';
import "./MainView.style.css";

const MainView = () => {
  return (
    <div>
        <NavHeader />
        <div className={"mainViewContent"}>
          <ErrorBoundary>
              <Outlet />
              <div className="trackingBanner">
              </div>
          </ErrorBoundary>
        </div>
    </div>
  );
};

export default MainView;

