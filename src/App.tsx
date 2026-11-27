import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import Index from "./pages/Index";

// The homepage ships in the main bundle; every other page loads on demand.
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Projects = lazy(() => import("./pages/Projects"));
const Tools = lazy(() => import("./pages/Tools"));
const Reads = lazy(() => import("./pages/Reads"));
const Social = lazy(() => import("./pages/Social"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/** Holds the page height while a lazily loaded page arrives (usually a few ms). */
const PageFallback = () => <div className="min-h-[60vh]" aria-busy="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full">
          <SideNav />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopNav />
            <main className="flex-1">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/newsletter" element={<Newsletter />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/reads" element={<Reads />} />
                  <Route path="/social" element={<Social />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
