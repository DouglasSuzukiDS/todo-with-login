import { Auth } from "@/components/auth/auth";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center p-4 md:justify-normal md:p-10 bg-zinc-950">
      <h1 className="text-4xl text-zinc-400 font-bold">TODO LIST</h1>
      <Auth />
    </main>
  );
}
