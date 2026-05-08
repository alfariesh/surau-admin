import {redirect} from "next/navigation";

export default function LegacyTrackerPage() {
  redirect("/admin/tracker");
}
