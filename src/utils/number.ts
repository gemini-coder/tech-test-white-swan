export function formatPrice(value: string | number) {
    value = Number(value);
    if (isNaN(value)) {
        return `-`;
    }
    return `£${value.toFixed(2)}`;
}
