import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

// All components and logic are contained within this single file.

// Reusable component for the feature circles on the landing page
const FloatingCircle = ({ icon, label, description }) => (
  <div className="flex flex-col items-center text-center p-6 border border-gray-700 rounded-2xl shadow-lg hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 transition-all duration-300 animate-pulse">
      <span className="text-3xl text-white">{icon}</span>
    </div>
    <h3 className="text-xl font-semibold text-gray-100">{label}</h3>
    <p className="mt-2 text-sm text-gray-400 max-w-xs">{description}</p>
  </div>
);

// Mocks for data from your prototype
const mockPublications = [
  {
    title: "Plant Growth under Microgravity (ISS 2014)",
    year: "2014",
    focus: "Arabidopsis growth in spaceflight",
    journal: "Astrobiology",
    authors: "NASA Ames Research Team",
    image: "https://placehold.co/400x300/6A5ACD/ffffff?text=Plant+Growth",
    summary: {
      objective: "Investigate Arabidopsis growth in microgravity.",
      methods: "Seeds germinated aboard ISS in growth chambers, 12-day experiment.",
      keyFindings: [
        "Microgravity alters cell wall development.",
        "Changes in auxin distribution.",
        "Downregulation of photosynthesis-related genes."
      ],
      implications: "Understanding plant growth in microgravity aids bio-regenerative life support systems."
    },
    didYouKnow: "Plants can grow in space, but they grow in random directions without gravity!",
  },
  {
    title: "Bone Density Loss in Astronauts",
    year: "2022",
    focus: "Study examining calcium loss and bone deterioration during extended space missions.",
    journal: "Simulation",
    authors: "NASA Research Team",
    image: "https://placehold.co/400x300/4B0082/ffffff?text=Bone+Density",
    summary: {
      objective: "Investigate the effects of microgravity on human bone density.",
      methods: "Simulated microgravity and bone scans of astronauts before and after missions.",
      keyFindings: [
        "Significant decrease in bone density, especially in weight-bearing bones.",
        "Calcium supplements and exercise only partially mitigate the effect."
      ],
      implications: "Long-term space missions require advanced countermeasures to prevent irreversible bone loss."
    },
    didYouKnow: "Muscle mass can decrease by 20% during a 5-7 day spaceflight."
  },
  {
    title: "Gene Expression Changes in Arabidopsis Exposed to Spaceflight",
    year: "2019",
    focus: "Transcriptomics of plants grown on ISS",
    journal: "Frontiers in Plant Science",
    authors: "NASA Kennedy Space Center Team",
    image: "https://placehold.co/400x300/8A2BE2/ffffff?text=Gene+Expression",
    summary: {
      objective: "Study gene expression changes in Arabidopsis thaliana under spaceflight conditions.",
      methods: "Analysis of RNA from plants grown on the ISS compared to ground controls.",
      keyFindings: [
        "Hundreds of genes showed altered expression, particularly those related to stress response and cell wall modification.",
        "The changes were not fully reversible after returning to Earth."
      ],
      implications: "Identifies key genetic pathways for engineering plants better suited for long-duration space missions."
    },
    didYouKnow: "Spaceflight can trigger unique gene expression patterns not seen on Earth."
  },
  {
    title: "Spaceflight Effects on Plant Cell Walls",
    year: "2016",
    focus: "How microgravity alters plant structure",
    journal: "Plant Physiology",
    authors: "NASA Kennedy Space Center Team",
    image: "https://placehold.co/400x300/483D8B/ffffff?text=Cell+Walls",
    summary: {
      objective: "Examine the effects of spaceflight on the structure and function of plant cell walls.",
      methods: "Microscopic analysis and biochemical assays of plants grown on the ISS.",
      keyFindings: [
        "Cell walls became thinner and less rigid.",
        "Reduced deposition of cellulose and pectin.",
        "Altered cell shape and tissue organization."
      ],
      implications: "Provides insight into how plants physically adapt to microgravity, which is crucial for future crop production in space."
    },
    didYouKnow: "Microgravity can cause a plant's roots to grow in a zig-zag pattern instead of straight down."
  }
];

// Main App component for the entire website
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPublication, setSelectedPublication] = useState(null);

  const navigateTo = useCallback((page, pub) => {
    setCurrentPage(page);
    if (pub) {
      setSelectedPublication(pub);
    } else {
      setSelectedPublication(null);
    }
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage navigateTo={navigateTo} />;
      case 'explore':
        return <ExploreMode navigateTo={navigateTo} />;
      case 'research':
        return <ResearchMode navigateTo={navigateTo} publication={selectedPublication} />;
      case 'knowledge-graph':
        return <KnowledgeGraph navigateTo={navigateTo} />;
      default:
        return <LandingPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      {renderContent()}
      <Footer />
    </div>
  );
};

