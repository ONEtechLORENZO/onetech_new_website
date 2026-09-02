import type { Metadata } from "next";
import Careers from "@/components/careers";

export const metadata: Metadata = {
  title: "Careers — One Tech",
  description: "Il lavoro migliore della tua carriera, in One Tech.",
};

export default function CareersPage() {
  return (
    <main className="flex-1">
      <Careers />
    </main>
  );
}
