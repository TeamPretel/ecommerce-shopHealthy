const { Router } = require("express");
const  mercadopago  = require("../mercadoPago");
const { Venta, Detalleventa, Producto } = require("../db")

const router = Router();

router.post("/pago", async (req,res)=>{
const {items, payer} = req.body

    let preference = {
      "purpose": "wallet_purchase",
        items: items?.map((item =>item)), // [item1,item2,]
        payer:{
          name: payer.name,
          surname: payer.surname,
          email: payer.email, 

        identification:{
            "type": "DNI",
            "number": payer.identification.number
          },
        },
        "notification_url": "https://henryhealthy.shop/tresmiluno/compra/notificacion"
        // "https://9cee-2803-c080-d-f15c-8c4e-9ef5-f0e3-4ba0.sa.ngrok.io/tresmiluno/compra/notificacion",
      }
      console.log('aca viene la preferencia......')
      console.log(preference)
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
      console.log(response.body)// En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      res.redirect(response.body.init_point)
        
       //res.json(response.body) //  direccion de ORDEN A PAGAR...
        })
        .catch(function (error) {
          console.log(error);
        });
})

router.post('/notificacion', async (req,res)=>{
  const {query}= req
  console.log('NOTIFICACION...')
  console.log({query})
  const topic = query.topic
  // console.log('ESTE DEBAJO ES EL TOPICC')
  // console.log({topic})

  var merchantOrder;
  switch (topic) {
    case "merchant_order":
      const orderId= query.id;
      console.log('OBTENIENDO EL MERCHAN ORDER..', orderId)
      merchantOrder= await mercadopago.merchant_orders.findById(orderId)  
      console.log('ACA VIENE LA DATA DEL MERCHANT ORDER.')
      // console.log(merchantOrder.body)
      if(merchantOrder.body.payments[0].status === 'approved'){

        const venta = await Venta.create({
          id: merchantOrder.body.payments[0].id,
          fecha: merchantOrder.body.payments[0].date_approved,
          precioTotal: merchantOrder.body.payments[0].transaction_amount,
          estadioEnvio: 'en preparacion',
          usuarioId: parseInt(merchantOrder.body.items[0].category_id)
        })
    
          merchantOrder.body.items.forEach(item => {
          Detalleventa.create({
            cantidad: item.quantity,
            precioUnitario: item.unit_price,
            ventumId: merchantOrder.body.payments[0].id,
            productoId: item.id
          }) 
        }) 
    
         merchantOrder.body.items.forEach(async (item) => {
    
          const producto = await Producto.findByPk(item.id);
          producto.stock = producto.stock - item.quantity
          producto.save()
    
        })  
        
       
      }
      else{
        res.send("La venta no se pudo registrar")
      }

      res.send("La venta se registró correctamente")
      break; 
  }
})

// RUTA SOLAMENTE PARA PROBAR REGISTRO DE VENTA/DETALLEVENTA Y ACTUALIZ STOCK   /tresmiluno/compra/carga
router.post('/carga', async (req,res)=>{
  var merchantOrder = {
    id: 6349337013,
    status: 'closed',
    external_reference: '',
    preference_id: '1227569427-0fa40caa-d8a2-44bf-b17b-25f70c5eebd9',
    payments: [
      {
        id: 51085303342,
        transaction_amount: 347.05,
        total_paid_amount: 1154.25,
        shipping_cost: 0,
        currency_id: 'ARS',
        status: 'approved',
        status_detail: 'accredited',
        operation_type: 'regular_payment',
        date_approved: '2022-11-01T23:34:23.000-04:00',
        date_created: '2022-11-01T23:34:22.000-04:00',
        last_modified: '2022-11-01T23:35:35.000-04:00',
        amount_refunded: 0
      }
    ],
    shipments: [],
    payouts: [],
    collector: { id: 1227569427, email: '', nickname: 'TETE7559172' },
    marketplace: 'NONE',
    notification_url: 'https://henryhealthy.shop/tresmiluno/compra/notificacion',
    date_created: '2022-11-01T23:34:22.292-04:00',
    last_updated: '2022-11-01T23:35:36.092-04:00',
    sponsor_id: null,
    shipping_cost: 0,
    total_amount: 347.05,
    site_id: 'MLA',
    paid_amount: 347.05,
    refunded_amount: 0,
    payer: { id: 1227571812, email: '' },
    items: [
      {
        id: '3',
        category_id: '20565251',
        currency_id: 'ARS',
        description: 'Inspired by the classic foldable art of origami',
        picture_url: null,
        title: 'Lightweight Paper Table',
        quantity: 1,
        unit_price: 55.40999984741211
      },
      {
        id: '4',
        category_id: '20565251',
        currency_id: 'ARS',
        description: 'ZERO',
        picture_url: null,
        title: 'COCACOLA',
        quantity: 1,
        unit_price: 90.41000366210938
      }
    ],
    cancelled: false,
    additional_info: '',
    application_id: null,
    order_status: 'paid'
  };


  if(merchantOrder.payments[0].status === 'approved'){   //merchantOrder.body.payments...
       
     const venta = await Venta.create({
      id: merchantOrder.payments[0].id,
      fecha: merchantOrder.payments[0].date_approved,
      precioTotal: merchantOrder.payments[0].transaction_amount,
      estadioEnvio: 'en preparacion',
      usuarioId: parseInt(merchantOrder.items[0].category_id)
    })

      merchantOrder.items.forEach(item => {
      Detalleventa.create({
        cantidad: item.quantity,
        precioUnitario: item.unit_price,
        ventumId: merchantOrder.payments[0].id,
        productoId: item.id
      }) 
    }) 

     merchantOrder.items.forEach(async (item) => {

      const producto = await Producto.findByPk(item.id);
      producto.stock = producto.stock - item.quantity
      producto.save()

    })  

    res.send('anda todo')
  }





})

module.exports= router