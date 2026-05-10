import React, {useRef, useEffect}from 'react'
import mermaid from 'mermaid'


mermaid.initialize({
  startOnLoad : false , //avoid self analyse at start
  theme : "default"  
})

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim()

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};


function MermaidSetup({diagram}) {
  const containerRef = useRef(null)

  useEffect(() => {
  // run effect when 'diagram' changes
  if (!diagram || !containerRef.current) return; // exit if no diagram or container

  const renderDiagram = async () => {
    try {
      containerRef.current.innerHTML = ""; // clear old diagram

      // generate unique ID for each diagram
      const uniqueId = `mermaid-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      // sanitize diagram text before rendering
      const safeChart = cleanMermaidChart(diagram);

      // render mermaid chart into SVG
      const { svg } = await mermaid.render(uniqueId, safeChart);

      containerRef.current.innerHTML = svg; // insert SVG into container
    } catch (error) {
      console.error("Mermaid render failed:", error); // log errors
    }
  };

  renderDiagram(); // call the async function
}, [diagram]); // dependency: runs when 'diagram' changes




  return (
    <div className='bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-x-auto'>
        <div  ref={containerRef}/>
    </div>
  )
}

export default MermaidSetup