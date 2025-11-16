export default function Footer({ links }) {
  return (
    <footer id="contacto" className="container-soft py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/70">
        <p>© {new Date().getFullYear()} Avila Mateo — Portfolio</p>
        <div className="flex gap-4">
          <a className="pill" href="#estudios">Estudios</a>
          <a className="pill" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="pill" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
