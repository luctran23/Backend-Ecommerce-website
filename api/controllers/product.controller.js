
const Product = require('../../models/product.model');
const { remove } = require('../../models/product.model');

module.exports.index = async function(req, res) {  
    try {
        var products = await Product.find();
        res.json(products);
    }catch(err) {
        res.json({ message: err });
    }
    
};
module.exports.search = async function(req, res) {
    try {
        var name = req.query.name;
        var products = await Product.find();
        res.json(products.filter(item => item.name.toLowerCase().includes(name.toLowerCase())));
    }catch(err) {
        res.json({message: err})
    }
}
module.exports.postCreate = async function(req, res) {
    var product = new Product(
        {
            name: req.body.name,
            imgUrl: req.body.imgUrl,
            description: req.body.description,
            price: req.body.price,
            salePrice: req.body.salePrice,
            quantity: req.body.quantity,
            category: req.body.category
        }
    );
    try {
        var savedProduct = await product.save();
        res.json(savedProduct);
    }catch(err) {
        res.json({ message: err });
    }
    
};

module.exports.specific = async function(req, res) {
    try {
        var id = req.params.id;
        var product = await Product.find({ _id: id });
        res.json(product[0]);
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.delete = async function(req, res) {
    
    try {
        var id = req.params.id;
        var removedProd = await Product.remove({ _id: id });
        res.json(removedProd);
    }catch {
        res.json({ message: err });
    }
};

module.exports.patchUpdate = async function(req, res) {
    
    
    try {
        var updatedProd = await Product.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: {
                    quantity: parseInt(req.body.quantity)
                }
            }
        );
        res.json(updatedProd);
    }catch(err) {
        res.json({ message: err });
    }
};