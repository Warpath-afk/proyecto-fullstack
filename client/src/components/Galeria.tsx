import chef from '../assets/chef.jpg'
import firma from '../assets/firma.png'

const Galeria = () => {
  return (
    <section id="nosotros" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
            Nuestro chef d'oeuvre... ¡delicioso!
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Cada mañana, nuestro maestro pastelero prepara a mano tortas, macarons y panes con ingredientes frescos y mucho cariño.
          </p>

          <p className="mt-8 text-sm leading-7 text-gray-500">
            En Dulce Aroma creemos que un buen postre se hace con tiempo, paciencia y buenos ingredientes. Por eso cuidamos cada detalle, desde la masa hasta la decoración final, para dejar más que un sabor en tu paladar.
          </p>

          <img src={firma} alt="Firma del chef" className="mt-10 h-20 w-auto" />
        </div>

        <img
          src={chef}
          alt="Chef de Dulce Aroma"
          className="mx-auto w-full max-w-[480px] aspect-square rounded-full object-cover"
        />
      </div>
    </section>
  )
}

export default Galeria