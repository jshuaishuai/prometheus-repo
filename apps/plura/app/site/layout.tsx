import Navigation from "@/components/site";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main>
        <Navigation />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;
