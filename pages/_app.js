import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  console.log("[v0] App component rendering");
  return <Component {...pageProps} />;
}
