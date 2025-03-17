import BackButton from "../BackButton";
import Footer from "../Footer";
import HomeButton from "../HomeButton";
import Logo from "../Logo";

function NotFoundPage() {
  return (
    <div className="relative bg-black min-h-dvh flex flex-col items-center justify-center">
      <div className="bg-center aspect-[1.78] absolute max-w-4xl w-full h-full bg-no-repeat bg-contain bg- bg-[url(./assets/not-found.jpg)] bg-black rounded-full inset-shadow-[32px_0px_64px_2px_#000000]" />
      <BackButton />
      <HomeButton />
      <header className="z-10 mt-16 mb-8">
        <Logo />
      </header>
      <main className="z-10 flex-1 flex flex-col items-center justify-center text-white drop-shadow-[0_1.2px_1.2px_#000000] mb-16">
        <h1 className="text-6xl font-bold tracking-wider">404</h1>
        <h3 className="text-xl font-bold tracking-wider">NOT FOUND</h3>
      </main>
      <Footer />
    </div>
  );
}
export default NotFoundPage;
