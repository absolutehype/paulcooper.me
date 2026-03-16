import Image from "next/image";
import * as motion from "motion/react-client";
import avatarImage from "../../../public/images/avatar.jpeg";
import { getTranslations, getLocale } from "next-intl/server";
import { CareerTimeline } from "@/components/CareerTimeline";
import { getExperience } from "@/lib/experience";
import { LogoCarousel } from "@/components/LogoCarousel";
import { LocaleLink } from "@/components/LocaleSwitcher";

export default async function Home() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const experience = getExperience(locale);

  return (
    <main className="flex flex-col text-md md:text-lg items-center">
      <header
        className="masthead text-white flex flex-col items-center w-full"
        style={{
          backgroundImage: `url("/images/header.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.3 }}
          className="container max-w-[960px] flex flex-col md:flex-row text-center md:text-left gap-6 md:gap-10 lg:gap-16 items-center p-10 pb-20 md:p-20 md:pb-30 lg:py-40 lg:pb:50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.3 }}
          >
            <Image
              src={avatarImage}
              alt="Paul Cooper Avatar"
              className="rounded-full max-w-[20vw] md:max-w-[16vw] lg:max-w-[12vw] 2xl:max-w-[10vw] transition"
              sizes="(max-width: 768px) 64px,
              (max-width: 1200px) 16vw,
              12vw"
              priority
            />
          </motion.div>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl md:text-3xl lg:text-4xl m-0">
              Paul Cooper
            </h1>
            <p>
              {t.rich("HOME.SUMMARY", {
                location: (chunks) => (
                  <a
                    href="https://en.wikipedia.org/wiki/London"
                    className="border-b"
                    title={String(chunks)}
                  >
                    {chunks}
                  </a>
                ),
                company: (chunks) => (
                  <a
                    href="https://www.humanmademachine.com/"
                    className="border-b"
                    title={String(chunks)}
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <nav className="flex gap-6 mt-6">
              <a
                href="https://www.instagram.com/absolutehype/"
                title="Instagram"
              >
                <Image
                  src="/images/instagram.svg"
                  alt="Instagram"
                  width={25}
                  height={25}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/absolutehype/"
                title="LinkedIn"
              >
                <Image
                  src="/images/linkedin.svg"
                  alt="LinkedIn"
                  width={25}
                  height={25}
                />
              </a>
            </nav>
          </div>
        </motion.section>
      </header>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="container flex flex-col max-w-[960px] p-10 md:p-20 lg:py-30 text-center md:text-left gap-10 md:gap-20 lg:gap-30"
      >
        <p>{t("HOME.BODY")}</p>
        <LogoCarousel />
      </motion.section>
      <CareerTimeline entries={experience} heading={t("EXPERIENCE.HEADING")} />

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="container text-md max-w-[960px] p-10 md:p-20 lg:py-30 text-center border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] transition"
      >
        <ul className="flex items-center justify-center gap-10">
          <li>
            <LocaleLink locale="en">English</LocaleLink>
          </li>
          <li>
            <LocaleLink locale="fr">Français</LocaleLink>
          </li>
          <li>
            <LocaleLink locale="es">Español</LocaleLink>
          </li>
        </ul>
      </motion.footer>
    </main>
  );
}
