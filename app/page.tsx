import './landing.css'
import HeroSection from '@/components/sections/HeroSection'
import StoryCards from '@/components/sections/StoryCards'
import SolutionsSection from '@/components/sections/SolutionsSection'
import DashboardSection from '@/components/sections/DashboardSection'
import ProblemSection from '@/components/sections/ProblemSection'
import SocialProof from '@/components/sections/SocialProof'
import TeamSection from '@/components/sections/TeamSection'
import InvestorsSection from '@/components/sections/InvestorsSection'
import FAQSection from '@/components/sections/FAQSection'
import FinalCTASection from '@/components/sections/FinalCTASection'
import RevealOnScroll from '@/components/RevealOnScroll'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="landing-page">
      <RevealOnScroll />
      <HeroSection />
      <StoryCards />
      <SolutionsSection />
      <DashboardSection />
      <ProblemSection />
      <SocialProof />
      <TeamSection />
      <InvestorsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}
