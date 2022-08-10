export function isUppercase(text: string)
{
    if (!text || !text.length) {
        return false;
    }

    const character = text[0];
    return character == character.toUpperCase() && character != character.toLowerCase();
}