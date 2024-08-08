const products = [
    {
        id: 1,
        nombre: "Esmaltes mate para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Esmaltes",
        descripcion: "Esmalte apto para pintar cerámicas con acabado mate. Diversos colores.",
        precio: 160,
        stock:5,
        imagen: "producto_1.png"
    },
    {
        id: 2,
        nombre: "Pigmento mate para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Pigmentos",
        descripcion: "Pigmento apto para pintar cerámica. Diversos colores.",
        precio: 200,
        stock:4,
        imagen: "producto_2.png"
    },
    {
        id: 3,
        nombre: "Set pigmentos pastel para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Pigmentos",
        descripcion: "Pigmentos para cerámica en tonos pastel.",
        precio: 1300,
        stock:7,
        imagen: "producto_3.jpg"
    },
    {
        id: 4,
        nombre: "Esmalte brillante para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Esmaltes",
        descripcion: "Esmalte para cerámica de acabado brillante de baja opacidad. Diversos colores.",
        precio: 250,
        stock:10,
        imagen: "producto_4.png"
    },
    {
        id: 5,
        nombre: "Esmalte brillante para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Esmaltes",
        descripcion: "Esmalte para cerámica de acabado brillante en diversos colores.",
        precio: 300,
        stock:5,
        imagen: "producto_5.png"
    },
    {
        id: 6,
        nombre: "Esmaltes TP para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Esmaltes",
        descripcion: "Esmaltes marca TP para cerámica. Diversos colores.",
        precio: 480,
        stock: 13,
        imagen: "producto_6.png"
    },
    {
        id: 7,
        nombre: "Set de 24 pigmentos para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Pigmentos",
        descripcion: "Set que contiene 24 pigmentos aptos para cerámica.",
        precio: 2500,
        stock:2,
        imagen: "producto_7.png"
    },
    {
        id: 8,
        nombre: "Esmaltes para cerámica",
        categoria: "EsmaltesyPigmentos",
        subcategoria: "Esmaltes",
        descripcion: "Esmaltes para pintar cérmica, diversos colores.",
        precio: 150,
        stock:15,
        imagen: "producto_8.png"
    },
    {
        id: 9,
        nombre: "Rodillo para cortar cerámica",
        categoria: "Herramientas",
        subcategoria: "Cortantes",
        descripcion: "Rodillo para cortar láminas de cerámica.",
        precio: 2500,
        stock:7,
        imagen: "producto_9.png"
    },
    {
        id: 10,
        nombre: "Desbastador de cerámica",
        categoria: "Herramientas",
        subcategoria: "Herramientas",
        descripcion: "Desbastadores de distintas formas para cerámica.",
        precio: 150,
        stock:1,
        imagen: "producto_10.png"
    },
    {
        id: 11,
        nombre: "Sello para cerámica con forma de hoja",
        categoria: "Herramientas",
        subcategoria: "Herramientas",
        descripcion: "Sello para dar textura de hoja a las cerámica.",
        precio: 350,
        stock:9,
        imagen: "producto_11.jpg"
    },
    {
        id: 12,
        nombre: "Set de cortantes con forma de corazón",
        categoria: "Herramientas",
        subcategoria: "Cortantes",
        descripcion: "Set de cortantes para cerámica con forma de corazón, diversos tamaños y formas.",
        precio: 800,
        stock:2,
        imagen: "producto_12.png"
    },
    {
        id: 13,
        nombre: "Rodillo texturizador, forma de triángulos",
        categoria: "Herramientas",
        subcategoria: "Herramientas",
        descripcion: "Rodillo para aportar textura a la cerámica, con forma de triangulo.",
        precio: 300,
        stock:15,
        imagen: "producto_13.png"
    },
    {
        id: 14,
        nombre: "Set cortantes pequeños para ceramica",
        categoria: "Herramientas",
        subcategoria: "Cortantes",
        descripcion: "Set de cortantes pequeños para cerámica con diversos tamaños.",
        precio: 870,
        stock:6,
        imagen: "producto_14.png"
    },
    {
        id: 15,
        nombre: "Set de 6 rodillos con distintas texturas",
        categoria: "Herramientas",
        subcategoria: "Herramientas",
        descripcion: "Set de 6 rodillos para aportar textura a la cerámica, motivos variados.",
        precio: 1500,
        stock:4,
        imagen: "producto_15.jpg"
    },
    {
        id: 16,
        nombre: "Raspadores de metal para cerámica",
        categoria: "Herramientas",
        subcategoria: "Herramientas",
        descripcion: "Raspadores de metal para cerámica, con diversas formas.",
        precio: 500,
        stock:3,
        imagen: "producto_16.jpg"
    },
    {
        id: 17,
        nombre: "Bandeja de cerámica en forma de hoja",
        categoria: "Decoracion",
        subcategoria: "Bandejas",
        descripcion: "Bandejas con forma de hoja para decorar o contrener pequeños elementos.",
        precio: 620,
        stock:1,
        imagen: "producto_17.png"
    },
    {
        id: 18,
        nombre: "Candelabro con varios colores",
        categoria: "Decoracion",
        subcategoria: "Candelabros",
        descripcion: "Candelabro para 1 vela con diversos colores y motivos.",
        precio: 780,
        stock:3,
        imagen: "producto_18.png"
    },
    {
        id: 19,
        nombre: "Set de Decoracion de pared en gris y blanco",
        categoria: "Decoracion",
        subcategoria: "Decoracion de pared",
        descripcion: "Decoración de pared de cerámica con forma de medusas  en diversos tonos de gris.",
        precio: 1350,
        stock:1,
        imagen: "producto_19.png"
    },
    {
        id: 20,
        nombre: "Set de floreros de cerámica con forma de libros",
        categoria: "Decoracion",
        subcategoria: "Floreros",
        descripcion: "Set de floreros de cerámica con forma de libros. Diversos colores.",
        precio: 1500,
        stock:4,
        imagen: "producto_20.jpg"
    },
    {
        id: 21,
        nombre: "Portapincel de cerámica en varios colores",
        categoria: "Decoracion",
        subcategoria: "Portapinceles",
        descripcion: "Portapincel de cerámica en diversos colores y tamaño.",
        precio: 500,
        stock:10,
        imagen: "producto_21.jpg"
    },
    {
        id: 22,
        nombre: "Servilletero de varios colores",
        categoria: "Decoracion",
        subcategoria: "Servilleteros",
        descripcion: "Servilletero de cerámica blanco con gotas de colores.",
        precio: 380,
        stock:9,
        imagen: "producto_22.png"
    },
    {
        id: 23,
        nombre: "Florero blanco de cerámica",
        categoria: "Decoracion",
        subcategoria: "Floreros",
        descripcion: "Florero de cerámica en color blanco con formas modernas.",
        precio: 500,
        stock:2,
        imagen: "producto_23.png"
    },
    {
        id: 24,
        nombre: "Anillo blanco y dorado de cerámica",
        categoria: "Joyeria",
        subcategoria: "Anillos",
        descripcion: "Anillo de cerámica en color blanco y dorado",
        precio: 570,
        stock:13,
        imagen: "producto_24.jpg"
    },
    {
        id: 25,
        nombre: "Aretes de cerámica en blanco y azul",
        categoria: "Joyeria",
        subcategoria: "Aretes",
        descripcion: "Aretes de cerámica con forma circular, de color blanco, azul y dorado.",
        precio: 380,
        stock:5,
        imagen: "producto_25.jpg"
    },
    {
        id: 26,
        nombre: "Collar con flores de cerámica",
        categoria: "Joyeria",
        subcategoria: "Collares",
        descripcion: "Collar con flores de cerámica blancas.",
        precio: 630,
        stock:1,
        imagen: "producto_26.jpg"
    },
    {
        id: 27,
        nombre: "Pulsera de cerámica con varios colores",
        categoria: "Joyeria",
        subcategoria: "Pulseras",
        descripcion: "Pulsera de cerámica con diversos colores y motivos.",
        precio: 270,
        stock:6,
        imagen: "producto_27.png"
    },
    {
        id: 28,
        nombre: "Collar con colgante azul de cerámica",
        categoria: "Joyeria",
        subcategoria: "Collares",
        descripcion: "Collar con colgante azul de cerámica",
        precio: 500,
        stock:1,
        imagen: "producto_28.png"
    },
    {
        id: 29,
        nombre: "Arete blanco de cerámica con flor azul",
        categoria: "Joyeria",
        subcategoria: "Aretes",
        descripcion: "Aretes de cerámica circulares con flores azules.",
        precio: 280,
        stock:8,
        imagen: "producto_29.png"
    },
    {
        id: 30,
        nombre: "Anillo de cerámica en varios colores",
        categoria: "Joyeria",
        subcategoria: "Anillos",
        descripcion: "Anillo de cerámica en varios colores.",
        precio: 450,
        stock:5,
        imagen: "producto_30.png"
    },
    {
        id: 31,
        nombre: "Collar de cerámica con flor y paloma",
        categoria: "Joyeria",
        subcategoria: "Collares",
        descripcion: "Collar de cerámica con flor y paloma, color gris.",
        precio: 340,
        stock:2,
        imagen: "producto_31.png"
    },
    {
        id: 32,
        nombre: "Juego de compoteras blancas y rosadas",
        categoria: "Menaje",
        subcategoria: "Compoteras",
        descripcion: "Juego de compoteras en cerámica, de color  blanco por fuera y rosada en su interior.",
        precio: 1500,
        stock:6,
        imagen: "producto_32.jpg"
    },
    {
        id: 33,
        nombre: "Jarra blanca con líneas verticales en azul",
        categoria: "Menaje",
        subcategoria: "Jarras",
        descripcion: "Jarra de cerámica blanca con líneas verticales en azul.",
        precio: 780,
        stock:4,
        imagen: "producto_33.png"
    },
    {
        id: 34,
        nombre: "Caldera en forma de calabaza de cerámica",
        categoria: "Menaje",
        subcategoria: "Calderas",
        descripcion: "Caldera de cerámica con forma de calabaza, color blanco y marrón.",
        precio: 1200,
        stock:7,
        imagen: "producto_34.png"
    },
    {
        id: 35,
        nombre: "Portatorta con líneas rosadas y terracota",
        categoria: "Menaje",
        subcategoria: "Portatortas",
        descripcion: "Portatorta de cerámica de color rosado con lineas verticales en terracota.",
        precio: 1500,
        stock:1,
        imagen: "producto_35.jpg"
    },
    {
        id: 36,
        nombre: "Frasco de cerámica blanco con puntos marrones",
        categoria: "Menaje",
        subcategoria: "Contenedores",
        descripcion: "Frasco contenedor de cerámica blanca con puntos marrones.",
        precio: 800,
        stock:3,
        imagen: "producto_36.png"
    },
    {
        id: 37,
        nombre: "Plato de cerámica con varios colores",
        categoria: "Menaje",
        subcategoria: "Platos",
        descripcion: "Plato de cerámica en varios colores.",
        precio: 300,
        stock:17,
        imagen: "producto_37.png"
    },
    {
        id: 38,
        nombre: "Juego de tazas de cerámica blanca con textura",
        categoria: "Menaje",
        subcategoria: "Tazas",
        descripcion: "Juego de tazas de cerámica blanca con textura.",
        precio: 950,
        stock:6,
        imagen: "producto_38.png"
    },
    {
        id: 39,
        nombre: "Mantequera rosada y blanca",
        categoria: "Menaje",
        subcategoria: "Contenedores",
        descripcion: "Mantequera o contenedor de cerámica rosada y blanca.",
        precio: 500,
        stock:12,
        imagen: "producto_39.jpg"
    },
    {
        id: 40,
        nombre: "Contenedor de cerámica verde",
        categoria: "Menaje",
        subcategoria: "Contenedores",
        descripcion: "Contenedor de cerámica con motivos florales.",
        precio: 1200,
        stock:15,
        imagen: "producto_40.jpg"
    },
];

module.exports={products}
