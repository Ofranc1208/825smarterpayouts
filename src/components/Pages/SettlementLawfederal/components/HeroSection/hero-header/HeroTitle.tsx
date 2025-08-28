// Hero title component - under 50 lines per complexity rule
// Main page title

export default function HeroTitle() {
  return (
    <h1 style={{
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1.5rem",
      lineHeight: "1.2"
    }}>
      ⚖️ Structured Settlement Federal Law
    </h1>
  );
}
