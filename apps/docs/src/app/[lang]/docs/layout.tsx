import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { BookOpen, Cloud } from "lucide-react";

export default async function Layout({ children, params }: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params;

  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      tabMode="auto"
      tabs={[
        {
          title: "Docs",
          url: `/${lang}`,
          icon: (
            <span className="flex size-full items-center justify-center">
              <BookOpen size={16} />
            </span>
          ),
        },
        {
          title: "Cloud",
          url: `/${lang}/cloud`,
          icon: (
            <span className="flex size-full items-center justify-center">
              <Cloud size={16} />
            </span>
          ),
        },
      ]}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
