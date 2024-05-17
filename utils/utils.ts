type DateFormat = 'yyyy-mm-dd';

const dateFormats: { [key in DateFormat]: (date: Date) => string } = {
    'yyyy-mm-dd': (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}

export const formatDate = (date: Date, format?: DateFormat) => {
    if (format && dateFormats[format]) {
        return dateFormats[format](date);
    }

    // fallback to default
    return date.toLocaleDateString('en-US',{
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}