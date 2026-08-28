import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default async function CloudLayout({ children, params }: LayoutProps<"/[lang]/cloud">) {
  const { lang } = await params;

  return (
    <div data-cloud-layout data-language={lang}>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </div>
  );
}
