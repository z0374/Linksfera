export function headerStyle(): string {
  return `
    header {
      height: 21%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      background-color: #F0F0F099;
      padding-bottom: 0.3rem;
      border-bottom: solid 0.18rem #FFF;
    }
    header #logo {
      height: 75%;
      display: flex;
      align-items: center;
      filter: drop-shadow(0px 0px 3px #000000);
    }
    header #logo img{
      height: inherit;
      display: block;
    }
    header #logo svg {
      height: 100%;
    }
    header .search {
      width: 39%;
      height: 15%;
    }
  `;
}
