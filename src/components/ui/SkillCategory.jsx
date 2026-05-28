const SkillCategory = ({ label, items }) => {
  return (
    <div className="skill-cat">
      <div className="skill-cat-label">{label}</div>
      <div className="skill-tags">
        {items.map((item) => (
          <span className="skill-tag" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;