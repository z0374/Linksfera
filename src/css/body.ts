import { styleVar } from "waranas";

export function bodyStyle(): string {
  return `
  * {
    box-sizing: border-box;
  }
  html {
    display: flex;
    justify-content: center;
    background-color: #FFF;
  }
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--colorMainP);
  }
    @media screen and (min-width: 1200px) {
      @media (orientation: landscape) {
	body {
width: 30vw;
}
}
}
  `;
}
