import {
  toc as tocCountertopCostGuide,
  html as htmlCountertopCostGuide,
} from "./countertop-cost-guide-nwfl";
import {
  toc as tocFiveThings,
  html as htmlFiveThings,
} from "./five-things-before-replacing-countertops";
import {
  toc as tocGraniteVsQuartz,
  html as htmlGraniteVsQuartz,
} from "./granite-vs-quartz";
import {
  toc as tocReplaceBeforeSelling,
  html as htmlReplaceBeforeSelling,
} from "./replace-countertops-before-selling";
import {
  toc as tocEdgeProfile,
  html as htmlEdgeProfile,
} from "./countertop-edge-profile-guide";
import {
  toc as tocQuartzite,
  html as htmlQuartzite,
} from "./quartzite-countertops-guide";
import {
  toc as tocWhyQuartz,
  html as htmlWhyQuartz,
} from "./why-quartz-dominates-2026";
import {
  toc as tocMarble,
  html as htmlMarble,
} from "./marble-countertops-maintenance";
import {
  toc as tocOutdoor,
  html as htmlOutdoor,
} from "./outdoor-kitchen-countertops";
import {
  toc as tocHumidity,
  html as htmlHumidity,
} from "./gulf-coast-humidity-countertops";
import {
  toc as tocMaintenance101,
  html as htmlMaintenance101,
} from "./countertop-maintenance-101";
import {
  toc as tocSealGranite,
  html as htmlSealGranite,
} from "./how-to-seal-granite";
import {
  toc as tocStainRemoval,
  html as htmlStainRemoval,
} from "./countertop-stain-removal-guide";
import {
  toc as tocInstallationDay,
  html as htmlInstallationDay,
} from "./preparing-for-installation-day";
import {
  toc as tocCoastalDesign,
  html as htmlCoastalDesign,
} from "./coastal-kitchen-design";
import {
  toc as tocKitchenIsland,
  html as htmlKitchenIsland,
} from "./kitchen-island-countertop-ideas";
import {
  toc as tocSmallKitchen,
  html as htmlSmallKitchen,
} from "./small-kitchen-big-impact";
import {
  toc as tocBathroomVanity,
  html as htmlBathroomVanity,
} from "./bathroom-vanity-countertops";
import {
  toc as tocTrends2026,
  html as htmlTrends2026,
} from "./2026-countertop-trends";
import {
  toc as tocNewOwnership,
  html as htmlNewOwnership,
} from "./new-ownership-next-chapter";
import {
  toc as tocMission,
  html as htmlMission,
} from "./our-mission-transparency";

export interface TocItem {
  id: string;
  label: string;
}

export interface BlogContent {
  toc: TocItem[];
  html: string;
}

const contentMap: Record<string, BlogContent> = {
  "countertop-cost-guide-nwfl": {
    toc: tocCountertopCostGuide,
    html: htmlCountertopCostGuide,
  },
  "five-things-before-replacing-countertops": {
    toc: tocFiveThings,
    html: htmlFiveThings,
  },
  "granite-vs-quartz": {
    toc: tocGraniteVsQuartz,
    html: htmlGraniteVsQuartz,
  },
  "replace-countertops-before-selling": {
    toc: tocReplaceBeforeSelling,
    html: htmlReplaceBeforeSelling,
  },
  "countertop-edge-profile-guide": {
    toc: tocEdgeProfile,
    html: htmlEdgeProfile,
  },
  "quartzite-countertops-guide": {
    toc: tocQuartzite,
    html: htmlQuartzite,
  },
  "why-quartz-dominates-2026": {
    toc: tocWhyQuartz,
    html: htmlWhyQuartz,
  },
  "marble-countertops-maintenance": {
    toc: tocMarble,
    html: htmlMarble,
  },
  "outdoor-kitchen-countertops": {
    toc: tocOutdoor,
    html: htmlOutdoor,
  },
  "gulf-coast-humidity-countertops": {
    toc: tocHumidity,
    html: htmlHumidity,
  },
  "countertop-maintenance-101": {
    toc: tocMaintenance101,
    html: htmlMaintenance101,
  },
  "how-to-seal-granite": {
    toc: tocSealGranite,
    html: htmlSealGranite,
  },
  "countertop-stain-removal-guide": {
    toc: tocStainRemoval,
    html: htmlStainRemoval,
  },
  "preparing-for-installation-day": {
    toc: tocInstallationDay,
    html: htmlInstallationDay,
  },
  "coastal-kitchen-design": {
    toc: tocCoastalDesign,
    html: htmlCoastalDesign,
  },
  "kitchen-island-countertop-ideas": {
    toc: tocKitchenIsland,
    html: htmlKitchenIsland,
  },
  "small-kitchen-big-impact": {
    toc: tocSmallKitchen,
    html: htmlSmallKitchen,
  },
  "bathroom-vanity-countertops": {
    toc: tocBathroomVanity,
    html: htmlBathroomVanity,
  },
  "2026-countertop-trends": {
    toc: tocTrends2026,
    html: htmlTrends2026,
  },
  "new-ownership-next-chapter": {
    toc: tocNewOwnership,
    html: htmlNewOwnership,
  },
  "our-mission-transparency": {
    toc: tocMission,
    html: htmlMission,
  },
};

export function getBlogContent(slug: string): BlogContent | undefined {
  return contentMap[slug];
}

export default contentMap;
