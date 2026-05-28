const StatBlock = ({ value, label }) => {
  const numericPart = value.replace(/[^0-9]/g, "");
  const suffixPart = value.slice(numericPart.length);

  return (
    <div className="stat">
      <div className="stat-n">
        {numericPart}
        <span>{suffixPart}</span>
      </div>
      <div className="stat-l">{label}</div>
    </div>
  );
};

export default StatBlock;