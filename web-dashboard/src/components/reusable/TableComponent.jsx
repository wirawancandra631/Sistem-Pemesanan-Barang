export const Table = ({ children, center = true }) => {
  return (
    <table className={`w-full ${center ? "text-center" : ""} `}>
      {children}
    </table>
  );
};
export const Thead = ({ children }) => {
  return <thead>{children}</thead>;
};
export const Tbody = ({ children }) => {
  return <thead>{children}</thead>;
};

export const Tr = ({ children }) => {
  return <tr>{children}</tr>;
};
export const Th = ({ children }) => {
  return (
    <th className="p-2 border border-blue-300 bg-blue-500 text-white">
      {children}
    </th>
  );
};
export const Td = ({ children }) => {
  return <td className="p-2 border border-slate-300 bg-white">{children}</td>;
};
