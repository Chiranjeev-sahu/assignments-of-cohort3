let counter = 0;

const updateClock = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    const time24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const time12 = `${String(hours % 12 || 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    
    console.clear();

    console.log(`24-hour format: ${time24} | 12-hour format: ${time12}`);
};

setInterval(updateClock,1000);