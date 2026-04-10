import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import InvitationShowcase from './components/InvitationShowcase/InvitationShowcase'
import WhyUs from './components/WhyUs/WhyUs'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Pricing from './components/Pricing/Pricing'
// Gallery removed — replaced by InvitationShowcase themes section
import Testimonials from './components/Testimonials/Testimonials'
import Studio from './components/Studio/Studio'
import Faq from './components/Faq/Faq'
import FinalCta from './components/FinalCta/FinalCta'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import InvitationPage from './pages/InvitationPage/InvitationPage'
import AdminLogin from './pages/AdminLogin/AdminLogin'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import BlogList from './pages/BlogList/BlogList'
import BlogPost from './pages/BlogPost/BlogPost'
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess'
import SaveTheDateCreate from './pages/SaveTheDateCreate/SaveTheDateCreate'
import SaveTheDateView from './pages/SaveTheDateView/SaveTheDateView'
import EnvelopePage from './pages/EnvelopePage/EnvelopePage'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InvitationShowcase />
        <WhyUs />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Studio />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/invite/:slug" element={<InvitationPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/save-the-date/create" element={<SaveTheDateCreate />} />
      <Route path="/save-the-date/view" element={<SaveTheDateView />} />
      <Route path="/open/:slug" element={<EnvelopePage />} />
    </Routes>
  )
}
