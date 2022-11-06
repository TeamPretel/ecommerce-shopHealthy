import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import RouterDashBoard from './routes';


export const DashBoardApp = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <RouterDashBoard />
    </ThemeProvider>
    </HelmetProvider>
  )
}
