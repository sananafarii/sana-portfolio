const Chip = ({ children, accent = false }) => {
  return <span className={accent ? "chip accent" : "chip"}>{children}</span>;
};

export default Chip;