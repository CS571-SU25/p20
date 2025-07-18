export default function Attractions() {
  const attractions = [
    "Statue of Liberty",
    "Central Park",
    "Times Square",
    "Empire State Building",
    "Natural History Museum"
  ];

  return (
    <div>
      <h1>Popular NYC Attractions</h1>
      <ul>
        {attractions.map((place, i) => <li key={i}>{place}</li>)}
      </ul>
    </div>
  );
}
