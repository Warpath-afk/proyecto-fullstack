import pan from '../assets/pan.jpg'
import croissants from '../assets/croissants.jpg'
import macarons from '../assets/macarons.jpg'
import cupcakes from '../assets/cupcakes.jpg'

const imagenes = [
  { src: pan, alt: 'Pan artesanal' },
  { src: croissants, alt: 'Croissants' },
  { src: macarons, alt: 'Macarons' },
  { src: cupcakes, alt: 'Cupcakes' },
]

const Productos = () => {
  return (
    <section id="productos" className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Indescriptiblemente bueno
          </h2>

          <p className="mt-6 mx-auto max-w-4xl text-base leading-8 text-gray-300">
            Cada producto de Dulce Aroma se prepara a diario con ingredientes frescos y mucho cariño. Desde el pan artesanal de masa madre hasta los macarons y cupcakes decorados a mano, todo está hecho para que cada bocado se quede en tu memoria.
          </p>

          <button className="mt-10 border border-white/60 px-8 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition">
            Leer más
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {imagenes.map((img) => (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              className="w-full aspect-square object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Productos