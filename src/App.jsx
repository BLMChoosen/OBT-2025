
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import HomePage from '@/pages/HomePage';
    import TutorialsPage from '@/pages/TutorialsPage';
    import AssistantPage from '@/pages/AssistantPage';
    import GamesPage from '@/pages/GamesPage';
    import SimulationsPage from '@/pages/SimulationsPage';
    import FamilyPage from '@/pages/FamilyPage';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import { Toaster } from '@/components/ui/toaster';
    import { motion, AnimatePresence } from 'framer-motion';

    function App() {
      return (
        <Router>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={
                    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <HomePage />
                    </motion.div>
                  } />
                  <Route path="/tutoriais" element={
                    <motion.div key="tutoriais" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <TutorialsPage />
                    </motion.div>
                  } />
                  <Route path="/assistente" element={
                    <motion.div key="assistente" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <AssistantPage />
                    </motion.div>
                  } />
                  <Route path="/jogos" element={
                    <motion.div key="jogos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <GamesPage />
                    </motion.div>
                  } />
                  <Route path="/simulacoes" element={
                    <motion.div key="simulacoes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <SimulationsPage />
                    </motion.div>
                  } />
                  <Route path="/familia" element={
                    <motion.div key="familia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <FamilyPage />
                    </motion.div>
                  } />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      );
    }

    export default App;
  