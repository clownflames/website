import { getCurrentUser } from "@/lib/session";
import { navigation } from "@/lib/content";
import { Logo } from "@/components/site/logo";
import { SiteNav } from "@/components/site/nav";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-20">
        <Logo />
        <SiteNav items={navigation} signedIn={Boolean(user)} />
      </div>
    </header>
  );
}
