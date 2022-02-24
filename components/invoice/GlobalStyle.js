import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table tr td {
    padding: 0;
  }

  @media print {
    .hidden-print {
      display: none !important;
    }

    .print-branding span {
      display: block !important;
    }

    a[href]:after { content: none !important; }
    img[src]:after { content: none !important; }

    @page {
      margin: 3mm;
    }

    // @page:first {
    //   margin-top: 5mm;
    // }

    html,
    body {
      width: 100%;
      zoom: 100%;
      margin: 0;
      color: #000 !important;
      font-size: 9pt;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    thead {
      display: table-row-group;
    }

    tr {
      page-break-inside: avoid;
    }

    table td {
      word-break: break-all;
    }

    table {
      page-break-inside: avoid;
      word-wrap: break-word;
    }
  }

`;

export default GlobalStyle;
