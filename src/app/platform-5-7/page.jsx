import { redirect } from "next/navigation";
import themes from "@/data/platform-5-7.json";

export default function Home() {
  const first = themes[0]?.key || "fractions";
  redirect(`/platform-5-7/${first}`);
}
