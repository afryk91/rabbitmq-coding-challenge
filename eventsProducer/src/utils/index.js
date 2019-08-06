const getRandomIntLessThan = limit => Math.floor(Math.random() * 100) % limit; 

const createRandomEvent = (types) => {
    const type = types[getRandomIntLessThan(types.length)];
    return {
        type,
        data: `${Math.random() * 100}`
    };
};

module.exports = {
    getRandomIntLessThan,
    createRandomEvent
}