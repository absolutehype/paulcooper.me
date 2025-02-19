import Image from "next/image";
import avatarImg from "/public/images/avatar.jpeg";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col text-md md:text-lg items-center">
      <section className="container max-w-[960px] text-center p-10 md:p-20 flex flex-col text-md md:text-lg items-center justify-center h-screen before:content-['404'] before:absolute before:z-20 before:text-[min(50vw,50vh)] before:text-black dark:before:text-white before:opacity-[2%] before:font-sans before:pointer-events-none">
        <h1 className="text-3xl lg:text-4xl m-0">Page not found</h1>
        <p className="md:text-lg m-0">
          The page that you were looking for could not be found
        </p>
        <Link
          href={{
            pathname: "/",
          }}
        >
          Return to home
        </Link>
      </section>
    </main>
  );
}
