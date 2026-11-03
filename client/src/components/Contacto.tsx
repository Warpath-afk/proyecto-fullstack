const Contacto = () => {
  return (
    <section id="contacto" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800">
            Ponte en contacto
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            ¿Quieres encargar una torta para una ocasión especial o tienes alguna consulta? Escríbenos y con gusto te ayudamos.
          </p>

          <p className="mt-8 text-sm leading-7 text-gray-500">
            Nos encuentras en Lima, con atención de lunes a sábado. Puedes visitarnos en la tienda, llamarnos o dejarnos tu pedido con anticipación para que todo salga fresco y a tu gusto.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-neutral-800 text-white uppercase tracking-widest text-sm px-8 py-4 hover:bg-black transition">
              Verificar
            </button>
            <button className="border border-gray-300 text-neutral-800 uppercase tracking-widest text-sm px-8 py-4 hover:bg-neutral-800 hover:text-white transition">
              Ver más
            </button>
          </div>
        </div>

        <iframe
          title="Ubicación Dulce Aroma"
          src="https://www.google.com/maps?q=Miraflores,+Lima,+Per%C3%BA&output=embed"
          className="w-full h-[400px] md:h-[490px] border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}

export default Contacto