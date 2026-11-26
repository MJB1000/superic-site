import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import IndexVariant from "./pages/IndexVariant";
import IndexCRT from "./pages/IndexCRT";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CategoryPage from "./pages/CategoryPage";
import Newsletter from "./pages/Newsletter";
import Projects from "./pages/Projects";
import Tools from "./pages/Tools";
import Reads from "./pages/Reads";
import Social from "./pages/Social";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/v4" element={<IndexCRT />} />
                <Route path="/v4-matrix" element={<IndexVariant />} />
                <Route path="/v3" element={<Index />} />
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
            </main>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
