import { v4 as uuidv4 } from "uuid";

export default class PurchaseService {

    constructor(cartRepository, productRepository, ticketRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.ticketRepository = ticketRepository;
    }

    async purchaseCart(cartId, userEmail) {

        const cart = await this.cartRepository.getCart(cartId);
        let total = 0;
        const productsNotProcessed = [];

        for (const item of cart.products) {

            const product = await this.productRepository.getById(item.product._id);

            if (product.stock >= item.quantity) {

                product.stock -= item.quantity;
                await this.productRepository.update(product._id, product);

                total += product.price * item.quantity;

            } else {
                productsNotProcessed.push(item);
            }
        }

        if (total > 0) {
            const ticket = await this.ticketRepository.create({
                code: uuidv4(),
                amount: total,
                purchaser: userEmail
            });

            return { ticket, productsNotProcessed };
        }

        return { message: "No se pudo procesar la compra" };
    }
}