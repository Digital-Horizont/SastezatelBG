import { redirect } from "next/navigation";
import themes from "@/data/platform-3-4.json";

export default function Home() {
  const first = themes[0]?.key || "fractions";
  redirect(`/platform-3-4/${first}`);
}
