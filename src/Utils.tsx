export function nearestDay(date: Date, targetDay: number): String {
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
