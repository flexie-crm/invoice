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
      margin-top: 20px;
      margin-bottom: 10px;
      margin-left: 0;
      margin-right: 0;
    }

    @page:first {
      margin-top: 5px;
    }

    @page {
      @bottom-right {
        content: "Gjeneruar nga Flexie CRM";
      }
    }

    html,
    body {
      width: 100%;
      zoom: 98%;
      margin: 0;
    }

    thead {
      display: table-row-group;
    }
    tr {
      page-break-inside: avoid;
    }
    table {
      word-wrap: break-word;
    }
    table td {
      word-break: break-all;
    }

    table.break-here {
      page-break-inside: avoid;
    }
  }

`;

export default GlobalStyle;
