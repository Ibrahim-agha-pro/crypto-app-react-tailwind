export const Navbar = ({ child }) => {
  return (
    <header className="sticky top-0 z-10 w-full flex flex-col max-sm:gap-5 sm:flex-row justify-between items-center py-5 sm:py-10 px-8 sm:px-16 max-sm:text-center border-b border-border backdrop-blur-md">
      <div>
        <h1 className="text-primary text-3xl sm:text-4xl font-bold mb-3">
          🚀 Crypto Tracker
        </h1>
        <p className="text-muted text-md text-nowrap">
          Real-time cryptocurrency prices and market data
        </p>
      </div>
      <div className="sm:w-2/5 w-full ">{child}</div>
    </header>
  );
};
