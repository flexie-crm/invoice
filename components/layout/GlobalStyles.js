import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        background-color: rgba(0, 0, 0, 0.1);
        -webkit-border-radius: 2px;
    }
    ::-webkit-scrollbar:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:vertical {
        background: rgba(0,0,0,0.4);
        -webkit-border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:vertical:active {
        background: rgba(0,0,0,0.5);
        -webkit-border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:horizontal {
        background: rgba(0,0,0,0.4);
        -webkit-border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:horizontal:active {
        background: rgba(0,0,0,0.5);
        -webkit-border-radius: 2px;
    }

    @media print {
      .hidden-print {
        display: none !important;
      }
      
      @page {
        margin-top: 20px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
      }

      @page :first {
        margin-top: 0;
      }

      @page {
        @bottom-right {
          content: "Gjeneruar nga Flexie CRM";
        }
      }

      html,
      body {
        width: 100%;
        margin: 0;
      }

      thead {
        display: table-header-group;
      }

      table {
        word-wrap: break-word;
      }

      table td {
        word-break: break-all;
      }
    }

    body {
        background: ${(props) => props.theme.color.body.bg};
        font-family: 'Spartan', sans-serif;
        transition: background .05s;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
    }

    .flex {
      display: flex;
    }

    @media only screen (max-width: 767px) {
      .hidden-xs {
        display: none !important;
      }
    }

    @media only screen (min-width: 768px) and (max-width: 991px) {
      .hidden-sm {
        display: none !important;
      }
    }

    @media only screen (min-width: 992px) and (max-width: 1199px) {
      .hidden-md {
        display: none !important;
      }
    }

    @media only screen (min-width: 1200px) {
      .hidden-lg {
        display: none !important;
      }
    }

    .hidden {
      display: none !important;
    }

    .p-absolute {
        position: absolute;
    }

    .p-relative {
        position: relative;
    }

    .p-static {
        position: static;
    }

    .col {
        margin-bottom: 16px;
    }

    .p-0 {
        padding: 0px;
    }

    .p-3 {
        padding: 3px;
    }

    .p-5 {
    padding: 5px;
    }

    .p-10 {
    padding: 10px;
    }

    .p-15 {
    padding: 15px;
    }

    .p-20 {
    padding: 20px;
    }

    .p-25 {
    padding: 25px;
    }

    .p-30 {
    padding: 30px;
    }

    .p-35 {
    padding: 35px;
    }

    .p-40 {
    padding: 40px;
    }

    .p-45 {
    padding: 45px;
    }

    .p-50 {
    padding: 50px;
    }

    .pt-0 {
    padding-top: 0px;
    }

    .pt-3 {
    padding-top: 3px;
    }

    .pt-5 {
    padding-top: 5px;
    }

    .pt-10 {
    padding-top: 10px;
    }

    .pt-15 {
    padding-top: 15px;
    }

    .pt-20 {
    padding-top: 20px;
    }

    .pt-25 {
    padding-top: 25px;
    }

    .pt-30 {
    padding-top: 30px;
    }

    .pt-35 {
    padding-top: 35px;
    }

    .pt-40 {
    padding-top: 40px;
    }

    .pt-45 {
    padding-top: 45px;
    }

    .pt-50 {
    padding-top: 50px;
    }

    .pr-0 {
    padding-right: 0px;
    }

    .pr-3 {
    padding-right: 3px;
    }

    .pr-5 {
    padding-right: 5px;
    }

    .pr-10 {
    padding-right: 10px;
    }

    .pr-15 {
    padding-right: 15px;
    }

    .pr-20 {
    padding-right: 20px;
    }

    .pr-25 {
    padding-right: 25px;
    }

    .pr-30 {
    padding-right: 30px;
    }

    .pr-35 {
    padding-right: 35px;
    }

    .pr-40 {
    padding-right: 40px;
    }

    .pr-45 {
    padding-right: 45px;
    }

    .pr-50 {
    padding-right: 50px;
    }

    .pb-0 {
    padding-bottom: 0px;
    }

    .pb-3 {
    padding-bottom: 3px;
    }

    .pb-5 {
    padding-bottom: 5px;
    }

    .pb-10 {
    padding-bottom: 10px;
    }

    .pb-15 {
    padding-bottom: 15px;
    }

    .pb-20 {
    padding-bottom: 20px;
    }

    .pb-25 {
    padding-bottom: 25px;
    }

    .pb-30 {
    padding-bottom: 30px;
    }

    .pb-35 {
    padding-bottom: 35px;
    }

    .pb-40 {
    padding-bottom: 40px;
    }

    .pb-45 {
    padding-bottom: 45px;
    }

    .pb-50 {
    padding-bottom: 50px;
    }

    .pl-0 {
    padding-left: 0px;
    }

    .pl-3 {
    padding-left: 3px;
    }

    .pl-5 {
    padding-left: 5px;
    }

    .pl-10 {
    padding-left: 10px;
    }

    .pl-15 {
    padding-left: 15px;
    }

    .pl-20 {
    padding-left: 20px;
    }

    .pl-25 {
    padding-left: 25px;
    }

    .pl-30 {
    padding-left: 30px;
    }

    .pl-35 {
    padding-left: 35px;
    }

    .pl-40 {
    padding-left: 40px;
    }

    .pl-45 {
    padding-left: 45px;
    }

    .pl-50 {
    padding-left: 50px;
    }

    .m-0 {
    margin: 0px;
    }

    .m-3 {
    margin: 3px;
    }

    .m-5 {
    margin: 5px;
    }

    .m-10 {
    margin: 10px;
    }

    .m-15 {
    margin: 15px;
    }

    .m-20 {
    margin: 20px;
    }

    .m-25 {
    margin: 25px;
    }

    .m-30 {
    margin: 30px;
    }

    .m-35 {
    margin: 35px;
    }

    .m-40 {
    margin: 40px;
    }

    .m-45 {
    margin: 45px;
    }

    .m-50 {
    margin: 50px;
    }

    .mt-0 {
    margin-top: 0px;
    }

    .mt-3 {
    margin-top: 3px;
    }

    .mt-5 {
    margin-top: 5px;
    }

    .mt-10 {
    margin-top: 10px;
    }

    .mt-15 {
    margin-top: 15px;
    }

    .mt-20 {
    margin-top: 20px;
    }

    .mt-25 {
    margin-top: 25px;
    }

    .mt-30 {
    margin-top: 30px;
    }

    .mt-35 {
    margin-top: 35px;
    }

    .mt-40 {
    margin-top: 40px;
    }

    .mt-45 {
    margin-top: 45px;
    }

    .mt-50 {
    margin-top: 50px;
    }

    .mr-0 {
    margin-right: 0px;
    }

    .mr-3 {
    margin-right: 3px;
    }

    .mr-5 {
    margin-right: 5px;
    }

    .mr-10 {
    margin-right: 10px;
    }

    .mr-15 {
    margin-right: 15px;
    }

    .mr-20 {
    margin-right: 20px;
    }

    .mr-25 {
    margin-right: 25px;
    }

    .mr-30 {
    margin-right: 30px;
    }

    .mr-35 {
    margin-right: 35px;
    }

    .mr-40 {
    margin-right: 40px;
    }

    .mr-45 {
    margin-right: 45px;
    }

    .mr-50 {
    margin-right: 50px;
    }

    .mb-0 {
    margin-bottom: 0px;
    }

    .mb-3 {
    margin-bottom: 3px;
    }

    .mb-5 {
    margin-bottom: 5px;
    }

    .mb-10 {
    margin-bottom: 10px;
    }

    .mb-15 {
    margin-bottom: 15px;
    }

    .mb-20 {
    margin-bottom: 20px;
    }

    .mb-25 {
    margin-bottom: 25px;
    }

    .mb-30 {
    margin-bottom: 30px;
    }

    .mb-35 {
    margin-bottom: 35px;
    }

    .mb-40 {
    margin-bottom: 40px;
    }

    .mb-45 {
    margin-bottom: 45px;
    }

    .mb-50 {
    margin-bottom: 50px;
    }

    .ml-0 {
    margin-left: 0px;
    }

    .ml-3 {
    margin-left: 3px;
    }

    .ml-5 {
    margin-left: 5px;
    }

    .ml-10 {
    margin-left: 10px;
    }

    .ml-15 {
    margin-left: 15px;
    }

    .ml-20 {
    margin-left: 20px;
    }

    .ml-25 {
    margin-left: 25px;
    }

    .ml-30 {
    margin-left: 30px;
    }

    .ml-35 {
    margin-left: 35px;
    }

    .ml-40 {
    margin-left: 40px;
    }

    .ml-45 {
    margin-left: 45px;
    }

    .ml-50 {
    margin-left: 50px;
    }

    .grid {
  box-sizing: border-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  -webkit-box-flex: 0;
  flex: 0 1 auto;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0 -8px 0 -8px;
}
.grid.grid-nogutter {
  margin: 0;
}
.grid.grid-nogutter > .col {
  padding: 0;
}
.col {
  box-sizing: border-box;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -ms-flex-preferred-size: 0;
  -webkit-flex-basis: 0;
  flex-basis: 0;
  max-width: 100%;
  min-width: 0;
  padding: 0 8px 0 8px;
}
.col-align-top {
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
}
.col-align-bottom {
  align-self: flex-end;
}
.col-align-middle {
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
}
.col-top {
  justify-content: flex-start !important;
  flex-direction: column;
  display: flex;
}
.col-bottom {
  justify-content: flex-end !important;
  flex-direction: column;
  display: flex;
}
.col-middle {
  justify-content: center;
  flex-direction: column;
  display: flex;
}
.grid-start {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.grid-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.grid-end {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.grid-around {
  justify-content: space-around;
}
.grid-between {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.col-first {
  -webkit-box-ordinal-group: 0;
  -ms-flex-order: -1;
  order: -1;
}
.col-last {
  -webkit-box-ordinal-group: 2;
  -ms-flex-order: 1;
  order: 1;
}
.grid-reverse {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}
.col-fixed {
  flex: initial;
}
.col-grow-2 {
  flex-grow: 2;
}
.col-grow-3 {
  flex-grow: 3;
}
.col-grow-4 {
  flex-grow: 4;
}
.col-grow-5 {
  flex-grow: 5;
}
.col-grow-6 {
  flex-grow: 6;
}
.col-grow-7 {
  flex-grow: 7;
}
.col-grow-8 {
  flex-grow: 8;
}
.col-grow-9 {
  flex-grow: 9;
}
.col-grow-10 {
  flex-grow: 10;
}
.col-grow-11 {
  flex-grow: 11;
}
.col-1 {
  -ms-flex-preferred-size: 8.33333%;
  -webkit-flex-basis: 8.33333%;
  flex-basis: 8.33333%;
  max-width: 8.33333%;
}
.col-2 {
  -ms-flex-preferred-size: 16.66667%;
  -webkit-flex-basis: 16.66667%;
  flex-basis: 16.66667%;
  max-width: 16.66667%;
}
.col-3 {
  -ms-flex-preferred-size: 25%;
  -webkit-flex-basis: 25%;
  flex-basis: 25%;
  max-width: 25%;
}
.col-4 {
  -ms-flex-preferred-size: 33.33333%;
  -webkit-flex-basis: 33.33333%;
  flex-basis: 33.33333%;
  max-width: 33.33333%;
}
.col-5 {
  -ms-flex-preferred-size: 41.66667%;
  -webkit-flex-basis: 41.66667%;
  flex-basis: 41.66667%;
  max-width: 41.66667%;
}
.col-6 {
  -ms-flex-preferred-size: 50%;
  -webkit-flex-basis: 50%;
  flex-basis: 50%;
  max-width: 50%;
}
.col-7 {
  -ms-flex-preferred-size: 58.33333%;
  -webkit-flex-basis: 58.33333%;
  flex-basis: 58.33333%;
  max-width: 58.33333%;
}
.col-8 {
  -ms-flex-preferred-size: 66.66667%;
  -webkit-flex-basis: 66.66667%;
  flex-basis: 66.66667%;
  max-width: 66.66667%;
}
.col-9 {
  -ms-flex-preferred-size: 75%;
  -webkit-flex-basis: 75%;
  flex-basis: 75%;
  max-width: 75%;
}
.col-10 {
  -ms-flex-preferred-size: 83.33333%;
  -webkit-flex-basis: 83.33333%;
  flex-basis: 83.33333%;
  max-width: 83.33333%;
}
.col-11 {
  -ms-flex-preferred-size: 91.66667%;
  -webkit-flex-basis: 91.66667%;
  flex-basis: 91.66667%;
  max-width: 91.66667%;
}
.col-12 {
  -ms-flex-preferred-size: 100%;
  -webkit-flex-basis: 100%;
  flex-basis: 100%;
  max-width: 100%;
}
@media only screen and (max-width: 480px) {
  .col-sm {
    flex: 100%;
    max-width: 100%;
  }
}
@media only screen and (max-width: 624px) {
  .col-md {
    flex: 100%;
    max-width: 100%;
  }
}
@media only screen and (max-width: 744px) {
  .col-lg {
    flex: 100%;
    max-width: 100%;
  }
}

`;

export default GlobalStyles;
