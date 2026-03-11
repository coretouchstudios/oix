export function processPayment(payment:any){

 console.log("Processing global payment")

 return {
  status:"completed",
  provider:"Stripe",
  amount:payment.amount
 }

}
