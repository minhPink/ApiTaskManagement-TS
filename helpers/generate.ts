export const generateRamdomString = (length: number): string => {
    const characters: string = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";

    let result: string = "";

    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return result;
};


export const generateRamdomNumber = (length: number): string => {
    const characters: string = "0123456789";

    let result: string = "";

    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return result;
};