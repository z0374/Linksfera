import { colorTone, styleVar } from "waranas";

export function footerStyle() {
  return `
  footer {
    width: 100%;
    min-height: 15vh;
    background-color: #0f0f0f99;
    text-align: center;
    padding: 6% 0;
  }
  footer ul {
    width: 100%;
    height: 100%;
    justify-content: center;
  }
  footer, footer ul {
    display: flex;
    flex-direction: column;
    list-style: none;
  }
  footer li {
    width: 100%;
    height: 24%;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: var(--colorFooterPL);
    margin: 0.21em 0;
  }
  footer #i01, footer #i02 {
    justify-content: end;
  }
  footer #i01 h2 {
    font-size: 0.99rem;
    color: var(--colorFooterP);
  }
  footer #i02 a {
    font-size: 0.72em;
    color: var(--colorFooterPL);
  }
  footer #i03 {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-flow: row nowrap;
    font-size: 0.72em;
    white-space: nowrap;
    color: var(--colorFooterPL);
  }
  footer a {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    color: var(--colorFooterPL);
    margin: 0 0.72rem;
    text-decoration: underline;
  }
  `;
}
