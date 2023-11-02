import Image from 'next/image'
import avatarImg from '/public/images/avatar.jpeg';
import headerImg from '/public/images/header.jpeg';

export default function Home() {
  return (
    <main className="flex flex-col text-md md:text-lg items-center">
      <header className="masthead flex flex-col items-center w-full" style={{
        backgroundImage: `url(${ headerImg.src })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <section className='container max-w-[960px] flex flex-col md:flex-row text-center md:text-left gap-6 md:gap-10 lg:gap-16 items-center p-10 pb-20 md:p-20 md:pb-30 lg:py-40 lg:pb:50'>
          <Image
            src={avatarImg}
            alt="Paul Cooper Avatar"
            className="rounded-full max-w-[20vw] md:max-w-[16vw] lg:max-w-[12vw]"
            placeholder="blur"
            sizes="(max-width: 768px) 64px,
              (max-width: 1200px) 16vw,
              12vw"
            priority
          />
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl md:text-3xl lg:text-4xl m-0">Paul Cooper</h1>
            <p><a href="https://en.wikipedia.org/wiki/London" className="link" title="London, UK">London</a> based Front End Developer, hobbyist photographer and self-confessed tech nerd working at <a href="https://www.humanmademachine.com/" className="link">Human Made Machine</a></p>
            <nav className='flex gap-6 mt-6'>
              <a href="https://www.instagram.com/absolutehype/" title="Instagram">
                <Image src="/images/instagram.svg" alt="Instagram" width={25} height={25} />
              </a>
              <a href="https://www.linkedin.com/in/absolutehype/" title="LinkedIn">
                <Image src="/images/linkedin.svg" alt="LinkedIn" width={25} height={25} />
              </a>
            </nav>
          </div>
        </section>
      </header>

      <section className="container max-w-[960px] p-6">
        <p>In a nutshell, i’m an ambitious and passionate front end developer. I strive to produce beautiful products that inspire and delight. I have a little over a decade of industry experience in both design and development. I’ve worked with great people, at some innovative companies for some industry leading brands.</p>
      </section>
    </main>
  )
}
