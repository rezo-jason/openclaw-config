import Sidebar from "./Sidebar";
import Head from "next/head";

export default function Layout({ children, title = "Mission Control" }) {
  return (
    <>
      <Head>
        <title>{title} | Supercharged Tradies</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="ml-56 min-h-screen">{children}</main>
      </div>
    </>
  );
}
