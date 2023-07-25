import { useState } from "react";
import Roi from "./pages/Roi";

function App() {
  const [showCalculator, setShowCalculator] = useState(false)
  return (
    <div className="bg-slate-100 flex justify-center items-center w-[100vw] h-[100vh]">
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={()=>setShowCalculator(true)}>View Roi Calculator</button>
      {showCalculator&& <Roi setShowCalculator={setShowCalculator}/>}
    </div>
  );
}

export default App;