// Header Component
const Header = ({ navigateTo, currentPage }) => (
  <header className="relative z-20 p-4 sm:p-6 lg:p-8 flex justify-between items-center bg-transparent">
    <div className="flex items-center space-x-2">
      {/* You can change the logo image here */}
      <img src="https://placehold.co/40x40/ffffff/000000?text=BO" alt="BioOrbit Logo" className="h-10 w-10 rounded-full" />
      {/* You can change the name design here */}
      <span className="text-xl font-bold">BioOrbit</span>
      <span className="text-sm text-gray-400 hidden sm:inline">Unlocking Space Biology with AI</span>
    </div>
    <nav className="hidden md:flex space-x-6 text-gray-300 font-medium">
      <a href="#" onClick={() => navigateTo('home')} className={`hover:text-white transition-colors duration-200 ${currentPage === 'home' ? 'text-white' : ''}`}>Home</a>
      <a href="#" onClick={() => navigateTo('explore')} className={`hover:text-white transition-colors duration-200 ${currentPage === 'explore' ? 'text-white' : ''}`}>Explore Mode</a>
      <a href="#" onClick={() => navigateTo('research')} className={`hover:text-white transition-colors duration-200 ${currentPage === 'research' ? 'text-white' : ''}`}>Research Mode</a>
      <a href="#" className="hover:text-white transition-colors duration-200">About</a>
    </nav>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="relative z-10 text-center p-4 text-gray-500 text-sm">
    <p>© 2025 BioOrbit. All rights reserved.</p>
    <p className="mt-1">Built for NASA Space Apps Challenge 2025</p>
  </footer>
);

