export const monuments = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra",
    fullLocation: "Agra, Uttar Pradesh",
    image: "/images/taj-mahal.jpg",
    crowdStatus: "High",
    description:
      "Iconic ivory-white marble mausoleum on the Yamuna River, celebrated for its symmetrical gardens and Mughal craftsmanship.",
    historicalDescription:
      "Commissioned in 1632 by Mughal Emperor Shah Jahan in memory of Mumtaz Mahal, the Taj Mahal blends Persian, Islamic, and Indian architectural traditions. Crafted from white Makrana marble inlaid with semi-precious stones, its central dome, four minarets, and Charbagh gardens make it one of the finest examples of Mughal heritage in the world.",
    openingHours: "6:00 AM – 6:30 PM (Closed on Fridays)",
    ticketPrices: {
      indian: "₹50 (₹250 with Main Mausoleum)",
      foreign: "₹1,100 (₹1,300 with Main Mausoleum)",
    },
    timeSlots: [
      "6:00 AM – 8:00 AM",
      "8:30 AM – 10:30 AM",
      "4:00 PM – 6:00 PM",
    ],
  },
  {
    id: "red-fort",
    name: "Red Fort",
    location: "Delhi",
    fullLocation: "Old Delhi, Delhi",
    image: "/images/red-fort.jpg",
    crowdStatus: "Medium",
    description:
      "Historic 17th-century Mughal citadel known for its massive red sandstone walls, Lahori Gate, and royal courtyards.",
    historicalDescription:
      "Built by Emperor Shah Jahan between 1638 and 1648 when he shifted the Mughal capital from Agra to Shahjahanabad, the Red Fort (Lal Qila) served as the main residence of Mughal emperors for nearly two centuries. Inside its towering red sandstone ramparts lie audience halls such as Diwan-i-Aam and Diwan-i-Khas, marble pavilions, and lush gardens.",
    openingHours: "9:30 AM – 4:30 PM (Closed on Mondays)",
    ticketPrices: {
      indian: "₹35",
      foreign: "₹500",
    },
    timeSlots: [
      "9:30 AM – 11:00 AM",
      "11:00 AM – 12:30 PM",
      "1:00 PM – 2:30 PM",
      "2:30 PM – 4:00 PM",
      "4:00 PM – 4:30 PM",
    ],
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    location: "Delhi",
    fullLocation: "Mehrauli, New Delhi",
    image: "/images/qutub-minar.jpg",
    crowdStatus: "Low",
    description:
      "A 73-meter fluted red sandstone and marble minaret surrounded by ancient stone arches and landscaped heritage grounds.",
    historicalDescription:
      "Started in 1199 by Qutb al-Din Aibak and completed by his successor Iltutmish, Qutub Minar is the tallest brick minaret in the world at 73 meters. Its five tapering storeys feature intricate calligraphic bands and geometric carvings, surrounded by historic landmarks including the Quwwat-ul-Islam Mosque, Alai Darwaza, and the rust-resistant Iron Pillar.",
    openingHours: "7:00 AM – 5:00 PM (Open Daily)",
    ticketPrices: {
      indian: "₹35",
      foreign: "₹550",
    },
    timeSlots: [
      "7:00 AM – 8:30 AM",
      "8:30 AM – 10:00 AM",
      "10:00 AM – 11:30 AM",
      "12:00 PM – 1:30 PM",
      "2:00 PM – 3:30 PM",
      "3:30 PM – 5:00 PM",
    ],
  },
  {
    id: "india-gate",
    name: "India Gate",
    location: "Delhi",
    fullLocation: "Kartavya Path, New Delhi",
    image: "/images/india-gate.jpg",
    crowdStatus: "Medium",
    description:
      "Grand 42-meter sandstone war memorial arch standing along Kartavya Path, framed by wide green lawns and walkways.",
    historicalDescription:
      "Designed by Sir Edwin Lutyens and inaugurated in 1931, India Gate is a 42-meter-high triumphal arch built in yellow and red Bharatpur sandstone. Dedicated to over 70,000 soldiers of the British Indian Army who lost their lives during the First World War, it anchors New Delhi's ceremonial Kartavya Path and is illuminated each evening.",
    openingHours: "Open 24 Hours (Evening lights 7:00 PM – 9:30 PM)",
    ticketPrices: {
      indian: "Free Entry",
      foreign: "Free Entry",
    },
    timeSlots: [
      "6:00 AM – 8:00 AM",
      "9:00 AM – 11:00 AM",
      "4:30 PM – 6:30 PM",
      "7:00 PM – 9:00 PM",
    ],
  },
];

export const crowdBadgeStyles = {
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  High: "border-rose-200 bg-rose-50 text-rose-700",
};

export const crowdDotStyles = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-rose-500",
};

export function getMonumentById(id) {
  return monuments.find((site) => site.id === id);
}

