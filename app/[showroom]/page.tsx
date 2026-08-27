
// garud-tata\app\[showroom]\page.tsx
import { notFound } from "next/navigation";
import LandingPage from "../components/LandingPage";
import { showrooms } from "../config/showrooms";

interface PageProps {
  params: Promise<{
    showroom: string;
  }>;
}

export default async function ShowroomPage({
  params,
}: PageProps) {
  const { showroom } = await params;

  const config =
    showrooms[showroom as keyof typeof showrooms];

  if (!config) {
    notFound();
  }

  return <LandingPage showroom={config} />;
}