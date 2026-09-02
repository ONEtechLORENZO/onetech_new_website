import Reveal from "@/components/reveal";
import { withBasePath } from "@/lib/base-path";

/*
 * AWS practice section for the APN application. Add the specific AWS
 * services in use here if pursuing higher partner tiers.
 */
export default function AwsPractice() {
  return (
    <section className="awsp">
      <Reveal>
        <h2 className="awsp__heading">Partner</h2>
      </Reveal>

      <div className="awsp__cols">
        <div className="awsp__inner">
          <Reveal className="awsp__logoSlot">
            <span className="awsp__awsLogo" role="img" aria-label="AWS">
              {/* Layer the unchanged official asset so only the wordmark is
                  reversed while the AWS smile keeps its original orange. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="awsp__awsLogoLayer awsp__awsLogoLayer--word"
                src={withBasePath("/aws.webp")}
                alt=""
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="awsp__awsLogoLayer awsp__awsLogoLayer--smile"
                src={withBasePath("/aws.webp")}
                alt=""
              />
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="awsp__title">
              Costruito su Amazon Web Services (AWS)
            </h3>
          </Reveal>
          <Reveal delay={180}>
            <p className="awsp__body">
              I prodotti One Tech, Kore, Allmessage, LUVO e Argo, sono
              sviluppati e distribuiti sull’infrastruttura cloud di AWS, che
              ne garantisce scalabilità, sicurezza e affidabilità.
            </p>
          </Reveal>
        </div>

        <div className="awsp__inner">
          <Reveal className="awsp__logoSlot" delay={80}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="awsp__logo awsp__logo--wide"
              src={withBasePath("/elevenlabs-logo.webp")}
              alt="ElevenLabs"
            />
          </Reveal>
          <Reveal delay={180}>
            <h3 className="awsp__title">Supported by ElevenLabs Grants</h3>
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
