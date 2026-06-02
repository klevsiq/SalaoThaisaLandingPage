export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="sf-inner">
        <a
          href="https://www.instagram.com/_thaisacarolina"
          target="_blank"
          rel="noopener noreferrer"
          className="sf-ig"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          @_thaisacarolina
        </a>
        <p className="sf-copy">
          &copy; 2025 Tha Carolina Hair Studio. Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
