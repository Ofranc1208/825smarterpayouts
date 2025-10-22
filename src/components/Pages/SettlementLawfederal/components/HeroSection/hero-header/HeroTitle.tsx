// Hero title component - under 50 lines per complexity rule
// Main page title

export default function HeroTitle() {
  return (
    <h1 style={{
      fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1rem",
      lineHeight: "1.3"
    }}>
      Structured Settlement Federal Law
    </h1>
  );
}
