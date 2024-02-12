import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import StandardDash from "./components/StandardDash";

import Upload from "./components/Upload";
import Template from './components/Template'
import MapPage from './components/MapPage'
import Map from './components/Map'








export default function App() {
  return (
    <div>

   
      
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<StandardDash/>}/>
          <Route path="upload" element={<Upload/>}/>
          
          <Route path="mappage" element={<MapPage/>}/>
          <Route path="template" element={<Template/>}/>
          <Route path="map" element={<Map/>}/>


          
          
          
         
        </Route>
      </Routes>
    </BrowserRouter>
 </div>
    
  );
}