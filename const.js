// Importering af de forskellige billeder til salonkategorier
const IMAGES = {
    image1: require('./image/Negle.png'),
    image2: require('./image/haircut.png'),
    image3: require('./image/lashes.png'),
    image4: require('./image/eyebrow.png'),
    image5: require('./image/body-massage.png')
}

// Billederne linkes til en kategori
export const SALONTYPES = [
    {key: "Negle", image: IMAGES.image1 },
    {key: "Frisør", image: IMAGES.image2},
    {key: "Øjenvipper", image: IMAGES.image3},
    {key: "Bryn", image: IMAGES.image4},
    {key: "Massage", image: IMAGES.image5}];

// Mails på admins
export const ADMINS = [
    "meinert@gmail.com",
    "magnus_sl@live.dk",
    "ips@ips.dk",
    "admin@mail.dk"
];