import { useEffect, useState } from 'react'
import img1 from '../assets/pan.jpg'
import img2 from '../assets/macarons.jpg'
import img3 from '../assets/chocolate.jpg'
import Navbar from './Navbar'

const slides = [
  { img: img1, titulo: 'Pan de Luna', subtitulo: 'Amapola' },
  { img: img2, titulo: 'Pan de levadura', subtitulo: 'Blanco' },
  { img: img3, titulo: 'Pan de Eritrea', subtitulo: 'Negro' },
]

const Hero = () => {
  const [indice, setIndice] = useState(0)
  const [animar, setAnimar] = useState(true)
  const total = slides.length

  useEffect(() => {
    const t = setInterval(() => {
      setAnimar(true)
      setIndice((i) => i + 1)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const alTerminar = () => {
    if (indice >= total) {
      setAnimar(false)
      setIndice(0)
    }
  }

  const lista = [...slides, ...slides]

  return (
    <section id="home" className="bg-black min-h-screen flex flex-col overflow-hidden">
      <Navbar oscuro />

      <div className="flex-1 flex items-center pb-16">
        <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
          <div
            className={`flex [--n:1] md:[--n:3] ${animar ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(calc(${indice} * -100% / var(--n)))` }}
            onTransitionEnd={alTerminar}
          >
            {lista.map((slide, i) => (
              <div key={i} className="w-full md:w-1/3 shrink-0 px-4 text-center">
                <img
                  src={slide.img}
                  alt={slide.titulo}
                  className="mx-auto h-[300px] w-full object-contain"
                />
                <h3 className="mt-6 font-serif text-3xl font-bold text-white">{slide.titulo}</h3>
                <p className="mt-3 text-base font-light text-white">{slide.subtitulo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero