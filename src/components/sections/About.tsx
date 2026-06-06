import { useInView } from '@/hooks/useInView'
import { img } from '@/lib/utils'

export default function About() {
  const { ref: headerRef, inView: headerIn } = useInView<HTMLDivElement>()
  const { ref: imgsRef, inView: imgsIn } = useInView<HTMLDivElement>()
  const { ref: textRef, inView: textIn } = useInView<HTMLDivElement>()

  return (
    <section className="about" id="sobre">
      <div
        className={`about-header reveal${headerIn ? ' on' : ''}`}
        ref={headerRef}
      >
        <div className="eyebrow about-eyebrow"><span>Sobre o Estúdio</span></div>
        <h2 className="sh">Um espaço criado<br /><em>para ser você</em></h2>
      </div>

      <div className="about-grid">
        <div
          className={`about-imgs reveal${imgsIn ? ' on' : ''}`}
          ref={imgsRef}
        >
          <div className="a-main">
            <img
              src={img('gallery/image_21.webp')}
              alt="Interior do Tha Carolina Hair Studio — vista ampla do salão"
              width={1600}
              height={1170}
              loading="lazy"
            />
          </div>
          <div className="a-accent">
            <img
              src={img('gallery/image_23.webp')}
              alt="Ambiente do studio — área de atendimento com parede verde e cadeiras"
              width={1600}
              height={1200}
              loading="lazy"
            />
          </div>
        </div>

        <div
          className={`about-text-panel reveal d2${textIn ? ' on' : ''}`}
          ref={textRef}
        >
          <p className="sp" style={{ marginTop: 0 }}>
            Cada atendimento é pensado para que você se sinta acolhida em um espaço aconchegante,
            onde cada detalhe foi preparado para proporcionar conforto, bem-estar e uma experiência
            verdadeiramente especial.
          </p>
          <p className="sp" style={{ marginTop: '14px' }}>
            Oferecemos um atendimento totalmente personalizado, porque sabemos que cada cliente é única.
          </p>
          <ul className="about-list">
            <li className="about-item">
              <div className="ai-num">01</div>
              <div>
                <div className="ai-title">Diagnóstico antes de tudo</div>
                <p className="ai-text">
                  Cada atendimento começa entendendo o histórico, o desejo e a saúde do seu cabelo.
                  Sem achismo, sem risco.
                </p>
              </div>
            </li>
            <li className="about-item">
              <div className="ai-num">02</div>
              <div>
                <div className="ai-title">Resultado que dura</div>
                <p className="ai-text">
                  Produtos de alta performance selecionados para proteger seus fios e prolongar a
                  beleza muito além do salão.
                </p>
              </div>
            </li>
            <li className="about-item">
              <div className="ai-num">03</div>
              <div>
                <div className="ai-title">Exclusividade total</div>
                <p className="ai-text">
                  Atendimento com hora marcada, espaço reservado e atenção 100% voltada para você.
                  Porque você merece.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
