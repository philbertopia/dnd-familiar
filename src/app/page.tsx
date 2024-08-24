import { Chat } from "./components/chat";
import { ChatThreeFive } from "./components/chatThreeFive";
import { DiceRoller } from "./components/diceRoller";
import ExportToPDF from "./components/exportToPDF";
import { HealthTracker } from "./components/healthTracker";
import { InitiativeTracker } from "./components/initiative";
import { Inventory } from "./components/inventory";
import Navbar from "./components/navbar";
import { Notes } from "./components/notes";
import { SpellSlotTracker } from "./components/spell";

export const runtime = 'edge';

export default function Page() {
  return (
    <div className="m-3 mt-5" id="content-to-export">
      <Navbar />
      {/* <Chat /> */}
      {/* <ChatThreeFive /> */}
      <div className="flex flex-col md:flex-row w-full gap-3">
        <InitiativeTracker />
        <HealthTracker />
      </div>
      <div className="flex flex-col md:flex-row w-full gap-3 mt-3">
        <DiceRoller />
        <Inventory />
      </div>
      <SpellSlotTracker />
      <Notes />
      <ChatThreeFive />
      <ExportToPDF />
    </div>
  ); 
  
}