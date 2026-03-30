export const TRANSPORT_CATEGORIES = [
  {
    name: "Ground",
    modes: [
      { key: "TAXI_RIDE", label: "Taxi & Rideshare", icon: "Car" },
      { key: "LIMOUSINE", label: "Limousine", icon: "Car" },
      { key: "COURIER_LAST_MILE", label: "Courier & Last Mile", icon: "Package" },
      { key: "MOVING", label: "Moving", icon: "Truck" },
      { key: "FREIGHT_TRUCKING", label: "Freight Trucking", icon: "Truck" },
      { key: "HEAVY_HAUL", label: "Heavy Haul", icon: "Truck" },
    ],
  },
  {
    name: "Air",
    modes: [
      { key: "PRIVATE_JET", label: "Private Jet", icon: "Plane" },
      { key: "HELICOPTER", label: "Helicopter", icon: "Plane" },
      { key: "COMMERCIAL_AIRLINE", label: "Commercial Airline", icon: "Plane" },
      { key: "AIR_CARGO", label: "Air Cargo", icon: "Plane" },
    ],
  },
  {
    name: "Maritime",
    modes: [
      { key: "CARGO_SHIP", label: "Cargo Ship", icon: "Ship" },
      { key: "YACHT_CHARTER", label: "Yacht Charter", icon: "Ship" },
      { key: "FERRY", label: "Ferry", icon: "Ship" },
    ],
  },
  {
    name: "Rail & Specialty",
    modes: [
      { key: "FREIGHT_RAIL", label: "Freight Rail", icon: "Train" },
      { key: "ARMORED", label: "Armored Transport", icon: "Shield" },
      { key: "MEDICAL", label: "Medical Transport", icon: "Heart" },
      { key: "HAZMAT", label: "Hazmat", icon: "AlertTriangle" },
      { key: "OVERSIZED_CARGO", label: "Oversized Cargo", icon: "Maximize" },
    ],
  },
];

export const ALL_MODES = TRANSPORT_CATEGORIES.flatMap((c) => c.modes);
