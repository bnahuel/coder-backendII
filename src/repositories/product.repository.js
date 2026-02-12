class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts = () => this.dao.getAllProducts();
}