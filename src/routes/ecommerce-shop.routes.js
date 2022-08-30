const Router = require('express');
const db = require('../db/conn');

const router = Router();

// TODO: Add a Product Composition Field

router.get('/api/ecommerce-articles', async (req, res) => {
  try {
    const doc = db.collection('ecommerce-shop').doc('ecommerce-shop-articles');
    const querySnapshot = await doc.collection('article').get();
    const response = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      articleDetails: doc.data(),
    }));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/api/ecommerce-articles/:id', async (req, res) => {
  let articleId = req.params.id;

  try {
    const docRef = db.collection('ecommerce-shop').doc('ecommerce-shop-articles');
    const querySnapshot = docRef.collection('article');
    const docs = querySnapshot.doc(articleId);
    const item = await docs.get();
    const response = {
      id: item.id,
      articleDetails: item.data()
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

router.post('/api/ecommerce-articles', async (req, res) => {
  try {
    await db
      .collection('ecommerce-shop')
      .doc('ecommerce-shop-articles')
      .collection('article')
      .doc('/' + req.body['article-number'] +'/')
      .create({
        'article-brand': req.body['article-brand'],
        'article-name': req.body['article-name'],
        'article-number': req.body['article-number'],
        'article-description': req.body['article-description'],
        'article-composition': req.body['article-composition'],
        'article-size': req.body['article-size'],
        'article-number': req.body['article-number'],
        'article-retail-price': req.body['article-retail-price'],
        'article-discount': req.body['article-discount'],
        'article-images-path': req.body['article-images-path'],
      });
    return res.status(200).json({ message: "Added." });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
