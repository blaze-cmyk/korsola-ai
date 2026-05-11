import { useEffect } from "react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { LpHero } from "@/components/marketing/lp/LpHero";
import { LpReelCarousel } from "@/components/marketing/lp/LpReelCarousel";
import { LpHowItWorks } from "@/components/marketing/lp/LpHowItWorks";
import { LpModels } from "@/components/marketing/lp/LpModels";
import { LpPromptBox } from "@/components/marketing/lp/LpPromptBox";
import { LpFeaturesBento } from "@/components/marketing/lp/LpFeaturesBento";

import { LpActorsBlock } from "@/components/marketing/lp/LpActorsBlock";
import { LpEmotionLocalize } from "@/components/marketing/lp/LpEmotionLocalize";

import { LpTeamPlans } from "@/components/marketing/lp/LpTeamPlans";
import { LpEnterpriseFeatures } from "@/components/marketing/lp/LpEnterpriseFeatures";
import { LpFaq } from "@/components/marketing/lp/LpFaq";
import { LpClosingCTA } from "@/components/marketing/lp/LpClosingCTA";
import { LpFooter } from "@/components/marketing/lp/LpFooter";

export default function Landingpage() {
  useEffect(() => {
    document.title = "Korsola — Create Winning Ads with AI";
  }, []);
  return (
    <div data-mk-page className="min-h-screen bg-bone text-ink">
      <MarketingHeader overlay />
      <main>
        <LpHero />
        <LpReelCarousel />
        <LpHowItWorks />
        <LpModels />
        <LpPromptBox />
        <LpFeaturesBento />
        
        <LpActorsBlock />
        <LpEmotionLocalize />
        
        <LpTeamPlans />
        <LpEnterpriseFeatures />
        <LpFaq />
        <LpClosingCTA />
      </main>
      <LpFooter />
    </div>
  );
}
