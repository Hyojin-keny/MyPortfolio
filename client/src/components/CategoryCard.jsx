export default function CategoryCard({
  category,
  index,
  hovered,
  setHovered,
  onClick,
}) {
  
  const cardStyle = {
    position: "relative",
    width: "50%",
    height: "350px",
    float: "left",

    backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${category.image})`,

    backgroundSize: "cover",
    backgroundPosition: "center",

    cursor: "pointer",

    transform: hovered === index ? "scale(1.03)" : "scale(1)",

    transition: "0.3s ease",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          border:
            hovered === index
              ? "30px solid white"
              : "0px solid white",
          transition: "0.3s ease",
          top: 0,
          left: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          color: "white",
          marginTop: "80px",
          marginLeft: "50px",
          textAlign: "left",
        }}
      >
        <h2>{category.title}</h2>

        <p>Click to view projects</p>
      </div>
    </div>
  );
}