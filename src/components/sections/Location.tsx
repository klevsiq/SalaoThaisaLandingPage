import { useInView } from '@/hooks/useInView'

const MAPS_URL = 'https://maps.google.com/?q=R.+Cachoeira+do+Campo,+278,+Jardim+Paraguacu,+Sao+Paulo'

export default function Location() {
  const { ref, inView } = useInView()

  return (
    <section className="location" id="contato">
      <div
        className={`loc-info reveal${inView ? ' on' : ''}`}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="loc-col">
          <div className="loc-col-lbl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Endereço
          </div>
          <div className="loc-col-val">
            R. Cachoeira do Campo, 278, Sala 3<br />
            Jardim Imperador · São Paulo, SP
            <small>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                Como chegar →
              </a>
            </small>
          </div>
        </div>

        <div className="loc-col">
          <div className="loc-col-lbl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Horários
          </div>
          <div className="loc-col-val">
            Terça à Sexta: 09h às 18h<br />
            Sábado: 09h às 17h
            <small>Dom &amp; Segunda: Fechado</small>
          </div>
        </div>

        <div className="loc-col">
          <div className="loc-col-lbl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.82 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.73 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Agendamentos
          </div>
          <div className="loc-col-val">
            <a href="tel:11947195729">(11) 94719-5729</a><br />
            <small>Atendimento via WhatsApp</small>
          </div>
        </div>
      </div>

      <div className="loc-map-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8!2d-46.71!3d-23.545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57b8b3b3b3b3%3A0x0!2sR.+Cachoeira+do+Campo%2C+278+-+Jardim+Paraguacu%2C+S%C3%A3o+Paulo+-+SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tha Carolina Hair Studio"
        />
        <div className="loc-map-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Jardim Imperador · São Paulo
        </div>
      </div>
    </section>
  )
}
