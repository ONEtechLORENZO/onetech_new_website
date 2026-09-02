import Reveal from "@/components/reveal";

/*
 * AWS practice section for the APN application. Add the specific AWS
 * services in use here if pursuing higher partner tiers.
 */
export default function AwsPractice() {
  return (
    <section className="awsp">
      <div className="awsp__cols">
        <div className="awsp__inner">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="awsp__logo" src="/aws.webp" alt="AWS" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="awsp__title">
              Costruito su Amazon Web Services (AWS)
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="awsp__body">
              I prodotti One Tech, Kore, Allmessage, Acta e Argo, sono
              sviluppati e distribuiti sull’infrastruttura cloud di AWS, che
              ne garantisce scalabilità, sicurezza e affidabilità.
            </p>
          </Reveal>
        </div>

        <div className="awsp__inner">
          <Reveal delay={80}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="awsp__logo awsp__logo--wide"
              src="/elevenlabs-logo.webp"
              alt="ElevenLabs"
            />
          </Reveal>
          <Reveal delay={180}>
            <h2 className="awsp__title">Supported by ElevenLabs Grants</h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="awsp__body">
              Il nostro sito è supportato dal programma ElevenLabs Grants,
              che ci dà accesso alle tecnologie vocali AI di ElevenLabs.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