// Landing Page Component with the Earth animation
const LandingPage = ({ navigateTo }) => {
  const mountRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  // THREE.js Earth Animation
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture, shininess: 10 });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create clouds
    const cloudsTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');
    const cloudsGeometry = new THREE.SphereGeometry(2.01, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.8,
      shininess: 0
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5).normalize();
    scene.add(directionalLight);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.005;
      clouds.rotation.y += 0.006;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowContent(true);
      animate();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 text-center">
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-80"></div>
      <div className={`relative z-10 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white mt-8 mb-4">
          Explore Space Biology with AI
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Unlock decades of NASA's bioscience experiments through interactive dashboards, smart summaries, and knowledge graphs - preparing us for Moon and Mars missions.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 mt-12 mb-20 justify-center">
          <button onClick={() => navigateTo('explore')} className="bg-green-500 text-black px-6 py-3 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-400">
            Explore Mode
            <span className="block text-sm font-normal mt-1">For students & public</span>
          </button>
          <button onClick={() => navigateTo('research')} className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-purple-500">
            Research Mode
            <span className="block text-sm font-normal mt-1">For scientists & researchers</span>
          </button>
        </div>

        <section className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl mt-16 max-w-5xl mx-auto border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8">AI-Driven Features for Smarter Exploration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FloatingCircle
              icon="💡"
              label="AI Summaries"
              description="Get instant, human-like summaries of complex NASA research."
            />
            <FloatingCircle
              icon="🔗"
              label="Knowledge Graphs"
              description="Discover hidden links between experiments, species, and missions."
            />
            <FloatingCircle
              icon="📊"
              label="Interactive Dashboard"
              description="Filter studies by mission, species, or timeline in one click."
            />
            <FloatingCircle
              icon="🔬"
              label="Compare & Explore"
              description="Compare results from Earth vs Space or across missions."
            />
          </div>
        </section>
      </div>
    </main>
  );
};

// Explore Mode Dashboard
const ExploreMode = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPublications, setFilteredPublications] = useState(mockPublications);

  useEffect(() => {
    if (searchTerm) {
      setFilteredPublications(
        mockPublications.filter(pub =>
          pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pub.focus.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPublications(mockPublications);
    }
  }, [searchTerm]);

  return (
    <main className="relative z-10 min-h-screen p-4 sm:p-8 lg:p-12 text-center bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-t-3xl mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-12">
          <input
            type="text"
            placeholder="Ask a question or search experiments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl px-6 py-4 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0-7a7 7 0 017-7m7 7l-7-7m7 7H11" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-700 flex flex-col text-left">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    <span className="font-semibold">NASA:</span> {pub.focus}
                    <br />
                    <span className="font-semibold">Journal:</span> {pub.journal}
                    <br />
                    <span className="font-semibold">Authors:</span> {pub.authors}
                  </p>
                  <img src={pub.image} alt={pub.title} className="w-full h-auto rounded-xl mb-4" />
                </div>
                <div className="flex items-center justify-between mt-4 space-x-2">
                  <button onClick={() => navigateTo('research', pub)} className="flex-1 bg-green-500 text-black font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-400 transition-all duration-300">
                    View Paper
                  </button>
                  <div className="w-1/2 p-2 bg-gray-700 rounded-full text-center text-sm font-medium">
                    Read Full Study
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-2xl mt-4 text-center">
                  <h4 className="font-bold text-lg text-white mb-2">Did You Know?</h4>
                  <p className="text-gray-300 text-sm">{pub.didYouKnow}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-400 text-lg">
              No matching publications found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// Research Mode Detailed View
const ResearchMode = ({ navigateTo, publication }) => {
  if (!publication) {
    // If no publication is selected, redirect to explore page or show a message
    return (
      <main className="relative z-10 min-h-screen p-4 sm:p-8 lg:p-12 text-center bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-t-3xl mt-8">
        <h2 className="text-3xl font-bold text-white mb-4">Select a publication from Explore Mode.</h2>
        <button onClick={() => navigateTo('explore')} className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-purple-500">
          Go to Explore Mode
        </button>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen p-4 sm:p-8 lg:p-12 text-left bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-t-3xl mt-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
      <div className="flex-1 p-6 bg-gray-800 rounded-3xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">{publication.title}</h2>
        <p className="text-gray-400 text-sm mb-6">
          <span className="font-semibold">Journal:</span> {publication.journal} &bull; <span className="font-semibold">Year:</span> {publication.year} &bull; <span className="font-semibold">Authors:</span> {publication.authors}
        </p>
        
        <img src={publication.image} alt={publication.title} className="w-full h-auto rounded-xl mb-6" />

        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">1. Objective:</h3>
            <p>{publication.summary.objective}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">2. Methods:</h3>
            <p>{publication.summary.methods}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">3. Key Findings:</h3>
            <ul className="list-disc list-inside space-y-1">
              {publication.summary.keyFindings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">4. Implications:</h3>
            <p>{publication.summary.implications}</p>
          </div>
        </div>

        <div className="mt-8 text-center lg:text-left">
          <button onClick={() => navigateTo('knowledge-graph')} className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-purple-500">
            View knowledge graph
          </button>
        </div>
      </div>

      <aside className="w-full lg:w-1/4 p-6 bg-gray-800 rounded-3xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Quick links</h3>
        <ul className="space-y-4">
          <li><button onClick={() => navigateTo('explore')} className="w-full text-left text-gray-400 font-medium hover:text-white transition-colors duration-200">Explore Mode</button></li>
          <li><button onClick={() => navigateTo('knowledge-graph')} className="w-full text-left text-gray-400 font-medium hover:text-white transition-colors duration-200">Knowledge graph</button></li>
        </ul>
      </aside>
    </main>
  );
};

// Knowledge Graph Visualization Page
const KnowledgeGraph = ({ navigateTo }) => {
  const containerRef = useRef(null);

  // Simple D3-like visualization to mimic the graph
  useEffect(() => {
    // This is a placeholder for a more complex D3 or Three.js graph
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.backgroundColor = 'transparent';
    svg.style.border = '1px solid #4B5563';
    svg.style.borderRadius = '1.5rem';

    // Mock nodes and links
    const nodes = [
      { id: 'Microgravity', x: 200, y: 100, color: 'rgb(129, 140, 248)', label: 'Microgravity\n(Zero G)' },
      { id: 'Plant Growth', x: 500, y: 100, color: 'rgb(107, 114, 128)', label: 'Plant Growth' },
      { id: 'Space Station', x: 400, y: 300, color: 'rgb(99, 102, 241)', label: 'Space Station (ISS)' },
      { id: 'Human Physiology', x: 700, y: 500, color: 'rgb(129, 140, 248)', label: 'Human Physiology' },
      { id: 'Light Direction', x: 750, y: 350, color: 'rgb(129, 140, 248)', label: 'Light Direction' },
      { id: 'Plant Orientation', x: 700, y: 200, color: 'rgb(107, 114, 128)', label: 'Plant Orientation' },
      { id: 'Water & Nutrients', x: 250, y: 500, color: 'rgb(129, 140, 248)', label: 'Water & Nutrients' },
    ];
    const links = [
      { source: 'Microgravity', target: 'Plant Growth', label: 'changes' },
      { source: 'Plant Growth', target: 'Plant Orientation', label: 'hosts' },
      { source: 'Plant Growth', target: 'Space Station', label: 'hosts' },
      { source: 'Space Station', target: 'Plant Growth', label: 'guides' },
      { source: 'Human Physiology', target: 'Space Station', label: 'guides' },
      { source: 'Light Direction', target: 'Plant Orientation', label: 'guides' },
      { source: 'Microgravity', target: 'Water & Nutrients', label: 'affects how move' },
      { source: 'Water & Nutrients', target: 'Plant Growth', label: 'support' },
    ];

    const nodesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    nodesGroup.setAttribute("class", "nodes");
    const linksGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    linksGroup.setAttribute("class", "links");

    links.forEach(link => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const sourceNode = nodes.find(n => n.id === link.source);
      const targetNode = nodes.find(n => n.id === link.target);
      line.setAttribute("x1", sourceNode.x);
      line.setAttribute("y1", sourceNode.y);
      line.setAttribute("x2", targetNode.x);
      line.setAttribute("y2", targetNode.y);
      line.setAttribute("stroke", "rgb(129, 140, 248)");
      line.setAttribute("stroke-width", "2");
      linksGroup.appendChild(line);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", (sourceNode.x + targetNode.x) / 2);
      text.setAttribute("y", (sourceNode.y + targetNode.y) / 2);
      text.setAttribute("fill", "rgb(156, 163, 175)");
      text.setAttribute("font-size", "10");
      text.setAttribute("text-anchor", "middle");
      text.textContent = link.label;
      linksGroup.appendChild(text);
    });

    nodes.forEach(node => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "50");
      circle.setAttribute("fill", node.color);
      circle.setAttribute("stroke", "white");
      circle.setAttribute("stroke-width", "2");
      nodesGroup.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", node.x);
      text.setAttribute("y", node.y);
      text.setAttribute("fill", "white");
      text.setAttribute("font-size", "14");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.textContent = node.label;
      nodesGroup.appendChild(text);
    });

    svg.appendChild(linksGroup);
    svg.appendChild(nodesGroup);
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(svg);
    }

  }, []);

  return (
    <main className="relative z-10 min-h-screen p-4 sm:p-8 lg:p-12 text-left bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-t-3xl mt-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
      <div className="flex-1 p-6 bg-gray-800 rounded-3xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">Interactive Knowledge Graph</h2>
        <p className="text-gray-400 mb-6">Click on nodes to explore connections between experiments, species, and conditions in space biology research. Use the sidebar to filter node types and view detailed information.</p>
        <div ref={containerRef} className="w-full h-[600px] relative"></div>
      </div>

      <aside className="w-full lg:w-1/4 p-6 bg-gray-800 rounded-3xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Graph Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Zoom In/Out</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.418 10H20v-5m0 0l-2.062-2.062a7.001 7.001 0 00-11.956-2.923m11.956-2.923a7.001 7.001 0 01-1.066 3.974l-2.54 2.54m-3.956-2.946l-2.54-2.54" />
            </svg>
            <span>Reset View</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-8 mb-4">Node Types</h3>
        <ul className="space-y-2 text-gray-400">
          <li><input type="checkbox" className="mr-2" defaultChecked /> Plant Biology</li>
          <li><input type="checkbox" className="mr-2" defaultChecked /> Human Physiology</li>
          <li><input type="checkbox" className="mr-2" defaultChecked /> Conditions</li>
          <li><input type="checkbox" className="mr-2" defaultChecked /> Effects</li>
          <li><input type="checkbox" className="mr-2" defaultChecked /> Processes</li>
          <li><input type="checkbox" className="mr-2" defaultChecked /> Structures</li>
        </ul>
        <h3 className="text-xl font-bold text-white mt-8 mb-4">Quick links</h3>
        <ul className="space-y-4">
          <li><button onClick={() => navigateTo('explore')} className="w-full text-left text-gray-400 font-medium hover:text-white transition-colors duration-200">Explore Mode</button></li>
          <li><button onClick={() => navigateTo('research')} className="w-full text-left text-gray-400 font-medium hover:text-white transition-colors duration-200">Research Mode</button></li>
        </ul>
      </aside>
    </main>
  );
};

export default App;
