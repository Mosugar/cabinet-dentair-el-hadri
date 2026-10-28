// Toutes les infos du cabinet au même endroit (tirées de la carte de visite).
export const site = {
  name: "Centre Dentaire El Hadri",
  url: "https://www.centredentaireelhadri.ma",
  email: "centredentaireelhadri@gmail.com",
  phones: [
    { display: "05 38 70 70 30", href: "tel:+212538707030" },
    { display: "07 02 09 11 77", href: "tel:+212702091177" },
  ],
  // TODO : confirmer avec le client que le 07 est bien sur WhatsApp
  whatsapp: "https://wa.me/212702091177",
  address: {
    street: "61, Avenue Moulay Abdelhafid, 1er étage",
    area: "Quartier Al Farah",
    postalCode: "11130",
    city: "Salé",
    country: "Maroc",
  },
  // Position exacte de la fiche Google Maps "Centre Dentaire El Hadri"
  geo: { lat: 34.0231731, lng: -6.7611393 },
  mapsUrl: "https://maps.google.com/?cid=7571514103259197964",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=34.0231731,-6.7611393",
  wazeUrl: "https://waze.com/ul?ll=34.0231731,-6.7611393&navigate=yes",
  instagram: {
    handle: "@centre_dentaire_elhadri",
    url: "https://www.instagram.com/centre_dentaire_elhadri",
  },
} as const;

export const mapDirectionsUrl = site.directionsUrl;
