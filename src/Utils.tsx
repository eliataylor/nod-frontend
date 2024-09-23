import {CartItems} from "./CartProvider";
import dayjs from 'dayjs';

export const isDayJs = (val: any) => {
    return val instanceof dayjs
}

export function nearestDay(date: Date, targetDay: number): string {
    // Get the day of the week for the reference date (0-6)
    const currentDay = date.getDay();

    // Calculate the difference between target day and current day
    const daysDiff = (targetDay - currentDay + 7) % 7;

    // Adjust for negative differences (to handle past targets)
    const offset = daysDiff >= 0 ? daysDiff : daysDiff + 7;

    // Create a new Date object with the offset applied
    return formatDeliveryDate(new Date(date.getTime() + offset * 24 * 60 * 60 * 1000));
}

function formatDeliveryDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    // Check if the hour is before or after noon
    const hour = date.getHours();
    const isAfterNoon = hour >= 12;

    // Add AM or PM based on the time
    let suffix = 'AM'
    if (hour < 11) {
        suffix = 'AM'
    } else if (hour < 16) {
        suffix = 'midday';
    } else if (hour < 20) {
        suffix = 'PM';
    } else  {
        suffix = 'eve';
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate.replace(/,/, ` ${suffix} `);
}


export function has3PlusServings(cartItems: CartItems) : boolean {
    const has = cartItems.find(item => typeof item.servings === 'number' && item.servings > 2)
    if (has) return true;
    return false;
}

export function countConsecutiveDays(cartItems: CartItems): number {
    if (cartItems.length === 0) return 0;

    // Make a shallow copy of cartItems and filter out items without a date
    let items = [...cartItems].filter(item => item.date !== undefined);
    if (items.length === 0) return 0;

    // Sort the copy by date
    items.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

    // Iterate over the sorted list
    for (let i = 0; i < items.length - 1; i++) {
        const currentDate = new Date(items[i].date!).getTime();
        const nextDate = new Date(items[i + 1].date!).getTime();
        const diffDays = (nextDate - currentDate) / (1000 * 60 * 60 * 24);

        // If the difference between consecutive dates is more than 7 days, remove the current item
        if (diffDays > 7) {
            items.splice(i, 1);
            i--; // Adjust index after removal
        }
    }

    // Return the number of items remaining
    return items.length;
}
