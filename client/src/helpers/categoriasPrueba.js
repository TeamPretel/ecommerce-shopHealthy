let test = [
    {idCategoria:1,nombre:"frutos secos"},
    {idCategoria:2,nombre:"galletitas y panificados"},
    {idCategoria:3,nombre:"mix y granolas"},
    {idCategoria:4,nombre:"barritas y alfajores"},
    {idCategoria:5,nombre:"chocolates"},
    {idCategoria:6,nombre:"snacks y salados"},
    {idCategoria:7,nombre:"arroz  y fideos"},
    {idCategoria:8,nombre:"dulces, mermeladas y untables"},
    {idCategoria:9,nombre:"cereales y legumbres"},
    {idCategoria:10,nombre:"harinas y semillas"},
    {idCategoria:11,nombre:"sal, aceite y vinagre"},
    {idCategoria:12,nombre:"jugos naturales"},
    {idCategoria:13,nombre:"leches vegetales"},
    {idCategoria:14,nombre:"yerbas e infusiones"},
    {idCategoria:15,nombre:"kéfir y kombuchas"},
    {idCategoria:16,nombre:"vinos"},
    {idCategoria:17,nombre:"sin tacc"},
    {idCategoria:18,nombre:"sin azucar"},
    {idCategoria:19,nombre:"organico/agroecologico"},
    {idCategoria:20,nombre:"vegano"}
    ];
    export const dataProducts = [
        {
          image:
            'https://almacensaludable.ar/wp-content/uploads/2021/10/AS-AZUCAR-MASCABO.jpg',
          name: "AZUCAR MASCABO MISIONES (x 1Kg)",
          category: "Endulzantes",
          price: 420,
          score: 4,
          description: [],
          stock: 1000,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/JUAL-STEVIA-EN-POLVO-110G.jpg",
          name: "STEVIA EN POLVO -JUAL- (x 110g)",
          category: "Endulzantes",
          price: 510,
          score: 3.5,
          description: [
            "Producto utilizado para endulzar bebidas, infusiones, y productos panificados, con la virtud de que no posee calorías; ni azúcar; ni químicos.",
          ],
          stock: 500,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/GOD-BLESS-YOU-AZUCAR-DE-COCO-250G.jpg",
          name: "AZÚCAR DE COCO -GOD BLESS- YOU (x 250g)",
          category: "Endulzantes",
          price: 1050,
          score: 3.8,
          description: [],
          stock: 800,
        },
      
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/ISLA-XOCOLATL-MIX-DE-FRUTOS-SECOS-CARAMELIZADOS-70G.jpg",
          name: "ISLA XOCOLATL MIX DE FRUTOS SECOS CARAMELIZADOS 70G MIX DE FRUTOS SECOS CARAMELIZADOS -ISLA XOCOLATL- (x 70g)",
          category: "Granolas",
          price: 350,
          score: 3.9,
          description: ["Con azúcar orgánica."],
          stock: 50,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/09/GRANOLA-TASTE-CMIEL-FRUTOS-SECOSGIRASOLCOCO-HOMEMADE-%E2%80%A2-1-KG.jpg",
          name: "GRANOLA TASTE CMIEL, FRUTOS SECOS,GIRASOL,COCO HOMEMADE • 1 KG GRANOLA TASTE -HOMEMADE- (x 1 Kg)",
          category: "Granolas",
          price: 1400,
          score: 3.8,
          description: "CON MIEL, FRUTOS SECOS, GIRASOL, COCO Y MÁS!",
          stock: 100,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/HOMEMADE-GRANOLA-VEGAN-1KG.jpg",
          name: "GRANOLA VEGAN -HOMEMADE- (x 1 Kg)",
          category: "Granolas",
          price: 1950,
          score: 4,
          description: [
            "Con avena, almendras, castañas, nueces, coco, semillas de girasol y semillas de lino.",
          ],
          stock: 150,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/MOLE-RISOTTO-DE-HONGOS.jpg",
          name: "RISOTTO DE HONGOS -MOLÉ- (x 200g)",
          category: "Arroz y Fideos",
          price: 450,
          score: 3.9,
          description: [],
          stock: 0,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/PAMPAS-RICE-ARROZ-AROMATICO-INTEGRAL-ORG-500G.jpg",
          name: "ARROZ AROMÁTICO INTEGRAL ORGÁNICO -PAMPA'S RICE- (x 500g)",
          category: "Arroz y Fideos",
          price: 500,
          score: 3.8,
          description: [],
          stock: 300,
        },
        {
          image: "image.png",
          name: "FIDEOS FUSILLI CON MAIZ -WAKAS- GLUTEN FREE (x 250g)",
          category: "Arroz y Fideos",
          price: 230,
          score: 4.2,
          description: [
            "Pasta Multicereal con Maíz",
            "Bajo en Sodio",
            "Sin Aditivos – Sin Grasas Trans",
          ],
          stock: 150,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/WAKAS-FIDEOS-FUSILLI-DE-CHIA-250G.jpg",
          name: "FIDEOS FUSILLI GLUTEN FREE CON CHÍA -WAKAS- APTO VEGANO (x 250g)",
          category: "Arroz y Fideos",
          price: 230,
          score: 4.2,
          description: [
            "Pasta Multicereal con Chía",
            "Bajo en Sodio",
            "Sin Aditivos  -Sin Grasas Trans",
          ],
          stock: 0,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/JUAL-JUGO-DE-ALOE-VERA-CON-CLOROFILA-SABOR-JENGIBRE-500ML.jpg",
          name: "JUGO DE ALOE BEBIBLE NATURAL CON CLOROFILA Y JENGIBRE -JUAL- (x 500ml)",
          category: "Bebidas e Infusiones",
          price: 1400,
          score: 4,
          description: [
            "(99% de ALOE VERA PURO) No Contiene Agua.    Ni Espesantes",
            "No Contiene Azúcar.",
            "No Contiene Gelificantes.",
          ],
          stock: 80,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/JUAL-JUGO-DE-ALOE-VERA-NATURAL-1L.jpg",
          name: "JUGO DE ALOE Bebible NATURAL -JUAL- (x 1 Litro)",
          category: "Bebidas e Infusiones",
          price: 2700,
          score: 3.5,
          description: [
            "(99% de ALOE VERA PURO) No Contiene Agua.    Ni Espesantes",
            "No Contiene Azúcar.",
            "No Contiene Gelificantes.",
          ],
          stock: 0,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/ROAPIPO-YERBA-MATE-1KG.jpg",
          name: "YERBA ORGÁNICA SUAVE -ROAPIPÓ- (x 1 Kg)",
          category: "Bebidas e Infusiones",
          price: 1700,
          score: 3.6,
          description: [],
          stock: 500,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/MARITA-CAFE-VERDE-100G.jpg",
          name: "MARITA CAFÉ VERDE 100G CAFÉ VERDE -MARITA- (x 100g)",
          category: "Bebidas e Infusiones",
          price: 2300,
          score: 3.8,
          description: [
            "Café Marita Verde (100g). Es un Blend de Café con Granos 100%",
            "Arábica con otros 2 activos naturales, que promueven la mejora en la salud, equilibrando y desintoxicando nuestro cuerpo combatiendo los radicales libres y promoviendo el adelgazamiento.",
          ],
          stock: 20,
        },
      
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/MELTAIM-CAJA-DE-ALFAJORES-VEGANOS.jpg",
          name: "CAJA DE ALFAJORES VEGANOS DE LIMÓN -MELTAÍM- sólo 200 kcal (x 12 uni.)",
          category: "Barritasy Alfajores",
          price: 1400,
          score: 3.2,
          description: [],
          stock: 1,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/CELIENERGY-CAJA-ALFAJOR-MEMBRILLO-DE-AVELLANA-CHOC-NEGRO-60G.jpg",
          name: "CELIENERGY CAJA ALFAJOR MEMBRILLO DE AVELLANA CHOC NEGRO 60G ALFAJORES DE MEMBRILLO Y CHOCOLATE - SIN TACC -CELIENERGY- (x 12 uni.)",
          category: "Barritasy Alfajores",
          price: 1800,
          score: 4.1,
          description: [
            "Alfajores a base de Harina de Avellanas.",
            "Rellenos de Membrillo y bañados en Chocolate Negro.",
            "Libres de Gluten SIN TACC",
          ],
          stock: 10,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/GRUN-BARRITAS-DE-AVENA-Y-PASAS-200G.jpg",
          name: "BARRITAS DE AVENA Y PASAS - BANDEJA X 6 UNI. -GRÜN- (x 200g)",
          category: "Barritasy Alfajores",
          price: 620,
          score: 3,
          description: [],
          stock: 95,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/GOLDEN-MONKEY-BARRA-LADDU-BAR-ARANDANOS-30G.jpg",
          name: "BARRITA -LADDUBAR- ARÁNDANOS con dátil orgánico -SRI SRI- TATTVA (12 uni. x 30g)",
          category: "Barritasy Alfajores",
          price: 1700,
          score: 3.4,
          description: [],
          stock: 200,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/MOLE-NUGGETS-DE-POROTO-NEGRO-200G-DIAG.jpg",
          name: "MOLE NUGGETS DE POROTO NEGRO 200G DIAG PREMEZCLA DE NUGGETS DE POROTO NEGRO A LA MOSTAZA -MOLÉ- (x 200g)",
          category: "Comidas Casi Listas",
          price: 420,
          score: 4.1,
          description: [
            "Alto contenido de fibra alimentaria.",
            "Fáciles de Preparar con ingredientes naturales y 100% vegetales.",
            "Se pueden poner al horno o freírlas (Hasta que estén doradas y listo!).",
          ],
          stock: 500,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/MOLE-GUISO-DE-LENTEJAS.jpg",
          name: "GUISO DE LENTEJAS -MOLÉ- (x 200g)",
          category: "Comidas Casi Listas",
          price: 280,
          score: 3.9,
          description: [],
          stock: 25,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/LOS-PARAISOS-MILANESAS-DE-SOJA-ACEITUNAS-2U.jpg",
          name: 'MILANESA DE SOJA RELLENA con queso y aceitunas "LOS PARAÍSOS" (2 uni.)',
          category: "Comidas Casi Listas",
          price: 500,
          score: 3.8,
          description: [
            "Al ser un producto congelado solo puede entregarse en la zona de Martínez y Olivos a través de nuestro propio delivery. Consúltenos por este asunto.",
          ],
          stock: 600,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/CREPES-TOMATE-CRUDENCIO-80g.jpg",
          name: 'CREPES de TOMATE deshidratados sin harina "CRUDENCIO" (x 3 uni.)',
          category: "Comidas Casi Listas",
          price: 650,
          score: 3.6,
          description: [],
          stock: 350,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/ARGENDIET-CALDO-DE-VERDURAS-SIN-SAL.jpg",
          name: 'CALDO DE VERDURAS - SIN SAL AGREGADA "ARGENDIET "(x 170g)',
          category: "Comidas Casi Listas",
          price: 350,
          score: 3.7,
          description: [],
          stock: 120,
        },
        {
          image:
            "https://almacensaludable.ar/wp-content/uploads/2021/10/MOLE-SOPA-CAMPESINA.jpg",
          name: 'SOPA CAMPESINA "MOLÉ" (x 120g)',
          category: "Comidas Casi Listas",
          price: 210,
          score: 3.3,
          description: [],
          stock: 0,
        },
      ];