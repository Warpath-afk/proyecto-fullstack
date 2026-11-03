const Footer = () => {
  return (
    <footer className="text-gray-300">
      <div className="bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="font-serif italic text-4xl text-white">Dulce Aroma</span>
            <p className="mt-6 text-sm leading-7">
              Dejando más que un sabor en tu paladar. Preparamos cada día tortas, panes y postres con ingredientes frescos y mucho cariño.
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm">
              <span>Síguenos:</span>
              <a href="#" aria-label="Facebook" className="hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-lg text-white">Horario</h4>
            <p className="mt-6 text-sm leading-7">Lun - Sáb: 8:00 am - 8:00 pm</p>
            <p className="text-sm leading-7">Domingo: 9:00 am - 2:00 pm</p>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-lg text-white">Únete al club</h4>

            <div className="mt-6 flex">
              <input
                type="email"
                placeholder="Dirección de correo electrónico"
                className="flex-1 min-w-0 bg-white px-5 py-3 text-sm text-neutral-800 placeholder:text-gray-400 outline-none"
              />
              <button className="bg-[#dfbc5e] px-6 text-xs font-semibold uppercase tracking-widest text-white hover:brightness-95 transition">
                Unirse
              </button>
            </div>

            <p className="mt-6 text-xs leading-6">
              Quiero suscribirme para recibir correos electrónicos sobre nuevos productos y ofertas especiales.
            </p>

            <div className="mt-6 border-t border-neutral-600 pt-4 text-xs">
              Contáctanos:
              <span className="ml-2 text-base text-[#dfbc5e]">+51 999 999 999</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 py-6 text-center text-xs text-gray-500">
        © 2026 Dulce Aroma. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer