function UUID(){

    const RANGE = 100;

    function generate(){
        const UUID = 'TICKET' + '-' + Date.now().toString() + Math.floor(Math.random() * (RANGE + 1));
        return UUID;
    }

    return {
        generate
    }
}

const uuid = UUID();

export default uuid;