export function mainStyle() {
  return `
  main{
      min-height: 45vh;
      display: flex;
      flex-wrap: wrap;
  }
  main ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    list-style: none;
    overflow: auto;
  }
  main ul, main {width: 100%;}

  main ul .mainItem {
    width: 90%;
    height: 7.2rem;
    margin: 1.5rem 0;
  }

  main .mainItem h1, .waranasSearchItems h1 {
    font-size: 1.5em;
    font-weight: bold;
    color: var(--colorMainSDark);
    text-align: center;
    }
    main .mainItem h2, .waranasSearchItems h2 {
      font-size: 0.9em;
      color: var(--colorMainDDark);
      margin: 0 4.2vw;
      font-style: italic;
      text-align: center;
    }
    main .mainItem a, .waranasSearchItems a {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--colorMainS);
      text-decoration: underline;
      font-size: 1.5em;
      text-align: center;
    }
    main .icon {
      font-size: 0.39em;
    }
  `;
}
