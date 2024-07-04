import Navigation from "@/components/site";

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        <Navigation />
      {children}
    </main>
  );
};

export default layout;
