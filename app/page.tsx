"use client";

import { useEffect, useRef, useState } from "react";

type GalleryImage = {
  src: string;
  label: string;
};

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", moveCursor);
    animateRing();

    // Reveal on scroll
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));

    fetch("/api/images")
      .then((res) => res.ok ? res.json() : [])
      .then((data: GalleryImage[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryImages(data);
        } else {
          setGalleryImages([
            { src: "/gallery/placeholder.svg", label: "Foto pendiente" },
          ]);
        }
      })
      .catch(() => {
        setGalleryImages([
          { src: "/gallery/placeholder.svg", label: "Foto pendiente" },
        ]);
      });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);
 

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">New Look Furniture</div>
        <ul className="nav-links">
          {["legacy", "services", "gallery", "clients", "contact"].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}>
                {{ legacy: "Legado", services: "Servicios", gallery: "Galería", clients: "Clientes", contact: "Contacto" }[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Enrique Esteban · Artesano Bonafide Certificado · Puerto Rico</div>
          <h1 className="hero-title">El Arte de<br /><em>Restaurar</em></h1>
          <div className="hero-subtitle">New Look Furniture</div>
          <p className="hero-desc">
            Preservamos la memoria de sus piezas más valiosas con la precisión y el
            rigor que solo un maestro artesano con más de dos décadas de experiencia puede ofrecer.
          </p>
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Más de 20 años de Excelencia Artesanal</span>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-line" />
            <span className="scroll-text">Descubrir</span>
          </div>
        </div>
        <div className="hero-right">
          <div className="wood-texture" />
          <div className="hero-ornament">
            <div className="ornament-ring">
              <span className="ornament-year">Desde · 2002</span>
              <div className="ornament-inner">NL<small>Furniture</small></div>
            </div>
          </div>
          <div className="hero-year-strip">
            <p>Est.</p>
            <strong>2002</strong>
          </div>
        </div>
      </section>

      {/* LEGACY */}
      <section id="legacy">
        <div className="legacy-accent" />
        <div className="legacy-content">
          <div className="legacy-left">
            <div className="section-label reveal">Nuestro Legado</div>
            <h2 className="legacy-heading reveal reveal-delay-1">
              Maestría que<br /><em>trasciende</em><br />generaciones
            </h2>
            <p className="legacy-text reveal reveal-delay-2">
              Desde el año 2002, <strong>Enrique Esteban</strong> se dedica a la preservación y restauración de piezas
              de alto valor histórico y sentimental en Puerto Rico. Como Artesano Bonafide
              certificado (#7223), ha trabajado para museos, colecciones de arte y residencias exclusivas,
              devolviendo la vida a cada antigüedad con el rigor que solo un maestro artesano puede ofrecer.
            </p>
            <div className="legacy-stats reveal reveal-delay-3">
              {[["20+", "Años de Experiencia"], ["500+", "Piezas Restauradas"], ["3", "Museos Atendidos"], ["1", "Artesano Certificado"]].map(([num, label]) => (
                <div className="stat-item" key={label}>
                  <div className="stat-number">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="legacy-right">
            <div className="legacy-pattern" />
            <div className="legacy-visual">
              <div className="legacy-monogram">NLF</div>
              <div className="cert-badge">
                <span className="cb-seal">✦</span>
                <span className="cb-num">#7223</span>
                <span className="cb-title">Certificado Artesanal</span>
                <span className="cb-main">Restauración de<br />Antigüedades</span>
                <span className="cb-dept">Depto. de Desarrollo<br />Económico y Comercio</span>
                <span className="cb-sub">Programa de Desarrollo Artesanal · PR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <div className="gallery-header">
          <div className="section-label reveal" style={{ justifyContent: "center" }}>— Nuestro Trabajo —</div>
          <h2 className="reveal reveal-delay-1">Arte que <em>habla</em><br />por sí mismo</h2>
          <div className="divider-ornament reveal reveal-delay-2">
            <span /><i>✦</i><span />
          </div>
          <p className="gallery-subtitle reveal reveal-delay-3">
            Cada pieza restaurada guarda una historia. Aquí, algunas de las transformaciones que hemos tenido el privilegio de realizar.
          </p>
        </div>
        <div className="masonry-grid">
          {galleryImages.map((item, i) => {
            const heights = ["tall", "short", "medium"];
            const h = heights[i % heights.length];
            return (
            <div className={`masonry-item masonry-${h}`} key={item.src}>
              <img
                className="masonry-image"
                src={item.src}
                alt={`${item.label} restaurado por New Look Furniture`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/gallery/placeholder.svg";
                }}
              />
              <div className="masonry-overlay">
                <span className="masonry-cat">Restauracion</span>
                <div className="masonry-label">{item.label}</div>
                <span className="masonry-year">New Look Furniture</span>
              </div>
            </div>
          )})}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="services-header">
          <div className="section-label reveal" style={{ justifyContent: "center" }}>Nuestras Especialidades</div>
          <h2 className="reveal reveal-delay-1">Arte &amp; <em>Técnica</em> al Servicio<br />de sus Piezas</h2>
          <div className="divider-ornament reveal reveal-delay-2">
            <span /><i>✦</i><span />
          </div>
        </div>
        <div className="services-grid">
          {[
            { icon: "🪵", title: "Ebanistería Fina", desc: "Restauración y trabajo profesional en madera con técnicas tradicionales y materiales de primera calidad.", tag: "Madera · Restauración", n: "01" },
            { icon: "🪑", title: "Rejilla & Rattan", desc: "Expertos en materiales tradicionales como la rejilla (pajilla) y el rattan, tejidos con maestría artesanal.", tag: "Materiales · Tradición", n: "02" },
            { icon: "⚙️", title: "Metales & Estructuras", desc: "Tratamiento y restauración especializada de elementos metálicos, preservando la integridad estructural.", tag: "Metal · Estructura", n: "03" },
            { icon: "🏛️", title: "Proyectos Arquitectónicos", desc: "Intervención técnica especializada en paredes y mobiliario fijo de alto valor histórico y patrimonial.", tag: "Arquitectura · Patrimonio", n: "04" },
          ].map((s, i) => (
            <div className={`service-card reveal reveal-delay-${i}`} key={s.n}>
              <span className="service-number">{s.n}</span>
              <span className="service-icon">{s.icon}</span>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients">
        <div className="clients-header">
          <div className="section-label reveal" style={{ justifyContent: "center" }}>— Quiénes Confían en Nosotros —</div>
          <h2 className="reveal reveal-delay-1">Guardianes del<br /><em style={{ color: "var(--gold-light)" }}>Patrimonio</em></h2>
          <p className="reveal reveal-delay-2">Trabajamos con las instituciones más prestigiosas y residencias exclusivas de Puerto Rico.</p>
        </div>
        <div className="clients-grid">
          {[["🏛️", "Museos", "Colecciones de valor histórico"], ["🖼️", "Galerías de Arte", "Colecciones privadas y públicas"], ["🏠", "Residencias Exclusivas", "Hogares de alto valor patrimonial"]].map(([icon, name, type], i) => (
            <div className={`client-item reveal reveal-delay-${i}`} key={name}>
              <span className="client-icon">{icon}</span>
              <div className="client-name">{name}</div>
              <div className="client-type">{type}</div>
            </div>
          ))}
        </div>
        <div className="quote-section reveal">
          <span className="quote-mark">"</span>
          <p className="quote-text">Devolvemos la vida a sus antigüedades con el rigor y la maestría que solo un artesano certificado puede ofrecer.</p>
          <div className="quote-attr">— New Look Furniture · Puerto Rico</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div className="contact-left">
            <div className="section-label reveal">Hablemos</div>
            <h2 className="reveal reveal-delay-1">¿Tiene una pieza<br />que <em>merece</em><br />nueva vida?</h2>
            <p className="reveal reveal-delay-2">
              Cada restauración comienza con una conversación. Cuéntenos sobre su pieza y la historia que guarda — estamos a un mensaje de distancia.
            </p>
            <div className="contact-details reveal reveal-delay-3">
              {[
                ["📍", "Ubicación", "Puerto Rico"],
                ["📱", "WhatsApp", "+1 (787) 439-8998"],
                ["🏅", "Certificación #7223", "Restauración de Antigüedades · DDEC"],
              ].map(([icon, label, value]) => (
                <div className="contact-detail" key={label}>
                  <div className="cd-icon">{icon}</div>
                  <div><span className="cd-label">{label}</span><span className="cd-value">{value}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-right reveal reveal-delay-2">
            <p className="wa-prompt">
              "Escríbale directamente a <strong style={{color:"var(--gold-light)",fontStyle:"normal"}}>Enrique</strong> por WhatsApp y reciba respuesta personalizada de nuestro artesano certificado."
            </p>
            <div className="wa-ornament" />
            <a
              className="wa-btn"
              href="https://wa.me/17874398998?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20un%20trabajo%20de%20restauraci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="wa-icon">💬</span>
              <span>Escribir por WhatsApp</span>
            </a>
            <div className="wa-number">+1 (787) 439-8998</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">New Look Furniture</div>
        <div className="footer-copy">
          © 2024 New Look Furniture · Puerto Rico<br />
          <span style={{ fontSize: "0.8rem", color: "var(--smoke)" }}>Enrique Esteban · Cert. #7223 · Artesano Bonafide · DDEC · Desde 2002</span>
        </div>
        <div className="footer-tagline">El arte de restaurar<br />lo que el tiempo guarda.</div>
      </footer>
    </>
  );
}
