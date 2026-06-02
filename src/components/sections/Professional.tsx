import { useInView } from '@/hooks/useInView'
import { img } from '@/lib/utils'

export default function Professional() {
  const { ref: headerRef, inView: headerIn } = useInView<HTMLDivElement>()
  const { ref: photoRef, inView: photoIn } = useInView<HTMLDivElement>()
  const { ref: contentRef, inView: contentIn } = useInView<HTMLDivElement>()

  return (
    <section className="profissional" id="profissional">
      <div
        className={`prof-header reveal${headerIn ? ' on' : ''}`}
        ref={headerRef}
      >
        <div className="eyebrow about-eyebrow"><span>A Profissional</span></div>
        <h2 className="sh">Thaisa Carolina,<br /><em>especialista em cabelos</em></h2>
      </div>

      <div className="prof-grid">
        <div
          className={`prof-photo reveal${photoIn ? ' on' : ''}`}
          ref={photoRef}
        >
          <div className="prof-photo-main">
            <img
              src={img('gallery/foto_pofission_salao_2.jpeg')}
              alt="Thaisa Carolina — cabeleireira especialista no Tha Carolina Hair Studio"
              width={940}
              height={1252}
              loading="lazy"
            />
          </div>
        </div>

        <div
          className={`prof-content reveal d2${contentIn ? ' on' : ''}`}
          ref={contentRef}
        >
          <div className="prof-body">
            <p>
              Com mais de 12 anos dedicados exclusivamente ao universo dos cabelos,
              Thaisa Carolina construiu uma trajetória marcada por formação contínua,
              técnica apurada e uma paixão genuína por transformar a autoestima das
              suas clientes.
            </p>
            <p>
              Especializada em colorimetria, mechas e tratamentos capilares,
              mantém uma rotina de atualização com formações regulares e
              acompanha as referências internacionais da área.
            </p>
            <p>
              Mais do que uma cabeleireira, ela é uma parceira de beleza. Cada
              atendimento começa com escuta genuína e termina com um resultado
              que você vai querer mostrar para o mundo.
            </p>
          </div>
          <div className="prof-stats">
            <div>
              <p className="prof-stat-n">12+</p>
              <p className="prof-stat-l">Anos de<br />experiência</p>
            </div>
            <div>
              <p className="prof-stat-n">+500</p>
              <p className="prof-stat-l">Clientes<br />atendidas</p>
            </div>
            <div>
              <p className="prof-stat-n">5★</p>
              <p className="prof-stat-l">Google<br />Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
