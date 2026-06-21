import type { GuideSection as GuideSectionType } from "@/types";
import CategoryBar from "./CategoryBar";
import GuideSection from "./GuideSection";
import styles from "./ConilGuide.module.css";

interface ConilGuideProps {
  sections: GuideSectionType[];
}

/**
 * The guide body: a sticky category bar derived from the sections plus the
 * rendered sections themselves. The site shell (nav, hero, footer, WhatsApp
 * FAB) is provided by the page. The category bar sticks below the site nav via
 * the `--guide-catbar-top` variable set on `.root`.
 */
export default function ConilGuide({ sections }: ConilGuideProps) {
  const cats = sections.map((s) => ({ anchor: s.anchor, label: s.navLabel }));

  return (
    <div className={styles.root}>
      <CategoryBar cats={cats} />
      {sections.map((section) => (
        <GuideSection key={section._key} section={section} />
      ))}
    </div>
  );
}
