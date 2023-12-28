import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    price: 0
},
{
    id: '2',
    deliveryDays: 5,
    price: 100
},
{
    id: '3',
    deliveryDays: 1,
    price: 150
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption;
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'saturday' || dayOfWeek === 'sunday';

}


export function calculateDeliveryOption(deliveryOption) {

    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();
    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day')


        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }
    const dateString = deliveryDate.format(
        'dddd, MMMM D'
    );
    return dateString;

}

