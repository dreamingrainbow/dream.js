export const HoloButton = ({ id = "execute", text = '' }) => ({
    "el": "button",
    "a": [
        {
            "id": id
        },
        {
            "class": "holo-button"
        }
    ],
    "children": [
        {
            "el": null,
            "a": [],
            "children": [],
            "content": text
        }
    ],
    "content": null
});
