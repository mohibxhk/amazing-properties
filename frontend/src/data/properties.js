const img = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=srgb&fm=jpg&q=80&w=${w}&auto=format&fit=crop`;

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4";
export const HERO_POSTER = img("photo-1706992368801-d6d4040b2b6c", 1920);
export const ABOUT_IMAGE = img("photo-1706992368801-d6d4040b2b6c");

const IMG_VILLA = img("photo-1706808849780-7a04fbac83ef");
const IMG_PENTHOUSE = img("photo-1757924461488-ef9ad0670978");
const IMG_ESTATE = img("photo-1790276319227-993348bb36c7");
const IMG_SUITE = img("photo-1688646953306-5ec93eab8c06");
const IMG_GARDEN = img("photo-1678889284769-b7dcbec1f082");
const IMG_FURNISHED = img("photo-1564078516393-cf04bd966897");
const IMG_COMMERCIAL = img("photo-1704040686413-2c607dbd2f06");

export const PROPERTIES = [
  {
    id: "luxury-apartment-juffair",
    title: "Luxury Apartment Available for Sale",
    location: "Juffair",
    purpose: "sale",
    type: "Apartment",
    beds: 4,
    baths: 3,
    area: 200,
    price: 99600,
    priceLabel: "BD 99,600",
    furnished: false,
    featured: true,
    image: IMG_PENTHOUSE,
    blurb:
      "A spacious four-bedroom apartment in Juffair with 200 m² of living space and three bathrooms. Contact our team for floor plans and a private viewing.",
  },
  {
    id: "luxury-villa-barbar",
    title: "4 Bedroom Luxury Villa for Rent",
    location: "Barbar",
    purpose: "rent",
    type: "Villa",
    beds: 4,
    baths: null,
    area: null,
    price: null,
    priceLabel: "Price on request",
    furnished: false,
    featured: true,
    image: IMG_VILLA,
    blurb:
      "A four-bedroom luxury villa in Barbar, available for rent. Full details and viewing arrangements are available through our office.",
  },
  {
    id: "furnished-apartment-juffair-704",
    title: "2 Bedroom Fully Furnished Apartment",
    location: "Juffair",
    purpose: "rent",
    type: "Apartment",
    beds: 2,
    baths: null,
    area: null,
    price: 704,
    priceLabel: "BD 704 / month",
    furnished: true,
    featured: true,
    image: IMG_SUITE,
    blurb:
      "A fully furnished two-bedroom apartment in Juffair, ready to move into. Call us to arrange a viewing this week.",
  },
  {
    id: "stunning-flat-mahooz",
    title: "Stunning Flat",
    location: "Mahooz",
    purpose: "rent",
    type: "Apartment",
    beds: 1,
    baths: 1,
    area: null,
    price: 330,
    priceLabel: "BD 330 / month",
    furnished: false,
    featured: true,
    image: IMG_FURNISHED,
    blurb:
      "A well-kept one-bedroom flat in Mahooz with one bathroom. A straightforward rental in a central neighbourhood.",
  },
  {
    id: "furnished-2bhk-juffair-350",
    title: "2 BHK Fully Furnished Apartment",
    location: "Juffair",
    purpose: "rent",
    type: "Apartment",
    beds: 2,
    baths: null,
    area: null,
    price: 350,
    priceLabel: "BD 350 / month",
    furnished: true,
    featured: true,
    image: IMG_ESTATE,
    blurb:
      "A fully furnished two-bedroom apartment in Juffair at a practical monthly rent. Good value for the area.",
  },
  {
    id: "furnished-2bhk-zinj-550",
    title: "2 BHK Fully Furnished Apartment",
    location: "Zinj",
    purpose: "rent",
    type: "Apartment",
    beds: 2,
    baths: null,
    area: null,
    price: 550,
    priceLabel: "BD 550 / month",
    furnished: true,
    featured: true,
    image: IMG_GARDEN,
    blurb:
      "A fully furnished two-bedroom apartment in Zinj, close to the diplomatic quarter. Contact us for availability.",
  },
  {
    id: "furnished-2bhk-mahooz-380",
    title: "2 BHK Fully Furnished Apartment",
    location: "Mahooz",
    purpose: "rent",
    type: "Apartment",
    beds: 2,
    baths: null,
    area: null,
    price: 380,
    priceLabel: "BD 380 / month",
    furnished: true,
    featured: false,
    image: IMG_SUITE,
    blurb:
      "A fully furnished two-bedroom apartment in Mahooz. Central location, sensible rent.",
  },
  {
    id: "studio-mahooz-210",
    title: "Modern Fully Furnished Studio",
    location: "Mahooz",
    purpose: "rent",
    type: "Studio",
    beds: 0,
    baths: 1,
    area: null,
    price: 210,
    priceLabel: "BD 210 / month",
    furnished: true,
    featured: false,
    image: IMG_FURNISHED,
    blurb:
      "A modern, fully furnished studio in Mahooz. An easy first rental or a practical base in the city.",
  },
  {
    id: "apartment-sanad-160",
    title: "2 BHK Apartment",
    location: "Sanad",
    purpose: "rent",
    type: "Apartment",
    beds: 2,
    baths: null,
    area: null,
    price: 160,
    priceLabel: "BD 160 / month",
    furnished: false,
    featured: false,
    image: IMG_ESTATE,
    blurb:
      "A two-bedroom apartment in Sanad at one of the most accessible rents on our books.",
  },
  {
    id: "furnished-1bhk-juffair-300",
    title: "1 BHK Fully Furnished Apartment",
    location: "Juffair",
    purpose: "rent",
    type: "Apartment",
    beds: 1,
    baths: null,
    area: null,
    price: 300,
    priceLabel: "BD 300 / month",
    furnished: true,
    featured: false,
    image: IMG_SUITE,
    blurb:
      "A fully furnished one-bedroom apartment in Juffair. Move-in ready, close to shops and the highway.",
  },
  {
    id: "furnished-3bhk-juffair-500",
    title: "3 BHK Fully Furnished Apartment",
    location: "Juffair",
    purpose: "rent",
    type: "Apartment",
    beds: 3,
    baths: null,
    area: null,
    price: 500,
    priceLabel: "BD 500 / month",
    furnished: true,
    featured: false,
    image: IMG_PENTHOUSE,
    blurb:
      "A fully furnished three-bedroom apartment in Juffair, suited to families or sharers.",
  },
  {
    id: "family-villas-hamala",
    title: "Luxury Family Villas",
    location: "Hamala",
    purpose: "sale",
    type: "Villa",
    beds: 4,
    baths: null,
    area: null,
    price: null,
    priceLabel: "Price on request",
    furnished: false,
    featured: false,
    image: IMG_VILLA,
    blurb:
      "A collection of luxury family villas in Hamala. Sizes and prices on request through our office.",
  },
];

export const LOCATIONS = [
  "Manama",
  "Juffair",
  "Seef",
  "Amwaj Island",
  "Saar",
  "Riffa",
  "Tubli",
  "Mahooz",
  "Zinj",
  "Hidd",
  "Muharraq",
  "Sanad",
  "Isa Town",
  "Barbar",
  "Hamala",
];

export const CATEGORY_TILES = [
  {
    name: "Apartments",
    tag: "City & waterfront living",
    image: IMG_SUITE,
    href: "/for-rent?type=Apartment",
    large: true,
  },
  {
    name: "Villas",
    tag: "Family homes & estates",
    image: IMG_VILLA,
    href: "/for-rent?type=Villa",
  },
  {
    name: "Fully Furnished",
    tag: "Move-in ready",
    image: IMG_FURNISHED,
    href: "/for-rent?location=Juffair",
  },
  {
    name: "Commercial",
    tag: "Offices & retail",
    image: IMG_COMMERCIAL,
    href: "/contact",
  },
];

export const filterLocal = (purpose, params) => {
  let res = PROPERTIES.filter((p) => p.purpose === purpose);
  const location = params.get("location");
  const type = params.get("type");
  const beds = params.get("beds");
  const maxPrice = params.get("max_price");
  if (location) res = res.filter((p) => p.location.toLowerCase() === location.toLowerCase());
  if (type) res = res.filter((p) => p.type.toLowerCase() === type.toLowerCase());
  if (beds) {
    const b = parseInt(beds, 10);
    res = res.filter((p) => (b >= 4 ? p.beds >= 4 : p.beds === b));
  }
  if (maxPrice) res = res.filter((p) => p.price !== null && p.price <= parseInt(maxPrice, 10));
  return res;
};

export const CONTACT = {
  phones: ["+973 34110099", "+973 17714648", "+973 34001199"],
  email: "info@amazingpropertiesbh.com",
  address: "Office 3566A, Road 187, Block 701, Tubli, Bahrain",
  hours: "Sunday – Thursday · 8:00 AM – 6:00 PM",
  cr: "146568-02",
  rera: "2024 10/1315",
};
