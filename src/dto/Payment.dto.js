class PaymentDTO{

    constructor(){}

    mp(payment){
        const newPayment = {};
        newPayment.code = payment.id;
        newPayment.items = payment.additional_info.items.map(item => {
            return {
                title: item.title,
                price: parseFloat(item.unit_price),
                amount: parseInt(item.quantity),
                subTotal: parseFloat(item.unit_price) * parseInt(item.quantity)
            }
        });
        newPayment.total_net = payment.transaction_details.net_received_amount;
        newPayment.total = payment.transaction_details.total_paid_amount;
        newPayment.purchaser = {
            name: payment.payer.first_name || 'Name Test',
            lastName: payment.payer.last_name || 'Lastname Test',
            identification: payment.payer.identification.number
        }
        return newPayment;
        // newPayment.card_holder
        // newPayment.pay_holder
        // newPayment.payment_type        
    }
    
   
}

const paymentDTO = new PaymentDTO();

export default paymentDTO;



