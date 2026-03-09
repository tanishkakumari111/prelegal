import NDAClient from "../components/NDAClient";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <NDAClient />
    </ErrorBoundary>
  );
}
