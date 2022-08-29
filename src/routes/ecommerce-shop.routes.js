const Router = require('express');
const db = require('../db/conn');

const router = Router();

// TODO: Add a Product Composition Field

router.get('/api/ecommerce-products', async (req, res) => {
  try {
    const doc = db.collection('ecommerce-shop').doc('ecommerce-shop-products');
    const querySnapshot = await doc.collection('product').get();
    const response = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      productDetails: doc.data(),
    }));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/api/ecommerce-products/:id', async (req, res) => {
  let productId = req.params.id;

  try {
    const docRef = db.collection('ecommerce-shop').doc('ecommerce-shop-products');
    const querySnapshot = docRef.collection('product');
    const docs = querySnapshot.doc(productId);
    const item = await docs.get();
    const response = {
      id: item.id,
      productDetails: item.data()
    }
    // const response = querySnapshot.docs.map((doc) => {
    //   if (doc.id === productId) {
    //     return { id: doc.id, productDetails: doc.data() };
    //   }
    // });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

let guid = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

router.post('/api/ecommerce-products', async (req, res) => {
  try {
    await db
      .collection('ecommerce-shop')
      .doc('ecommerce-shop-products')
      .collection('product')
      .doc('/' + guid() +'/')
      .create({
        'product-brand': req.body['product-brand'],
        'product-name': req.body['product-name'],
        'product-description': req.body['product-description'],
        'product-price': req.body['product-price'],
        'product-discount': req.body['product-discount'],
        'product-retail-price': req.body['product-retail-price'],
      });
    return res.status(200).json({ message: "Added." });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
