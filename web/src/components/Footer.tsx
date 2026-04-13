export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__text">
          Feito com 💙 por <strong>Peu</strong> &amp; <strong>Neto</strong>
        </span>
        <span className="footer__divider">·</span>
        <span className="footer__text">
          Imagens via{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            PokéAPI
          </a>
        </span>
      </div>
    </footer>
  );
}
