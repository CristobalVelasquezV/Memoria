/**Key Code Enum stores All posible input Captures, using the javascript keycode numbers. */
export enum KeyCode {
    BACKSPACE = 8,
    TAB = 9,
    ENTER = 13,
    SHIFT = 16,
    CTRL = 17,
    ALT = 18,
    PAUSE = 19,
    CAPS_LOCK = 20,
    ESCAPE = 27,
    SPACE = 32,
    PAGE_UP = 33,
    PAGE_DOWN = 34,
    END = 35,
    HOME = 36,
    LEFT_ARROW = 37,
    UP_ARROW = 38,
    RIGHT_ARROW = 39,
    DOWN_ARROW = 40,
    INSERT = 45,
    DELETE = 46,
    KEY_0 = 48,
    KEY_1 = 49,
    KEY_2 = 50,
    KEY_3 = 51,
    KEY_4 = 52,
    KEY_5 = 53,
    KEY_6 = 54,
    KEY_7 = 55,
    KEY_8 = 56,
    KEY_9 = 57,
    KEY_A = 65,
    KEY_B = 66,
    KEY_C = 67,
    KEY_D = 68,
    KEY_E = 69,
    KEY_F = 70,
    KEY_G = 71,
    KEY_H = 72,
    KEY_I = 73,
    KEY_J = 74,
    KEY_K = 75,
    KEY_L = 76,
    KEY_M = 77,
    KEY_N = 78,
    KEY_O = 79,
    KEY_P = 80,
    KEY_Q = 81,
    KEY_R = 82,
    KEY_S = 83,
    KEY_T = 84,
    KEY_U = 85,
    KEY_V = 86,
    KEY_W = 87,
    KEY_X = 88,
    KEY_Y = 89,
    KEY_Z = 90,
    LEFT_META = 91,
    RIGHT_META = 92,
    SELECT = 93,
    NUMPAD_0 = 96,
    NUMPAD_1 = 97,
    NUMPAD_2 = 98,
    NUMPAD_3 = 99,
    NUMPAD_4 = 100,
    NUMPAD_5 = 101,
    NUMPAD_6 = 102,
    NUMPAD_7 = 103,
    NUMPAD_8 = 104,
    NUMPAD_9 = 105,
    MULTIPLY = 106,
    ADD = 107,
    SUBTRACT = 109,
    DECIMAL = 110,
    DIVIDE = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    NUM_LOCK = 144,
    SCROLL_LOCK = 145,
    SEMICOLON = 186,
    EQUALS = 187,
    COMMA = 188,
    DASH = 189,
    PERIOD = 190,
    FORWARD_SLASH = 191,
    GRAVE_ACCENT = 192,
    OPEN_BRACKET = 219,
    BACK_SLASH = 220,
    CLOSE_BRACKET = 221,
    SINGLE_QUOTE = 222
};
/** 
 *  *  Input represents a Static Class Input handle the pressed keys each frame of the Game.
 *  * */
export class Input {

    private static totalKeyCodes: number = 222;
    private static keyDown: boolean[] = new Array(Input.totalKeyCodes);
    private static keyPressed: boolean[] = new Array(Input.totalKeyCodes);
    private static keyUp: boolean[] = new Array(Input.totalKeyCodes);
    private static framePressedKeys: number[] = [];
    /**
     * Initalizes the Static Class.
     */
    public static initialize(): void {
        window.addEventListener("keydown", Input.onKeyDown);
        window.addEventListener("keyup", Input.onKeyUp);
    }
    /**
     *Returns true if the Key was pressed down this frame, else returns false.
     * @param {KeyCode} key
     * @returns
     */
    public static isKeyDown(key: KeyCode): boolean {
        return this.keyDown[key];
    }

    /**
     * Returns true if the key upped this frame, else returns false.
     * @param {KeyCode} key
     * @returns
     */
    public static isKeyUp(key: KeyCode): boolean {
        return this.keyUp[key];
    }
    /**
     * Returns true if the key is pressed, else returns false.
     * @param {KeyCode} key
     * @returns
     */
    public static isKeyPressed(key: KeyCode): boolean {
        return this.keyPressed[key];
    }
    /**
     * Event Listnener function handles the setting of booleans when a key is pressed down.
     * @param {KeyboardEvent} e
     */
    static onKeyDown(e: KeyboardEvent): void {
        if (Input.keyPressed[e.keyCode]) {
            Input.keyDown[e.keyCode] = false;
        }
        else {
            Input.keyDown[e.keyCode] = true;
        }
        Input.keyPressed[e.keyCode] = true;
        Input.framePressedKeys.push(e.keyCode);
    }
    /**
     * Event Listener function handles the setting of booleans when a key is returned to his up position.
     * @param {KeyboardEvent} e
     */
    static onKeyUp(e: KeyboardEvent): void {
        Input.keyDown[e.keyCode] = false;
        Input.keyPressed[e.keyCode] = false;
        Input.keyUp[e.keyCode] = true;
        Input.framePressedKeys.push(e.keyCode);
    }
    /**
     * Update of the Static class Input resets the values of all the keys that were, pressed or returned to his upper position, last frame.
     */
    static update(): void {
        let n: number | undefined = Input.framePressedKeys.pop();
        while (n !== null && n !== undefined) {
            Input.keyDown[n] = false;
            Input.keyUp[n] = false;
            n = Input.framePressedKeys.pop();
        }
    }
    /**
     * privated constructor because it represents a static class.
     */
    private constructor() {

    }


}