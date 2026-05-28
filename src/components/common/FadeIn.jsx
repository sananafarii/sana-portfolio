import useScrollReveal from "../../hooks/useScrollReveal";

const FadeIn = ({ children, className = "" }) => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <div ref={elementRef} className={`fade-in ${isVisible ? "visible" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default FadeIn;