export const deliveryOptions = [{
    id : '1',
    deliveryDays: 7,
    price : 0
},
{
    id : '2',
    deliveryDays: 5,
    price : 100
},
{
    id : '3',
    deliveryDays: 1,
    price : 150
}
];
export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
    });
    return deliveryOption;

}