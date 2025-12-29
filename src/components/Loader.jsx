export const Loader = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-80 ">
      <div
        style={{
          borderColor: "rgba(173, 216, 230, 0.2)",
          borderTopColor: "#add8e6",
        }}
        className="w-12 h-12 rounded-full border-4 animate-spin"
      />
      <h1>Loading Data ...</h1>

      {children}
    </div>
  );
};
