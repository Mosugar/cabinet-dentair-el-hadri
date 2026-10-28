// Textes du site en français. Les textes marqués "à confirmer" viennent de nous, pas du client.
const fr = {
  meta: {
    title: "Centre Dentaire El Hadri · Dentiste à Salé (Hay Al Farah)",
    description:
      "Cabinet dentaire à Hay Al Farah, Karia, Salé : soins dentaires, orthodontie, implants, blanchiment. Prenez rendez-vous par téléphone ou WhatsApp.",
  },
  brand: { line1: "Centre Dentaire", line2: "El Hadri", short: "El Hadri" },
  nav: {
    services: "Soins",
    why: "Le cabinet",
    doctor: "Le docteur",
    faq: "Questions",
    contact: "Contact",
    cta: "Prendre rendez-vous",
    openMenu: "Menu",
    closeMenu: "Fermer",
    language: "Choisir la langue",
  },
  hero: {
    badge: "Cabinet dentaire · Salé",
    titleStart: "Votre sourire,",
    titleHighlight: "notre savoir-faire.",
    subtitle:
      "Soins dentaires, orthodontie et implants pour toute la famille, dans un cabinet moderne au cœur de Hay Al Farah.",
    book: "Prendre rendez-vous",
    call: "Appeler le cabinet",
    trust: ["Orthodontie", "Implants dentaires", "Soins pour toute la famille"],
    cardPhone: "Appelez-nous",
    cardPlace: "Hay Al Farah — Salé",
    scroll: "Découvrir",
  },
  services: {
    eyebrow: "Nos soins",
    title: "Tous vos soins dentaires au même endroit",
    subtitle: "Du contrôle de routine aux traitements les plus complets, nous prenons soin de votre sourire.",
    items: [
      { key: "soins", title: "Soins dentaires", desc: "Traitement des caries et obturations esthétiques couleur dent." },
      { key: "ortho", title: "Orthodontie", desc: "Appareils pour aligner les dents, chez l'enfant comme chez l'adulte." },
      { key: "implant", title: "Implants dentaires", desc: "Remplacer une dent manquante de façon fixe et durable." },
      { key: "prothese", title: "Prothèses & couronnes", desc: "Couronnes, bridges et prothèses pour retrouver un sourire complet." },
      { key: "detartrage", title: "Détartrage", desc: "Nettoyage professionnel et soins des gencives." },
      { key: "blanchiment", title: "Blanchiment", desc: "Des dents plus blanches, en toute sécurité." },
      { key: "endo", title: "Dévitalisation", desc: "Traitement de canal pour sauver une dent abîmée." },
      { key: "pedo", title: "Soins des enfants", desc: "Un suivi doux et rassurant pour les plus petits." },
    ],
  },
  why: {
    eyebrow: "Le cabinet",
    title: "Pourquoi choisir le Centre Dentaire El Hadri ?",
    subtitle: "Une équipe à l'écoute, un cabinet moderne et des soins expliqués clairement.",
    points: [
      { title: "Un accueil à l'écoute", desc: "On prend le temps d'expliquer chaque soin et de répondre à vos questions." },
      { title: "Hygiène et stérilisation", desc: "Des protocoles stricts pour votre sécurité à chaque rendez-vous." },
      { title: "Équipement moderne", desc: "Des techniques actuelles pour des soins plus précis et plus confortables." },
      { title: "Facile d'accès", desc: "Au cœur de Hay Al Farah à Salé, au 1er étage." },
    ],
  },
  doctor: {
    eyebrow: "Le docteur",
    name: "Dr El Hadri",
    role: "Chirurgien-dentiste",
    quote:
      "Chaque sourire mérite des soins précis, expliqués simplement, dans un cadre où l'on se sent en confiance.",
    bio: "Présentation du docteur à compléter : parcours, diplômes et spécialités.",
    cta: "Prendre rendez-vous",
  },
  booking: {
    eyebrow: "Rendez-vous",
    title: "Réservez votre rendez-vous",
    subtitle:
      "Remplissez le formulaire : il ouvre WhatsApp avec votre demande déjà écrite. Le cabinet vous confirme l'heure.",
    orCall: "Vous préférez appeler ?",
    fields: {
      name: "Nom complet",
      phone: "Téléphone",
      service: "Soin souhaité",
      servicePlaceholder: "Choisir un soin",
      serviceOther: "Consultation / autre",
      date: "Date souhaitée (facultatif)",
      message: "Message (facultatif)",
    },
    errors: {
      name: "Merci d'indiquer votre nom.",
      phone: "Numéro marocain invalide (ex. 06 12 34 56 78).",
      service: "Merci de choisir un soin.",
    },
    submit: "Envoyer sur WhatsApp",
    sent: "WhatsApp s'est ouvert avec votre demande. Il ne reste qu'à l'envoyer !",
    wa: {
      intro: "Bonjour, je souhaite prendre rendez-vous au Centre Dentaire El Hadri.",
      name: "Nom",
      phone: "Téléphone",
      service: "Soin",
      date: "Date souhaitée",
      message: "Message",
    },
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Vous avez une question ?",
    items: [
      {
        q: "Comment prendre rendez-vous ?",
        a: "Par téléphone, sur WhatsApp, ou avec le formulaire de cette page. Le cabinet vous confirme l'heure du rendez-vous.",
      },
      {
        q: "Recevez-vous les urgences dentaires ?",
        a: "En cas de douleur ou d'urgence, appelez directement le cabinet : nous ferons notre possible pour vous recevoir rapidement.",
      },
      {
        q: "Soignez-vous les enfants ?",
        a: "Oui, nous accueillons les enfants avec des soins adaptés à leur âge, dans une ambiance rassurante.",
      },
      {
        q: "Combien de temps dure un traitement orthodontique ?",
        a: "Cela dépend de chaque cas. Le docteur vous donne une estimation précise lors de la première consultation.",
      },
      {
        q: "Où se trouve le cabinet ?",
        a: "61, Avenue Moulay Abdelhafid, 1er étage, Quartier Al Farah, Salé 11130.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Venez nous voir",
    address: "Adresse",
    phone: "Téléphone",
    email: "E-mail",
    hours: "Horaires",
    // TODO : horaires à confirmer avec le client
    schedule: [
      { days: "Lundi – Vendredi", time: "09:00 – 19:00" },
      { days: "Samedi", time: "09:00 – 14:00" },
      { days: "Dimanche", time: "Fermé" },
    ],
    directions: "Itinéraire",
    mapTitle: "Carte du Centre Dentaire El Hadri",
  },
  footer: {
    tagline: "Votre cabinet dentaire de confiance à Salé.",
    links: "Navigation",
    contact: "Contact",
    follow: "Suivez-nous",
    rights: "Tous droits réservés.",
  },
  whatsappLabel: "Écrire sur WhatsApp",
};

export type Dictionary = typeof fr;
export default fr;
