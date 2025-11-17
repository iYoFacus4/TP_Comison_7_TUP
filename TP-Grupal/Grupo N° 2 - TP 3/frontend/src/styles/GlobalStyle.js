import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-blue: #3B82F6;
    --primary-blue-dark: #2563EB;
    --accent-orange: #F59E0B;
    --light-bg: #F3F6FD;
    --text-dark: #1F2937;
    --text-light: #6B7280;
    --border-color: #E5E7EB;
    --white: #FFFFFF;
    --sidebar-bg: #111827;
    --sidebar-text: #D1D5DB;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    color: var(--text-dark);
    background-color: var(--light-bg);
  }
`;

export default GlobalStyle;