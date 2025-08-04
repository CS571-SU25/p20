export const attractionsData = [
  {
    id: 1,
    name: "Central Park",
    description: "A sprawling urban oasis in the heart of Manhattan featuring lakes, meadows, walking paths, and recreational activities.",
    image: "/images/central-park.jpg",
    hours: "6:00 AM - 1:00 AM daily",
    rating: 4.8,
    duration: "2-4 hours",
    category: "Park",
    location: { lat: 40.7829, lng: -73.9654 },
    tips: ["Best visited in spring or fall", "Bring comfortable walking shoes", "Don't miss Bethesda Fountain"],
    bookingUrl: "https://www.centralparknyc.org/",
    reviews: [
      { user: "Sarah M.", rating: 5, comment: "Beautiful park with so much to see and do!" },
      { user: "John D.", rating: 4, comment: "Great for jogging and relaxing. Can get crowded on weekends." }
    ]
  },
  {
    id: 2,
    name: "Statue of Liberty",
    description: "An iconic symbol of freedom and democracy, offering spectacular views and rich history.",
    image: "/images/statue-of-liberty.jpg",
    hours: "9:30 AM - 5:00 PM daily",
    rating: 4.6,
    duration: "3-5 hours",
    category: "Monument",
    location: { lat: 40.6892, lng: -74.0445 },
    tips: ["Book tickets in advance", "Take ferry from Battery Park", "Arrive early to avoid crowds"],
    bookingUrl: "https://www.nps.gov/stli/index.htm",
    reviews: [
      { user: "Emily R.", rating: 5, comment: "A must-see! The ferry ride is part of the experience." },
      { user: "Mike T.", rating: 4, comment: "Amazing views from the crown, but book well in advance." }
    ]
  },
  {
    id: 3,
    name: "Times Square",
    description: "The dazzling crossroads of the world, featuring bright lights, Broadway theaters, and endless entertainment.",
    image: "/images/times-square.jpg",
    hours: "24/7",
    rating: 4.2,
    duration: "1-2 hours",
    category: "Entertainment",
    location: { lat: 40.7580, lng: -73.9855 },
    tips: ["Visit at night for full effect", "Watch out for crowds", "Great for photos"],
    bookingUrl: "https://www.timessquarenyc.org/",
    reviews: [
      { user: "Lisa K.", rating: 4, comment: "Incredible energy and lights! Very crowded but worth it." },
      { user: "David H.", rating: 3, comment: "Tourist trap but iconic. Better at night." }
    ]
  },
  {
    id: 4,
    name: "American Museum of Natural History",
    description: "World-renowned museum featuring dinosaur exhibits, planetarium, and extensive natural history collections.",
    image: "/images/museum.jpg",
    hours: "10:00 AM - 5:30 PM daily",
    rating: 4.7,
    duration: "3-4 hours",
    category: "Museum",
    location: { lat: 40.7813, lng: -73.9740 },
    tips: ["Get timed entry tickets", "Don't miss the planetarium", "Plan for at least 3 hours"],
    bookingUrl: "https://www.amnh.org/",
    reviews: [
      { user: "Anna S.", rating: 5, comment: "Fantastic exhibits! The planetarium is breathtaking." },
      { user: "Tom W.", rating: 5, comment: "Kids loved the dinosaur exhibits. Educational and fun." }
    ]
  },
  {
    id: 5,
    name: "Empire State Building",
    description: "Art Deco masterpiece offering breathtaking 360-degree views of New York City from its observation decks.",
    image: "/images/empire-state.jpg",
    hours: "9:00 AM - 2:00 AM daily",
    rating: 4.5,
    duration: "1-2 hours",
    category: "Observation",
    location: { lat: 40.7484, lng: -73.9857 },
    tips: ["Visit at sunset for best views", "Buy skip-the-line tickets", "Check weather conditions"],
    bookingUrl: "https://www.esbnyc.com/",
    reviews: [
      { user: "Chris P.", rating: 5, comment: "Stunning views! Worth every penny." },
      { user: "Maria L.", rating: 4, comment: "Great experience but very crowded during peak hours." }
    ]
  },
  {
    id: 6,
    name: "Brooklyn Bridge",
    description: "Historic suspension bridge offering spectacular views of Manhattan skyline and East River.",
    image: "/images/brooklyn-bridge.jpg",
    hours: "24/7",
    rating: 4.6,
    duration: "1-2 hours",
    category: "Monument",
    location: { lat: 40.7061, lng: -73.9969 },
    tips: ["Best photos at sunrise or sunset", "Walk the pedestrian path", "Be aware of cyclists"],
    bookingUrl: "https://www.nyc.gov/html/dot/html/infrastructure/brooklyn-bridge.shtml",
    reviews: [
      { user: "Alex K.", rating: 5, comment: "Amazing walk with incredible views!" },
      { user: "Rachel B.", rating: 4, comment: "Beautiful bridge but can get very crowded." }
    ]
  }
];