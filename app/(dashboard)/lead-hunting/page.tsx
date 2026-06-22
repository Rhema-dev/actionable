import { Topbar } from "@/components/layout/topbar";
import { LeadHuntingClient } from "./lead-hunting-client";

export default function LeadHuntingPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Lead Hunting" />
      <LeadHuntingClient />
    </div>
  );
}
