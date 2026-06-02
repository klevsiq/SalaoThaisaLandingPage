import { useInView } from '@/hooks/useInView'
import { img } from '@/lib/utils'

export default function Products() {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>()
  const { ref: b1Ref, inView: b1In } = useInView<HTMLDivElement>()
  const { ref: b2Ref, inView: b2In } = useInView<HTMLDivElement>()
  const { ref: b3Ref, inView: b3In } = useInView<HTMLDivElement>()

  return (
    <section className="produtos" id="produtos">
      <div
        className={`produtos-head reveal${headIn ? ' on' : ''}`}
        ref={headRef}
      >
        <div>
          <div className="eyebrow"><span>Produtos</span></div>
          <h2 className="sh">Marcas que<br /><em>fazem a diferença</em></h2>
        </div>
        <p className="produtos-desc">
          Trabalhamos apenas com produtos profissionais de alta performance,
          cuidadosamente selecionados para respeitar a saúde dos seus fios
          e prolongar o resultado de cada serviço.
        </p>
      </div>

      <div className="brand-logos">
        <div className={`brand-circle reveal${b1In ? ' on' : ''}`} ref={b1Ref}>
          <img src={img('logos/logo-mirra.png')} alt="Mirra Professional" width={160} height={60} loading="lazy" />
        </div>
        <div className={`brand-circle reveal d2${b2In ? ' on' : ''}`} ref={b2Ref}>
          <img src={img('logos/logo-wella.png')} alt="Wella" width={160} height={60} loading="lazy" />
        </div>
        <div className={`brand-circle reveal d3${b3In ? ' on' : ''}`} ref={b3Ref}>
          <img src={img('logos/logo-truss.png')} alt="Truss Professional" width={160} height={60} loading="lazy" />
        </div>
      </div>
    </section>
  )
}
